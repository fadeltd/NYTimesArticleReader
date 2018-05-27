/**
 * Actions for books dispatch request
 */
import {
	apiGet,
	fetchingSuccess,
	fetchingFailed
} from './data';
import { strings } from '../helpers';
import { API_KEY, LIST_BOOK } from '../constants/config';

// Load list of books from API with parameters 
export const listBook = (list, newOffset, loadMore, callback) => {
	return (dispatch, getState) => {
		const params = {
			'api-key': API_KEY,
			'list': list,
			'offset': newOffset,
		};
		const type = 'book';
		const url = strings.getParams(LIST_BOOK, params);
		dispatch(apiGet(type, url, response => {
			if (response.error) {
				dispatch(fetchingFailed({
					type: type,
					error: response.error
				}));
			} else {
				if (response.data.status === 'OK') {
					const { items, offset } = getState().data.book;
					const results = response.data.results;
					const book = {
						items: results.length > 0 ? loadMore ? [...items, ...results] : results : items,
						offset: newOffset ? newOffset : offset
					};
					dispatch(fetchingSuccess({
						book: book
					}));
				}
			}
			if (callback) {
				callback();
			}
		}));
	}
}