const m = require('mithril');

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('footer.footer',
        // Footer large
        m('.container', m('.row', [
          m('.column.is-6.has-text-left', [
            m('h5.has-text-weight-semibold', 'MECO'),
            m('p',
              m('span', 'An open-source AI powered cloud platform to help moderate explicit content online. Join our '),
              m('a.is-link.has-text-decoration-none', {
                target: '_blank',
                href: 'https://discord.gg/Y7Rx485'
              }, 'community'),
              m('span', ' and help us focus on what matters most.')
            )
          ]),
          m('.column.is-3.has-text-left', [
            m('h6', 'Documentation'),
            m('.row', m('a.is-link.has-text-decoration-none', {
              onclick: () => {
                m.route.set('/documentation');
              }
            }, 'API Documentation')),
            m('.row', m('a.is-link.has-text-decoration-none', {
              onclick: () => {
                m.route.set('/documentation');
              }
            }, 'Integrations'))
          ]),
          m('.column.is-3.has-text-left', [
            m('h6', 'External'),
            m('.row', m('a.is-link.has-text-decoration-none', {
              onclick: () => {
                window.open('https://medium.com/meco-engineering', '_blank');
              }
            }, 'Blog')),
            m('.row', m('a.is-link.has-text-decoration-none', {
              onclick: () => {
                window.open('https://github.com/the-pragmatic-dev/meco-api', '_blank');
              }
            }, 'GitHub'))
          ])
        ])),
        // Footer small
        m('.container', m('.row.copyright-container.is-size-7.has-border-top', [
          m('.column.is-6', m('p.copyright', `© ${new Date().getFullYear()} meco.dev by The Pragmatic Dev Ltd. All Rights Reserved`)),
          m('.column.is-6.copyright-links', [
            m('a.copyright-link.is-link.has-text-decoration-none.has-padding-right', {
              onclick: () => {
                m.route.set('/privacy');
              }
            }, 'Privacy Policy'),
            m('a.copyright-link.is-link.has-text-decoration-none', {
              onclick: () => {
                // TODO
              }
            }, 'Terms and Conditions')
          ])
        ]
        )));
    }
  };
};
