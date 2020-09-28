const m = require('mithril');
const classNames = require('classnames');

const testMenuItemData = [
  { page: 'keys', icon: 'fa-key', tooltip: 'API keys', active: true },
  { page: 'integrations', icon: 'fa-puzzle-piece', tooltip: 'Integrations', active: false },
  { page: 'activity', icon: 'fa-chart-area', tooltip: 'Activity', active: false },
  { page: 'settings', icon: 'fa-cog', tooltip: 'Settings', active: false }
];

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('nav.sidebar',
        m('.container.is-gapless', testMenuItemData.map((item, i) => {
          return m('.sidebar-item.row.is-hcentered.is-vcentered.tooltip',
            {
              class: classNames({ 'is-active': vnode.attrs.page === item.page }),
              onclick: () => {
                m.route.set(`/${item.page}`);
              }
            },
            [
              m('span.tooltiptext', item.tooltip),
              m('.column.is-12',
                m(`span.fas.${item.icon}.fa-2x`)
              )
            ]);
        }))
      );
    }
  };
};
