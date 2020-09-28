const m = require('mithril');
const settings = require('../settings');

const AuthService = {
  username: 'admin@email.com',
  password: 'password',
  forgot: 'admin@email.com',
  accessToken: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
  signup: () => {
  },
  signin: (username, password) => {
    return m.request({
      method: 'POST',
      url: `${settings.host}:${settings.port}/${settings.version}/auth/signin`,
      headers: { 'User-Agent': navigator.userAgent },
      body: { username: username, password: password }
    }).then(function (response) {
      AuthService.accessToken = response.access_token;
      AuthService.refreshToken = response.refresh_token;
      localStorage.setItem('access_token', AuthService.accessToken);
      localStorage.setItem('refresh_token', AuthService.refreshToken);
      m.route.set('/keys');
    });
  },
  signout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    m.route.set('/login');
  },
  forgotPassword: (username) => {
    return m.request({
      method: 'POST',
      url: `${settings.host}:${settings.port}/${settings.version}/auth/forgot?username=${username}`,
      headers: { 'User-Agent': navigator.userAgent }
    }).then(function (response) {
    }).catch(function (e) {
      // TODO
      console.log(e.code);
      console.log(e.response);
    });
  },
  resetPassword: () => {

  }
};

module.exports = AuthService;
