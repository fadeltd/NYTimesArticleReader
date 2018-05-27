import {
  fetching,
  fetchingSuccess,
  fetchingFailed
} from '../../actions/data';
import { searchArticle } from '../../actions/article';
import {
  mockSearchArticleResponse,
  mockSearchOldestArticleResponse,
} from '../../__mocks__/article';
import {
  FETCHING,
  FETCHING_SUCCESS,
  FETCHING_FAILED,
} from '../../constants/ActionTypes';
import { strings } from '../../helpers';

import { expect } from 'chai';
import nock from 'nock';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { API_KEY, SEARCH_ARTICLE } from '../../constants/config';

describe('API Article', () => {
  let store;

  beforeEach(() => store = mockStore({}));

  afterEach(() => nock.cleanAll());

  it('should dispatch FETCHING_SUCCESS when fetching search article has been done', () => {

    const params = strings.getParams({
      'api-key': API_KEY,
      'page': 0,
      'sort': 'newest',
      'q': 'Brazil'
    });
    nock(SEARCH_ARTICLE).get(params).reply(200, mockSearchArticleResponse);

    const expectedActions = [{
      type: FETCHING,
      data: { type: 'article' }
    }, {
      type: FETCHING_SUCCESS,
      data: mockSearchArticleResponse
    }];

    const actions = store.getActions();

    return store
      .dispatch(searchArticle('Brazil', 'oldest', 0))
      .then(() => expect(actions).to.eql(expectedActions));
  });

  it('should dispatch FETCHING_SUCCESS when fetching search article with params sort \'oldest\' has been done', () => {

    const params = strings.getParams({
      'api-key': API_KEY,
      'page': 0,
      'sort': 'oldest',
    });
    nock(SEARCH_ARTICLE).get(params).reply(200, mockSearchOldestArticleResponse);

    const expectedActions = [{
      type: FETCHING,
      data: { type: 'article' }
    }, {
      type: FETCHING_SUCCESS,
      data: mockSearchOldestArticleResponse
    }];

    const actions = store.getActions();

    return store
      .dispatch(searchArticle('', 'oldest', 0))
      .then(() => expect(actions).to.eql(expectedActions));
  });

  it('should dispatch FETCH_COMMENTS_FAILED when fetching has failed', () => {
    const params = strings.getParams({
      'api-key': "3304a9018a9a4cd8a6c587cd2060e093",
      'page': 0,
      'sort': 'newest',
    });
    nock(SEARCH_ARTICLE).get(params).reply(403);

    const expectedActions = [{
      type: FETCHING,
      data: { type: 'article' }
    }, {
      type: FETCHING_FAILED,
      data: { type: 'article' }
    }];

    const actions = store.getActions();

    return store
      .dispatch(searchArticle('', 'newest', 0))
      .then(() => expect(actions).to.eql(expectedActions));
  });
});