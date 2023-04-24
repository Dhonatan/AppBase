import queryString from 'query-string';
import SecureStore from 'react-native-encrypted-storage';
import jwt_decode from 'jwt-decode';

const APP_URL = process.env.APP_URL;
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
let refreshStarted = false;

class Request {
  constructor(provider) {
    this.provider = provider || APP_URL;
  }

  static async sleepRefreshToken() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (refreshStarted) {
      return await Request.sleepRefreshToken();
    }
  }

  static clear_token() {
    SecureStore.removeItem(ACCESS_TOKEN);
    SecureStore.removeItem(REFRESH_TOKEN);
  }

  static async getToken() {
    let token;
    try {
      token = await SecureStore.getItem(ACCESS_TOKEN);
    } catch (error) {
      token = null;
    }
    return token;
  }

  static async getScopes() {
    const token = await Request.getToken();
    const decoded = token ? jwt_decode(token) : null;
    return (decoded && decoded.scopes) || [];
  }

  pathToUrl(path, params) {
    const urls = ['/oauth/token', '/oauth/revoke'];
    const auth = urls.includes(path);
    const provider = auth ? APP_URL : this.provider;
    const query = queryString.stringify(params);
    return query ? `${provider}${path}?${query}` : `${provider}${path}`;
  }

  async getHeaders() {
    return {
      Accept: 'application/json',
      'Accept-Language': 'pt-BR',
      'Content-Type': 'application/json',
    };
  }

  async refreshToken() {
    let token;
    let response;
    if (refreshStarted) {
      return await Request.sleepRefreshToken();
    }
    refreshStarted = true;

    try {
      try {
        token = await SecureStore.getItem(REFRESH_TOKEN);
      } catch (error) {}

      const params = {
        refresh_token: token,
        client_id: process.env.APP_CLIENT_ID,
        client_secret: process.env.APP_CLIENT_SECRET,
        grant_type: 'refresh_token',
      };

      response = await this.post('/oauth/token', params, {});

      if (response) {
        SecureStore.setItem(
          ACCESS_TOKEN,
          String(response?.access_token || ''),
          {},
        );
        SecureStore.setItem(
          REFRESH_TOKEN,
          String(response?.refresh_token || ''),
          {},
        );
      }
    } catch (error) {
    } finally {
      refreshStarted = false;
    }
  }

  async request(path, options) {
    let token;
    try {
      token = await SecureStore.getItem(ACCESS_TOKEN);
    } catch (error) {
      token = null;
    }

    options.headers = await this.getHeaders();
    const refresh = path.includes('oauth/token');
    const newUser = path.includes('oauth/users');
    const recoverPassword = path.includes('users/password');
    const editPassword = path.includes('users/password/edit');
    const with_oauth = refresh || newUser || recoverPassword;

    if (token && !with_oauth) {
      const date = Math.floor(Date.now() / 1000);
      const decoded = jwt_decode(token);

      const {exp} = decoded;
      const expired = !!(date > exp);

      if (expired) {
        await this.refreshToken();
        try {
          token = await SecureStore.getItem(ACCESS_TOKEN);
        } catch (error) {
          token = null;
        }
      }
    }

    if (!with_oauth || editPassword) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return fetch(path, options)
      .then(async response => {
        const getJSON = async () => {
          return response?.json() || response?.text();
        };
        const data = response.status === 204 ? {} : await getJSON();

        if (!response.ok) {
          let error = new Error('Network response was not ok.');
          error.response = response;
          error.responseJSON = data;

          if (data && data.logout) {
            await this.logout();
          }

          throw error;
        }
        return data;
      })
      .catch(error => {
        return error;
      });
  }

  async login(params) {
    return this.post('/oauth/token', params, {})
      .then(async response => {
        SecureStore.setItem(
          ACCESS_TOKEN,
          String(response?.access_token || ''),
          {},
        );
        SecureStore.setItem(
          REFRESH_TOKEN,
          String(response?.refresh_token || ''),
          {},
        );

        const data = jwt_decode(response.access_token);

        return data;
      })
      .catch(error => {
        return error;
      });
  }

  async logout(params) {
    return this.post('/oauth/revoke', params, {})
      .then(async () => {
        try {
          await SecureStore.removeItem(ACCESS_TOKEN);
        } catch (e) {}
        try {
          await SecureStore.removeItem(REFRESH_TOKEN);
        } catch (e) {}
      })
      .catch(error => {
        return error;
      });
  }

  async get(path, params = {}, options = {}) {
    return this.request(this.pathToUrl(path, params), {
      ...options,
      credentials: 'include',
      method: 'GET',
    });
  }

  async post(path, data, params = {}, options = {}) {
    return this.request(this.pathToUrl(path, params), {
      ...options,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(path, data, params = {}, options = {}) {
    return this.request(this.pathToUrl(path, params), {
      ...options,
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async del(path, params = {}, options = {}) {
    return this.request(this.pathToUrl(path, params), {
      ...options,
      credentials: 'include',
      method: 'DELETE',
    });
  }
}

export default Request;
