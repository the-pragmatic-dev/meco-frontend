const m = require('mithril');
const bullet = require('bullet-pubsub');
const classNames = require('classnames');
const settings = require('../../settings');
const keyService = require('../../services/key.service');
const modal = require('../modal.component');

module.exports = (initialVnode) => {
  let keysListOpen = true;
  let disableAllModalActive = false;
  let createKeyModalActive = false;

  const keyEnabledCount = () => {
    return keyService.keys.filter((key) => key.enabled === true).length;
  };

  return {
    oninit: (vnode) => {
      keyService.findAll();
      bullet.on('create-new-key', () => {
        createKeyModalActive = true;
      });
    },
    onremove: (vnode) => {
      bullet.off('create-new-key');
    },
    view: (vnode) => {
      return m('aside#keys-list.fade-in', {
        class: classNames({ 'is-active': keysListOpen })
      }, [
        m('.container', [
          m('.row.is-vcentered', m('.column.keys-toggle.has-text-right', {
            onclick: (v) => {
              keysListOpen = !keysListOpen;
            }
          }, m('span.fas.fa-angle-double-left.fa-2x'))),
          m('.row.is-vcentered', m('h5.keys-title.has-text-weight-semibold', 'API Keys')),
          m('.row.is-vcentered', keyService.keys.map((item) => {
            return m('.key-row.column.is-12', {
              class: classNames({ 'is-active': item.id === keyService.current.id }),
              onclick: () => {
                keyService.removeAllHashes();
                keyService.setCurrent(item.id);
              }
            }, [
              m('span.dot', {
                class: classNames({ 'is-link': item.enabled }, { 'is-danger': !item.enabled })
              }),
              m('span.key-name.is-uppercase', item.name)
            ]);
          })),
          m('.row.is-vcentered.is-hcentered', m('a.keys-new-key.is-primary.is-uppercase', {
            class: classNames({ 'is-hidden': keyService.keys.length === settings.maxKeys }),
            onclick: () => {
              createKeyModalActive = true;
            }
          }, 'create new key'))
        ]),
        m('.footer.is-fixed-bottom.container',
          m('.row.is-gapless.is-vcentered.is-hcentered', [
            m('.column', m('span', `${keyEnabledCount()} key${keyEnabledCount() === 1 ? '' : 's'} enabled`)),
            m('.column', m('a.is-danger', {
              onclick: () => {
                disableAllModalActive = true;
              }
            }, [
              m('span', 'disable all'),
              m('span.icon.fas.fa-stop.fa-2x')
            ]))
          ])
        )
      ], m(modal, { // CREATE KEY MODAL
        active: createKeyModalActive,
        takesInput: true,
        color: 'primary',
        title: 'Create API Key',
        message: 'Remember to copy the blue API key after creation! You will only get one chance to do this.',
        submitText: 'yes, create api key',
        cancelText: 'cancel, do not create api key',
        submitCallback: (name) => {
          keyService.create(name);
          createKeyModalActive = false;
        },
        cancelCallback: () => {
          createKeyModalActive = false;
        }
      }), m(modal, { // ENABLE KEY MODAL
        active: disableAllModalActive,
        color: 'warning',
        title: 'Disable all API Keys',
        message: 'Warning: Disabling all API keys will prevent further usage of all keys.',
        submitText: 'yes, disable all api keys',
        cancelText: 'cancel, do not alter api keys',
        submitCallback: () => {
          keyService.keys.forEach(key => {
            key.enabled = false;
            keyService.update(key);
          });
          disableAllModalActive = false;
        },
        cancelCallback: () => {
          disableAllModalActive = false;
        }
      }));
    }
  };
};
