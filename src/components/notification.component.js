const m = require('mithril');

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('header.notification', [
        m('.notification-content', [
          m('span.has-text-white', 'Enjoy unlimited operations by upgrading today'),
          m('button.is-info.is-outlined.is-rounded.is-small', 'upgrade')
        ]),
        m('a.delete')
      ]);
    }
  };
};
