const m = require('mithril');
const chart = require('../chart.component');
const links = require('../links.component');
const footer = require('../footer.component');

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('.overflow-container', [
        m('section#activity',
          m('.container', [
            m('.row.is-vcentered.is-mobile-hcentered', [
              m('.column.is-6', m('h3.is-gapless', 'Activity')),
              m(links)
            ]),
            m('.row.is-vcentered.fade-in', m('.column',
              m('section.has-border', [
                m('h5', 'Total account operation usage (5,034 / 10,000)'),
                m('p', [
                  m('span', 'This is the current operation total for your whole account. Once the number of operations exceed your plan limit you will be charged for each operation in excess. You may cap your overage limit in the '),
                  m('a.is-info', 'billing settings.')
                ]),
                m('progress.progress.is-small.is-info', { value: '50', max: '100' }, '50%')
              ])
            )),
            m('.row.is-vcentered.fade-in', m('.column',
              m('h5', 'Operations'),
              m(chart)
            ))
          ])
        ),
        m(footer)
      ]);
    }
  };
};
