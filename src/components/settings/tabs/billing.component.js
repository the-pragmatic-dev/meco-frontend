const m = require('mithril');
const moment = require('moment');
const accountService = require('../../../services/account.service');
const billingLogService = require('../../../services/logs/billing_log.service');

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
      billingLogService.findAll(0);
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return [
        m('.row.is-vcentered.fade-in', m('.column',
          m('section.page-section.has-border', [
            m('h5', 'Estimated costs for this billing period'),
            m('p', 'This is the current costs for your usage this billing period. A breakdown of your costs is available below.'),
            m('h3.is-gapless.has-text-weight-semibold', '£0.00')
          ])
        )),
        m('.row.is-vcentered.fade-in', m('.column',
          m('section.page-section.has-border', [
            m('h5', 'Billing alerts'),
            m('.row.is-vcentered', [
              m('.column', m('p', 'Send me an email anytime my monthly usage has exceeded the amount listed below')),
              m('.column', m('label.switch', [
                m('input', {
                  type: 'checkbox',
                  checked: accountService.account.billing_alert_enabled,
                  onclick: () => {
                    accountService.account.billing_alert_enabled = !accountService.account.billing_alert_enabled;
                    accountService.update(accountService.account);
                  }
                }),
                m('span.slider.is-rounded')
              ]))
            ]),
            m('.field', m('p.control.has-icons-left', [
              m('input.is-block', {
                type: 'number',
                placeholder: 'i.e. £50',
                min: '0',
                step: '1',
                oninput (e) {
                  accountService.account.billing_alert_amount = parseInt(e.target.value);
                },
                onkeypress: (e) => { return (e.charCode === 8 || e.charCode === 0 || e.charCode === 13) ? null : e.charCode >= 48 && e.charCode <= 57; },
                onblur: () => {
                  accountService.account.billing_alert_amount = accountService.account.billing_alert_amount || 0;
                  accountService.update(accountService.account);
                },
                value: accountService.account.billing_alert_amount
              }),
              m('span.icon.is-left', m('i.fas.fa-pound-sign'))
            ]))
          ])
        )),
        m('.row.is-vcentered.fade-in', m('.column',
          m('h5', 'Billing history'),
          m('.row.is-vcentered.page-section', [
            m('.column.is-gapless', m('p', 'Your most recent billing events.')),
            m('.column',
              m('button.is-link.is-outlined.is-small', {
                onclick: () => {
                  billingLogService.downloadAll();
                }
              }, 'download')
            )
          ]),
          m('table.is-fullwidth', [
            m('thead.has-text-weight-semibold', m('tr', [
              m('th', 'Action'),
              m('th', 'Amount'),
              m('th', 'Time')
            ])),
            m('tbody', [billingLogService.logs.content.map((log) => {
              return m('tr', [
                m('td', log.action),
                m('td', log.amount),
                m('td', moment(log.created_date).fromNow())
              ]);
            })])
          ])
        ))
      ];
    }
  };
};
