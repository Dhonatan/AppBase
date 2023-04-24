import * as Types from './types';
import {dispatch} from '~/store';

export const loading = (params = {}) =>
  dispatch({type: Types.LOADING, ...params});
export const loadingSuccess = (params = {}) =>
  dispatch({type: Types.LOADING_SUCCESS, ...params});
export const loadingError = (params = {}) =>
  dispatch({type: Types.LOADING_ERROR, ...params});
export const setSingUp = (params = {}) =>
  dispatch({type: Types.SET_SINGUP, ...params});
