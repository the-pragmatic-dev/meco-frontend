const m = require('mithril');
const bullet = require('bullet-pubsub');
const moment = require('moment');
const accountService = require('../../../services/account.service');
const avatarService = require('../../../services/avatar.service');

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return [
        m('.row.is-vcentered.fade-in', m('.column',
          m('section.profile-edit.has-border', [
            m('.row.is-vcentered', [
              m('.column.no-growth', m('figure.image.is-profile.is-inline-flex', {
                style: {
                  'background-image': `url(${avatarService.fetch(accountService.account.avatar)})`
                }
              })),
              m('.column.profile-container', [
                m('h5', accountService.account.full_name),
                m('a.is-info', {
                  onclick: (vnode) => {
                    bullet.trigger('plan-settings');
                  }
                }, 'Plan: Free'),
                m('.row.is-vcentered', [
                  m('.column', m('p', `Member since ${moment(accountService.account.created_date).format('Qo MMMM YYYY')}`)),
                  m('.column', m('button.is-link.is-outlined.is-small', {
                    onclick: (vnode) => {
                      bullet.trigger('edit-profile');
                    }
                  }, 'edit profile'))
                ])
              ])
            ])
          ])
        )),
        m('.row.is-vcentered.fade-in', m('.column.profile-signin-method',
          m('h5', 'Sign-in method'),
          m('p.is-uppercase.has-text-weight-semibold', 'email address'),
          m('p', accountService.account.username),
          m('a.is-info', {
            onclick: (vnode) => {
              bullet.trigger('2fa-settings');
            }
          }, 'Two-factor authentication settings')
        )),
        m('hr'),
        m('.row.is-vcentered.fade-in', m('.column.profile-password',
          m('h5', 'Password'),
          m('.row.is-vcentered', [
            m('.column', m('p', '************************************')),
            m('.column', m('button.is-link.is-outlined.is-small', {
              onclick: (vnode) => {
                bullet.trigger('reset-password');
              }
            }, 'reset password'))
          ])
        )),
        m('hr'),
        m('.row.is-vcentered.fade-in', m('.column.profile-email-preferences',
          m('h5', 'Email preferences'),
          m('.row.is-vcentered', [
            m('.column', m('p', 'Unsubscribe me from product announcements and updates.')),
            m('.column', m('label.switch', [
              m('input', {
                type: 'checkbox',
                checked: accountService.account.email_subscription_enabled,
                onclick: () => {
                  accountService.account.email_subscription_enabled = !accountService.account.email_subscription_enabled;
                  accountService.update(accountService.account);
                }
              }),
              m('span.slider.is-rounded')
            ]))
          ])
        )),
        m('hr'),
        m('.row.is-vcentered.fade-in', m('.column.profile-deactivate-account',
          m('h5', 'Deactivate account'),
          m('.row.is-vcentered', [
            m('.column', m('p', 'This will remove your account from all teams and disable your account.')),
            m('.column', m('button.is-danger.is-outlined.is-small', 'deactivate account'))
          ])
        ))
      ];
    }
  };
};
