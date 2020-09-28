const m = require('mithril');
const keyService = require('../../../../services/key.service');

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
          m('span.has-padding-left', 'Restrict API keys so requests made by this key must originate from a whitelisted IP address. Useful for applications which require a higher level of security. Each entry can be either a single IP address or a CIDR-notation IP range.')
        ]
        )),
        m('.row.is-vcentered.fade-in', m('.column',
          m('table.is-fullwidth', [
            m('thead.has-text-weight-semibold', m('tr', [
              m('th', 'Name'),
              m('th', m('.tooltip', [
                m('span.tooltiptext.is-inline', 'Specify a range of IPv4 addresses in the form of a Classless Inter-Domain Routing block.'),
                m('span.has-text-link.fas.fa-info-circle.fa-lg'),
                m('span.has-padding-left', 'CIDR Range')
              ])),
              m('th', '')
            ])),
            m('tbody', [keyService.current.access_policies.map((policy) => {
              return m('tr', [
                m('td.has-text-weight-semibold', m('.field', m('input.is-block', { type: 'text', placeholder: 'i.e. home network', value: policy.name }))),
                m('td.has-text-weight-semibold', m('.field', m('input.is-block', { type: 'text', placeholder: 'i.e. 10.0.0.0/16', value: policy.range }))),
                m('td.has-text-weight-semibold', m('button.is-danger.is-outlined.is-small', 'delete rule'))
              ]);
            }),
            // TODO: this is the empty state to add new ranges.
            m('tr', [
              m('td.has-text-weight-semibold', m('.field', m('input.is-block', { type: 'text', placeholder: 'i.e. home network' }))),
              m('td.has-text-weight-semibold', m('.field', m('input.is-block', { type: 'text', placeholder: 'i.e. 10.0.0.0/16' }))),
              m('td.has-text-weight-semibold')
            ])
            ])
          ])
        ))
      ];
    }
  };
};
