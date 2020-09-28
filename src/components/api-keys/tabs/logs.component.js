const m = require('mithril');
const moment = require('moment');
const bullet = require('bullet-pubsub');
const keyService = require('../../../services/key.service');
const keyLogService = require('../../../services/logs/key_log.service');

const updateKeyLogs = () => {
  keyLogService.findAllById(keyService.current.id, 0);
};

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
      updateKeyLogs();
      bullet.on('key-current-changed', () => {
        updateKeyLogs();
      });
    },
    onremove: (vnode) => {
      bullet.off('key-current-changed');
    },
    view: (vnode) => {
      return [
        m('.row.is-vcentered.fade-in', m('.column',
          m('section.page-section.has-border', [
            m('h5', 'Download logs'),
            m('.row.is-vcentered', [
              m('.column', m('p', 'Download a record of your API key logs in CSV format.')),
              m('.column',
                m('button.is-link.is-outlined.is-small', {
                  onclick: () => {
                    keyLogService.downloadAllById(keyService.current.id);
                  }
                }, 'download')
              )
            ])
          ])
        )),
        m('.row.is-vcentered.fade-in', m('.column',
          m('h5', 'API key log'),
          m('p', 'Your most recent API key events.'),
          m('table.is-fullwidth', [
            m('thead.has-text-weight-semibold', m('tr', [
              m('th', 'Action'),
              m('th', 'Origin'),
              m('th', 'Time')
            ])),
            m('tbody', [keyLogService.logs.content.map((log) => {
              return m('tr', [
                m('td', log.action),
                m('td', m('.tags.has-addons', [
                  m('.tag.is-dark', log.request_metadata.geo_metadata.city_name),
                  m('.tag.is-warning', log.request_metadata.device_metadata.user_agent_family),
                  m('.tag.is-success', log.request_metadata.device_metadata.operating_system_family)
                ])),
                m('td', moment(log.created_date).fromNow())
              ]);
            })])
          ])
        ))
      ];
    }
  };
};
