import { 
	CLEAR_ERROR
} from '../constants/ActionTypes';

// Clear toast message, to avoid keep printing the same message when state on Screen updated
export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  }
}