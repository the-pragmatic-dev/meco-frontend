const m = require('mithril');
const stream = require('mithril/stream');
const classNames = require('classnames');
const links = require('../links.component');
const footer = require('../footer.component');

const tabContent = [
  { name: 'all' },
  { name: 'social' },
  { name: 'developer tools' },
  { name: 'browser' }
];

const testIntegrations = [
  { name: 'discord', version: '1.1156', color: 'primary', tags: ['all', 'social'] },
  { name: 'chrome', version: '2.1009', color: 'link', tags: ['all', 'browser'] },
  { name: 'slack', version: '2.1009', color: 'danger', tags: ['all', 'social', 'developer tools'] }
];

module.exports = (initialVnode) => {
  const activeTab = stream(0);

  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('.overflow-container', [
        m('section#integrations',
          m('.container', [
            m('.row.is-vcentered.is-mobile-hcentered', [
              m('.column.is-6', m('h3.is-gapless', 'Integrations')),
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
            m('.integration-columns.row.is-vcentered.fade-in', testIntegrations.filter(integration => {
              return integration.tags.includes(tabContent[activeTab()].name);
            }).map((integration, i) => {
              return m('.column.is-3', m('.card', [
                m(`.card-overlay.is-${integration.color}`),
                m('.card-image', m('figure.image', m('img', { src: 'https://bulma.io/images/placeholders/1280x960.png' }))),
                m('.card-content', [
                  m('h5.is-capitalized.has-text-weight-semibold', integration.name),
                  m('span.has-text-primary.is-uppercase.is-size-7.has-text-weight-semibold', 'version: '),
                  m('span.is-size-7', integration.version)
                ])
              ]));
            }))
          ])
        ),
        m(footer)
      ]);
    }
  };
};
