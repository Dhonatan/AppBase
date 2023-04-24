import * as Types from './types';
import api from '~/providers/api';
import auth from '~/providers/auth';
import {loadingError, loadingSuccess} from '~/store/global/actions';
import {catchError} from '~/tools/functions';
import {setData} from '~/store/database';

export const login = (body, onSuccess) => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const params = {
      email: body.email,
      password: body.password,
      grant_type: 'password',
      client_id: process.env.APP_CLIENT_ID,
      client_secret: process.env.APP_CLIENT_SECRET,
    };

    const data = await auth.login(params);

    if (data?.user) {
      dispatch({type: Types.FETCH, data: data.user});
      loadingSuccess();
      if (onSuccess) {
        onSuccess();
      }
    } else {
      dispatch({type: Types.ERROR_FETCH});
      loadingError({error: 'Email or password dont match'});
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Email or password dont match');
  }
};

export const logout = (body, onSuccess) => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const params = {
      token: body.token,
      client_id: process.env.APP_CLIENT_ID,
      client_secret: process.env.APP_CLIENT_SECRET,
    };

    setData('user', '');
    await auth.logout(params);
    dispatch({type: Types.FETCH, data: null});
    loadingSuccess();
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to Logout');
  }
};

export const singUp = (body, onSuccess) => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    let params = {
      name: body?.name,
      email: body?.email,
      password: body?.password,
    };

    const data = await api.post('/users', params);

    if (data?.id) {
      dispatch({type: Types.FETCH_SUCCESS});
      loadingSuccess();
      if (onSuccess) {
        onSuccess();
      }
    } else {
      dispatch({type: Types.ERROR_FETCH});
      catchError(data, 'Error to SignUp');
    }
  } catch (error) {
    console.log('err, e', error);
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to SignUp');
  }
};

export const getUser = onSuccess => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.get('/users');
    if (data?.id) {
      setData('user', data);
      dispatch({type: Types.FETCH, data});
      loadingSuccess();
      if (onSuccess) {
        onSuccess(data);
      }
    } else {
      dispatch({type: Types.ERROR_FETCH});
      catchError(data, 'Error to get your User');
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to get your User');
  }
};

export const updateUser = (body, onSuccess) => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});
    const {id, ...params} = body;

    const data = await api.put(`/users/${id}`, params);

    if (data?.id) {
      dispatch({type: Types.FETCH_SUCCESS});
      loadingSuccess({
        toastTitle: 'Success!',
        success: 'Your data was Updated.',
      });
      if (onSuccess) {
        onSuccess();
      }
    } else {
      dispatch({type: Types.ERROR_FETCH});
      catchError(data, 'Error to update your data.');
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to update your data.');
  }
};

export const recoverPassword = (body, onSuccess) => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.post('/users/password', body);
    if (data?.response && !data?.response?.ok) {
      dispatch({type: Types.ERROR_FETCH});
      catchError(data, 'Error to recovery password');
    } else {
      dispatch({type: Types.FETCH_SUCCESS});
      loadingSuccess({
        toastTitle: 'Success!',
        success: 'Token sent to your email!',
      });
      if (onSuccess) {
        onSuccess();
      }
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to recovery password');
  }
};

export const resetPassword = (body, onSuccess) => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.post('/users/reset', {password: {...body}});
    if (data?.response && !data?.response?.ok) {
      dispatch({type: Types.ERROR_FETCH});
      catchError(data, 'Error to recovery password');
    } else {
      dispatch({type: Types.FETCH_SUCCESS});
      loadingSuccess({
        toastTitle: 'Success!',
        success: 'Password Updated!',
      });
      if (onSuccess) {
        onSuccess();
      }
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to recovery password');
  }
};
