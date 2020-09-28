const m = require('mithril');
const stream = require('mithril/stream');
const classNames = require('classnames');
const imageScopes = require('./image_scopes.component');
const textScopes = require('./text_scopes.component');
const videoScopes = require('./video_scopes.component');
const whitelist = require('./whitelist.component');

module.exports = (initialVnode) => {
  const activeTab = stream(0);

  const tabContent = [
    { name: 'text scopes', content: textScopes },
    { name: 'image scopes', content: imageScopes },
    { name: 'video scopes', content: videoScopes },
    { name: 'ip whitelist', content: whitelist }
  ];

  return {
    oninit: (vnode) => {
    },
    oncreate: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('#security-container.fade-in', [
        m('.row.is-vcentered',
          m('.column',
            m('.tabs.is-small', m('ul', tabContent.map((tab, i) => {
              return m('li', {
                class: classNames({ 'is-active': activeTab() === i }),
                onclick () { activeTab(i); }
              }, m('a.is-uppercase', tab.name));
            })))
          )
        ),
        m('.container', m(tabContent[activeTab()].content))
      ]);
    }
  };
};
