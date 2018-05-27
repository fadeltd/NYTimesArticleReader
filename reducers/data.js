/**
 * Data Reducers
 */

import {
  FETCHING,
  FETCHING_FAILED,
  FETCHING_SUCCESS,
  CLEAR_ERROR,
  CHANGE_CONNECTION_STATUS,
} from '../constants/ActionTypes';

const initialState = {
  article: {
    items: [],
    page: 0,
    isLoading: false,
  },
  book: {
    items: [],
    offset: 0,
    isLoading: false,
  },
  isConnected: false,
  error: '',
}

const data = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case CHANGE_CONNECTION_STATUS:
      return {
        ...state,
        isConnected: action.data.status
      }
    case FETCHING: {
      const newState = {
        ...state,
      };
      newState[action.data.type].isLoading = true;
      return newState;
    }
    case FETCHING_SUCCESS: {
      const newState = {
        ...state
      }
      const { article, book } = action.data;
      if (article) {
        newState['article'] = article;
        newState['article'].isLoading = false;
      }
      if (book) {
        newState['book'] = book
        newState['article'].isLoading = false;
      }
      return newState;
    }
    case FETCHING_FAILED: {
      const newState = {
        ...state,
        error: action.data.error
      }
      newState[action.data.type].isLoading = false;
      return newState;
    }
    case CLEAR_ERROR:
      return {
        ...state,
        error: ''
      }
    default:
      return state;
  }
}

export default data;