const m = require('mithril');
const avatarService = require('../services/avatar.service');

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('.empty-state.fade-in-long', [
        m('.row.is-hcentered', m('.column', m('figure.image.is-profile.is-inline-flex', {
          style: {
            'background-image': `url(${avatarService.fetch(10)})`
          }
        }))),
        m('.row.is-hcentered', m('.column', m('p', vnode.attrs.message))),
        m('.row.is-hcentered', m('.column', m('button.is-primary', {
          onclick: vnode.attrs.submitCallback
        }, vnode.attrs.submitText)))
      ]);
    }
  };
};
