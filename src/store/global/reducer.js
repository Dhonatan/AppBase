import * as Types from './types';
import Toast from 'react-native-toast-message';

const initialState = {
  error: null,
  success: null,
  loading: false,
  singUp: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.LOADING:
      return {...state, loading: true, error: null};
    case Types.LOADING_SUCCESS:
      if (action?.success) {
        Toast.show({
          type: action?.toastType || 'success',
          text1: action?.toastTitle || 'Success!',
          text2: action.success,
        });
        return {...state, loading: false, success: {message: action.success}};
      } else {
        return {...state, loading: false};
      }
    case Types.LOADING_ERROR:
      if (action?.error) {
        Toast.show({
          type: 'error',
          text1: 'Alert!',
          text2: action.error,
        });
      }
      return {...state, loading: false, error: action.error};

    case Types.SET_SINGUP:
      return {...state, loading: false, singUp: action.data};

    default:
      return state;
  }
};
