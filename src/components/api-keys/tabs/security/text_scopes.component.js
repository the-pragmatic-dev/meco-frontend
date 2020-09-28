const m = require('mithril');
const keyService = require('../../../../services/key.service');

const tr = (header, key) => {
  return m('tr', [
    m('td.has-text-weight-semibold', header),
    m('td', m('label.switch', [
      m('input', {
        type: 'checkbox',
        checked: keyService.current.scope.text[key],
        onclick: () => {
          keyService.current.scope.text[key] = !keyService.current.scope.text[key];
          keyService.update(keyService.current);
        }
      }),
      m('span.slider.is-rounded')
    ]))
  ]);
};

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return [
        m('.row.is-vcentered.fade-in', m('.column.is-flex.is-vcentered', [
          m('span.has-text-link.fas.fa-info-circle.fa-lg'),
          m('span.has-padding-left', 'Restrict access of this API key to specific actions that the key can carry out. This can be done by enabling / disabling the scopes below, where each scope represents a specific permission.')
        ]
        )),
        m('.row.is-vcentered.fade-in', m('.column',
          m('table.is-fullwidth',
            m('tbody', [
              tr('Identity Attack', 'identity_attack'),
              tr('Insult', 'insult'),
              tr('Profanity', 'profanity'),
              tr('Severe Toxicity', 'severe_toxicity'),
              tr('Threat', 'threat'),
              tr('Toxicity', 'toxicity')
            ])
          )
        ))
      ];
    }
  };
};
