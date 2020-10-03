const m = require('mithril');
const settings = require('../settings');
const authService = require('./auth.service');

const AccountService = {
  account: {},
  findAuthenticatedAccount: () => {
    m.request({
      method: 'GET',
      url: `${settings.host}/${settings.version}/accounts/me`,
      headers: {
        Authorization: `Bearer ${authService.accessToken}`
      }
    }).then((account) => {
      AccountService.account = account;
    });
  },
  update: (account) => {
    m.request({
      method: 'PUT',
      url: `${settings.host}/${settings.version}/accounts/me`,
      headers: {
        Authorization: `Bearer ${authService.accessToken}`
      },
      body: AccountService.account
    });
  }
};

module.exports = AccountService;
