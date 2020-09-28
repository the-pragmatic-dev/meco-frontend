const m = require('mithril');
const stream = require('mithril/stream');
const bullet = require('bullet-pubsub');
const classNames = require('classnames');
const modal = require('../modal.component');
const links = require('../links.component');
const footer = require('../footer.component');
const profile = require('./tabs/profile.component');
const billing = require('./tabs/billing.component');
const security = require('./tabs/security.component');
const referrals = require('./tabs/referrals.component');
const authService = require('../../services/auth.service');
const accountService = require('../../services/account.service');

const tabContent = [
  { name: 'profile', content: profile },
  { name: 'billing', content: billing },
  { name: 'security', content: security },
  { name: 'referrals', content: referrals }
];

module.exports = (initialVnode) => {
  const activeTab = stream(0);

  let editProfileModalActive = false;
  let resetPasswordModalActive = false;

  return {
    oninit: (vnode) => {
      accountService.findAuthenticatedAccount();
      bullet.on('2fa-settings', () => {
        activeTab(tabContent.findIndex(tab => tab.name === 'security'));
        m.redraw();
      });
      bullet.on('plan-settings', () => {
        activeTab(tabContent.findIndex(tab => tab.name === 'billing'));
        m.redraw();
      });
      bullet.on('edit-profile', () => {
        editProfileModalActive = true;
      });
      bullet.on('reset-password', () => {
        resetPasswordModalActive = true;
      });
    },
    onremove: (vnode) => {
      bullet.off('2fa-settings');
      bullet.off('plan-settings');
      bullet.off('edit-profile');
    },
    view: (vnode) => {
      return m('.overflow-container', [
        m('section#settings',
          m('.container', [
            m('.row.is-vcentered.is-mobile-hcentered', [
              m('.column.is-6', m('h3.is-gapless', 'Settings')),
              m(links)
            ]),
            m('.row.is-vcentered', [
              m('.column', [
                m('.tabs', m('ul', tabContent.map((tab, i) => {
                  return m('li', {
                    class: classNames({ 'is-active': activeTab() === i }),
                    onclick () { activeTab(i); }
                  }, m('a.is-uppercase', tab.name));
                })))
              ])
            ]),
            m('.container', m(tabContent[activeTab()].content))
          ])
        ), editProfileModalActive ? m(modal, { // EDIT PROFILE MODAL
          active: editProfileModalActive,
          takesInput: true,
          color: 'link',
          title: 'Edit Profile',
          message: 'Update your account name.',
          input: accountService.account.full_name,
          submitText: 'yes, update account',
          cancelText: 'cancel, keep account',
          submitCallback: (fullName) => {
            accountService.account.full_name = fullName;
            accountService.update(accountService.account);
            editProfileModalActive = false;
          },
          cancelCallback: () => {
            editProfileModalActive = false;
          }
        }) : m(''),
        resetPasswordModalActive ? m(modal, { // EDIT PROFILE MODAL
          active: resetPasswordModalActive,
          color: 'link',
          title: 'Reset Password',
          message: 'Send a password reset email to the account holder.',
          submitText: 'yes, send email',
          cancelText: 'cancel, keep password',
          submitCallback: () => {
            authService.forgotPassword(accountService.account.username);
            resetPasswordModalActive = false;
          },
          cancelCallback: () => {
            resetPasswordModalActive = false;
          }
        }) : m(''),
        m(footer)
      ]);
    }
  };
};
