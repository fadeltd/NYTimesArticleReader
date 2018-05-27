/**
 * Actions for article dispatch request
 */
import {
  apiGet,
  fetchingSuccess,
  fetchingFailed
} from './data';
import { strings } from '../helpers';
import { API_KEY, SEARCH_ARTICLE } from '../constants/config';

// Create api request action article search with parameters
export const searchArticle = (keyword, sort, newPage, loadMore, callback) => {
  return (dispatch, getState) => {
    const params = {
      'api-key': API_KEY,
      'page': newPage,
      'sort': sort
    };
    if (keyword.trim().length > 0) {
      params['q'] = keyword
    }
    const type = 'article';
    const url = strings.getParams(SEARCH_ARTICLE, params);
    dispatch(apiGet(type, url, response => {
      if (response.error) {
        dispatch(fetchingFailed({
          type: type,
          error: response.error
        }));
      } else {
        if (response.data.status === 'OK') {
          const { items, page } = getState().data.article;
          const result = response.data;
          const docs = result.response.docs;
          const document = {
            items: docs.length > 0 ? loadMore ? [...items, ...docs] : docs : items,
            page: newPage ? newPage : page
          };
          dispatch(fetchingSuccess({
            article: document
          }));
        }
      }
      if (callback) {
        callback();
      }
    }));
  }
}