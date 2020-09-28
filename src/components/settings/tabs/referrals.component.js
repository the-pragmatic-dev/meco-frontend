const m = require('mithril');

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('p.fade-in', 'WIP');
    }
  };
};
