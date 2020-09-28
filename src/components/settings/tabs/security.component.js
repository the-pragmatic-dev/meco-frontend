const m = require('mithril');
const moment = require('moment');
const securityLogService = require('../../../services/logs/security_log.service');

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
      securityLogService.findAll(0);
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return [
        m('.row.is-vcentered.fade-in', m('.column',
          m('section.page-section.has-border', [
            m('h5', 'Two-factor authentication'),
            m('p.has-text-weight-semibold', 'Default method: App'),
            m('.row.is-vcentered', [
              m('.column', m('p', 'When you log in you will be required to enter a code that we will send to an app.')),
              m('.column', [
                m('button.is-link.is-outlined.is-small', '2fa enabled')
              ])
            ])
          ])
        )),
        m('.row.is-vcentered.fade-in', m('.column',
          m('h5', 'Security history'),
          m('.row.is-vcentered.page-section', [
            m('.column.is-gapless', m('p', 'Your most recent security events.')),
            m('.column',
              m('button.is-link.is-outlined.is-small', {
                onclick: () => {
                  securityLogService.downloadAll();
                }
              }, 'download')
            )
          ]),
          m('table.is-fullwidth', [
            m('thead.has-text-weight-semibold', m('tr', [
              m('th', 'Action'),
              m('th', 'Origin'),
              m('th', 'Time')
            ])),
            m('tbody', [securityLogService.logs.content.map((log) => {
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
