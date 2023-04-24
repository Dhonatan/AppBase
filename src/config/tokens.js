export const CLIENT_ID = __DEV__
  ? process.env.APP_CLIENT_ID_HML
  : process.env.APP_CLIENT_ID;

export const CLIENT_SECRET = __DEV__
  ? process.env.APP_CLIENT_SECRET_HML
  : process.env.APP_CLIENT_SECRET;

export const APP_ENVIRONMENT = __DEV__ ? 'homologation' : 'production';
