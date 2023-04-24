import {loadingError} from '~/store/global/actions';

export function onlyNumbers(value) {
  return value ? String(value).replace(/\D/g, '') : value;
}

export function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function catchError(error, message) {
  const msgError = error?.responseJSON?.errors;
  loadingError({error: msgError?.join('') || message});
}

export function timeToString(time) {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}
