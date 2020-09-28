const m = require('mithril');

const row = (header, content) => {
  return m('row.has-text-left', m('.column.privacy-section',
    m('h6.has-text-weight-semibold.has-text-info.is-uppercase', header),
    m('p', content)
  ));
};

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('section#privacy.is-hcentered.fade-in-long', m('.container', [
        m('row', m('.column',
          m('h4.has-text-weight-semibold', 'Privacy Policy'),
          m('h5', '22nd September, 2020')
        )),
        row(
          'Section 1 - What do we do with your information?',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur vel purus non maximus. Maecenas elit eros, tincidunt at vulputate in, placerat in ante. Quisque fringilla sodales diam, nec hendrerit justo posuere nec.'
        ),
        row(
          'Section 2 - Consent',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur vel purus non maximus. Maecenas elit eros, tincidunt at vulputate in, placerat in ante. Quisque fringilla sodales diam, nec hendrerit justo posuere nec.'
        ),
        row(
          'Section 3 - Disclosure',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur vel purus non maximus. Maecenas elit eros, tincidunt at vulputate in, placerat in ante. Quisque fringilla sodales diam, nec hendrerit justo posuere nec.'
        ),
        row(
          'Section 4 - Payment Data',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur vel purus non maximus. Maecenas elit eros, tincidunt at vulputate in, placerat in ante. Quisque fringilla sodales diam, nec hendrerit justo posuere nec.'
        )
      ]));
    }
  };
};
