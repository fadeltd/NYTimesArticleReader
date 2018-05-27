/**
 * Actions for data manipulations and API Request
 */
import axios from 'axios';
import {
  FETCHING,
  FETCHING_SUCCESS,
  FETCHING_FAILED
} from '../constants/ActionTypes';

// Loading status
export const fetching = (data) => {
  return {
    type: FETCHING,
    data
  }
}

// Send result to reducer
export const fetchingSuccess = (data) => {
  return {
    type: FETCHING_SUCCESS,
    data,
  }
}

// Send error to reducer
export const fetchingFailed = (data) => {
  return {
    type: FETCHING_FAILED,
    data,
  }
}

// API Request with axios with method 'GET'
export const apiGet = (type, url, callback) => {
  return (dispatch, getState) => {
    const { isConnected } = getState().data;
    if (isConnected) {
      dispatch(fetching({ type }));
      axios.get(url, { timeout: 30000 })
        .then(response => {
          if (callback) {
            callback(response);
          }
        })
        .catch((error) => {
          const errorMessage = error.toString().split(" at ")[0];
          if (callback) {
            callback({
              error: errorMessage
            });
          }
        });
    } else {
      const errorOffline = 'No network available';
      if (callback) {
        callback({
          error: errorOffline
        });
      }
    }
  }
}