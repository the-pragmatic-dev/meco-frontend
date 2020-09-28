const m = require('mithril');
const list = require('./list.component');
const content = require('./content.component');

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('section#keys.is-gapless', [
        m(list),
        m(content)
      ]);
    }
  };
};
