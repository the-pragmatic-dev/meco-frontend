const m = require('mithril');
const moment = require('moment');
const settings = require('../../../settings');
const keyService = require('../../../services/key.service');

const tr = (header, content) => {
  return m('tr', [
    m('td.has-text-weight-semibold', header),
    m('td', content)
  ]);
};

const datetime = (string) => {
  if (moment(string).isValid()) {
    return moment(string).format('Qo MMMM YYYY, hh:mm:ssA Z zz');
  }
  return '-';
};

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('.row.is-vcentered.fade-in', m('.column',
        m('table.is-fullwidth', m('tbody', [
          tr('Name', keyService.current.name),
          tr('Prefix', keyService.current.prefix),
          tr('Hash', m('.tooltip', [
            m('span.tooltiptext.is-inline', 'We don’t store the original hash. It is only shown once at the time of creation.'),
            m('span.fas.fa-lock.fa-lg'),
            m('span.has-padding-left.is-uppercase', 'protected')
          ])),
          tr('API version', `${settings.version}`),
          tr('Created', datetime(keyService.current.created_date)),
          tr('Last used', datetime(keyService.current.last_used_date)),
          tr('Last updated', datetime(keyService.current.modified_date)),
          tr('Enabled', `${keyService.current.enabled}`)
        ]))
      ));
    }
  };
};
