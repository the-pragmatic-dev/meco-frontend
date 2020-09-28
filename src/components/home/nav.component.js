const m = require('mithril');
const classNames = require('classnames');

module.exports = (initialVnode) => {
  let menuOpen = false;

  return {
    oninit: (vnode) => {
      menuOpen = false;
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('section#nav', m('nav.nav-bar', [
        m('.row.nav-header', [
          m('h2.is-gapless.has-text-weight-semibold', {
            onclick: () => {
              m.route.set('/');
            }
          }, 'MECO'),
          m('a.has-text-white', {
            class: classNames({ 'is-active': menuOpen }),
            onclick: () => {
              menuOpen = !menuOpen;
            }
          }, m('span.icon.fas.fa-bars.fa-3x'))
        ]),
        m('ul', {
          class: classNames({ 'is-active': menuOpen })
        }, [
          m('li', m('a.is-uppercase.has-text-weight-semibold.has-text-decoration-none', {
            href: '/#features'
          }, 'features')),
          m('li', m('a.is-uppercase.has-text-weight-semibold.has-text-decoration-none', {
            href: '/#pricing'
          }, 'pricing')),
          m('li', m('a.is-uppercase.has-text-weight-semibold.has-text-decoration-none', {
            onclick: () => {
              m.route.set('/documentation');
            }
          }, 'documentation')),
          m('li', m('button.is-warning', {
            onclick: () => {
              m.route.set('/login');
            }
          }, 'dashboard'))
        ])
      ]));
    }
  };
};
