const m = require('mithril');
const classNames = require('classnames');

module.exports = (initialVnode) => {
  let input = '';
  return {
    oninit: (vnode) => {
      input = vnode.attrs.input || '';
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('.modal.fade-in-long.zoom-in', {
        class: classNames({ 'is-active': vnode.attrs.active })
      }, [
        m('.modal-background'),
        m('.modal-content', [
          m('.modal-title', [
            m(`span.has-text-${vnode.attrs.color}.fas.fa-exclamation-triangle.fa-3x`),
            m(`h3.is-gapless.has-text-${vnode.attrs.color === 'warning' ? 'dark' : vnode.attrs.color}`, vnode.attrs.title)
          ]),
          m('.modal-message', [
            m('.row.is-vcentered.is-hcentered.is-gapless', m('.column',
              m('p.has-text-weight-semibold.is-gapless', vnode.attrs.message))),
            vnode.attrs.takesInput === true
              ? m('.row.is-vcentered.is-hcentered.is-gapless', m('.column',
                m('.field', m('input.is-block.is-fullwidth ', {
                  type: 'text',
                  oninput: function (e) { input = e.target.value; },
                  value: input,
                  placeholder: 'i.e. Good Coffee Shop'
                })))) : m('')
          ]),
          m('.modal-buttons', m('.row.is-vcentered', [
            m('.column', m(`button.is-${vnode.attrs.color}`, {
              disabled: vnode.attrs.takesInput ? input.trim() === '' : false,
              onclick: () => {
                vnode.attrs.submitCallback(input);
                input = '';
              }
            }, vnode.attrs.submitText)),
            m('.column', m('button.is-primary.is-outlined', {
              onclick: vnode.attrs.cancelCallback
            }, vnode.attrs.cancelText))
          ])),
          m('a.delete', {
            onclick: vnode.attrs.cancelCallback
          })
        ])
      ]);
    }
  };
};
