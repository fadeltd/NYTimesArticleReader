import { CHANGE_CONNECTION_STATUS } from '../constants/ActionTypes';

// Watch connection status
export const connectionStatus = (data) => {
  return {
    type: CHANGE_CONNECTION_STATUS,
    data,
  }
}