const m = require('mithril');
const stream = require('mithril/stream');
const authService = require('../../services/auth.service');
const accountService = require('../../services/account.service');
const actuatorService = require('../../services/actuator.service');
const nav = require('../home/nav.component');

module.exports = (initialVnode) => {
  const activeForm = stream(0);

  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return [
        m(nav),
        m('main.container.is-gapless.is-fluid.fade-in-long#signin', m('.row.is-gapless', [
          m('.column.is-gapless', m('.hero.is-fullheight.has-nav', m('.hero-body',
            m('.container.is-hcentered', [
              activeForm() === 0 ? [
                m('.row.is-hcentered', m('.column.is-7', m('input.is-fullwidth', {
                  type: 'email',
                  oninput: function (e) { authService.username = e.target.value; },
                  value: authService.username,
                  placeholder: 'Email address'
                }))),
                m('.row.is-hcentered', m('.column.is-7', m('input.is-fullwidth', {
                  type: 'password',
                  oninput: function (e) { authService.password = e.target.value; },
                  value: authService.password,
                  placeholder: 'Password'
                }))),
                m('.row.is-hcentered', m('.column.is-7', m('button.is-fullwidth.is-link', {
                  onclick: () => {
                    authService.signin(authService.username, authService.password).then(() => {
                      accountService.findAuthenticatedAccount();
                      actuatorService.findInfo();
                      actuatorService.findHealth();
                    });
                    // TODO some visible loading animation
                  }
                }, 'signin'))),
                m('.row.is-hcentered', m('.column.is-7', m('a.is-link', {
                  onclick: () => {
                    activeForm(1);
                  }
                }, 'Forgot password?')))
              ] : [m('.row.is-hcentered', m('.column.is-7', m('input.is-fullwidth', {
                type: 'email',
                oninput: function (e) { authService.forgot = e.target.value; },
                value: authService.forgot,
                placeholder: 'Email address'
              }))),
              m('.row.is-hcentered', m('.column.is-7', m('button.is-fullwidth.is-link', {
                onclick: () => {
                  authService.forgotPassword(authService.forgot);
                }
              }, 'reset password'))),
              m('.row.is-hcentered', m('.column.is-7', m('a.is-link', {
                onclick: () => {
                  activeForm(0);
                }
              }, 'Back to signin')))]
            ])))),
          m('.column.is-gapless.is-mobile-hidden', m('#particles-js.hero.is-link.is-fullheight.has-nav', m('.hero-body')))
        ]))
      ];
    }
  };
};
