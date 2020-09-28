const m = require('mithril');
const authService = require('../services/auth.service');

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('.column.is-6.links', [
        m('a.is-primary.is-uppercase.has-padding-right', {
          onclick: () => {
            window.open('https://www.meco.dev/#!/documentation', '_blank');
          }
        }, 'documentation'),
        m('a.is-primary.is-uppercase', {
          onclick: () => {
            authService.signout();
          }
        }, 'logout')
      ]);
    }
  };
};
