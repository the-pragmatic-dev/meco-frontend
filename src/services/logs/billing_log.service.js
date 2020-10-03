const m = require('mithril');
const settings = require('../../settings');
const contentDisposition = require('content-disposition');
const authService = require('../auth.service');

const BillingLogService = {
  logs: { content: [] },
  findAll: (page) => {
    m.request({
      method: 'GET',
      url: `${settings.host}/${settings.version}/accounts/me/billing/logs?page=${page}`,
      headers: {
        Authorization: `Bearer ${authService.accessToken}`
      }
    }).then(function (response) {
      BillingLogService.logs = response;
    });
  },
  downloadAll: () => {
    m.request({
      method: 'GET',
      url: `${settings.host}/${settings.version}/accounts/me/billing/logs/download`,
      responseType: 'text',
      extract: (xhr) => {
        return {
          filename: contentDisposition.parse(xhr.getResponseHeader('Content-Disposition')).parameters.filename,
          body: xhr.responseText
        };
      },
      headers: {
        Authorization: `Bearer ${authService.accessToken}`
      }
    }).then(function (response) {
      window.open(`data:text/csv;charset=utf-8,${encodeURI(response.body)}`);
    });
  }
};

module.exports = BillingLogService;
