const m = require('mithril');
const stream = require('mithril/stream');
const bullet = require('bullet-pubsub');
const classNames = require('classnames');
const links = require('../links.component');
const footer = require('../footer.component');
const details = require('./tabs/details.component');
const activity = require('./tabs/activity.component');
const security = require('./tabs/security/content.component');
const logs = require('./tabs/logs.component');
const emptyState = require('../empty.component');
const keyService = require('../../services/key.service');
const modal = require('../modal.component');

module.exports = (initialVnode) => {
  let renameModalActive = false;
  let enableModalActive = false;
  let disableModalActive = false;
  let deleteModalActive = false;

  const activeTab = stream(0);

  const tabContent = [
    { name: 'details', content: details },
    { name: 'activity', content: activity },
    { name: 'security', content: security },
    { name: 'logs', content: logs }
  ];

  return {
    oninit: (vnode) => {
    },
    oncreate: (vnode) => {
    },
    onremove: (vnode) => {
      keyService.removeAllHashes();
    },
    view: (vnode) => {
      return m('.overflow-container', [
        m('aside#keys-content',
          Object.keys(keyService.current).length !== 0 ? [
            m('.container', [
              m('.row.is-vcentered', [
                m('.column.is-6', m('h3.is-gapless', keyService.current.name)),
                m(links)
              ]),
              m('.row.is-vcentered.keys-api-hash', m('.column', [
                keyService.current.key === undefined ? [
                  m('span.has-text-primary', keyService.current.prefix),
                  m('span.has-text-primary', '•••••••••••••••••••••••••••••••••')]
                  : m('span.has-text-info.has-word-wrap', `${keyService.current.key}`)
              ])),
              m('.row.is-vcentered', [
                m('.column', m('.keys-actions', [
                  m('button.is-link.is-outlined.is-small.has-margin-right', {
                    onclick: () => {
                      renameModalActive = true;
                    }
                  }, 'rename key'),
                  keyService.current.enabled
                    ? m('button.is-warning.is-outlined.is-small.has-margin-right', {
                      onclick: () => {
                        disableModalActive = true;
                      }
                    }, 'disable key')
                    : m('button.is-link.is-outlined.is-small.has-margin-right', {
                      onclick: () => {
                        enableModalActive = true;
                      }
                    }, 'enable key'),
                  m('button.is-danger.is-outlined.is-small', {
                    onclick: () => {
                      deleteModalActive = true;
                    }
                  }, 'delete key')
                ]))
              ]),
              m('.row.is-vcentered', [
                m('.column', [
                  m('.tabs', m('ul', tabContent.map((tab, i) => {
                    return m('li', {
                      class: classNames({ 'is-active': activeTab() === i }),
                      onclick () { activeTab(i); }
                    }, m('a.is-uppercase', tab.name));
                  })))
                ])
              ])
            ]),
            m('.container', m(tabContent[activeTab()].content))
          ] : m('.container.is-fullheight', [
            m('.row.is-vcentered', [
              m('.column.is-6'),
              m(links)
            ]),
            m(emptyState, {
              message: 'We\'re going to need an API key to start moderating content!',
              submitText: 'Create key',
              submitCallback: () => {
                bullet.trigger('create-new-key');
              }
            })
          ])
        ),
        m(footer)
      ], m(modal, { // DELETE KEY MODAL
        active: deleteModalActive,
        color: 'danger',
        title: `Delete (${keyService.current.name}) API Key`,
        message: 'Warning: this cannot be undone.',
        submitText: 'yes, delete api key',
        cancelText: 'cancel, keep api key',
        submitCallback: () => {
          keyService.delete(keyService.current);
          deleteModalActive = false;
        },
        cancelCallback: () => {
          deleteModalActive = false;
        }
      }), m(modal, { // DISABLE KEY MODAL
        active: disableModalActive,
        color: 'warning',
        title: `Disable (${keyService.current.name}) API Key`,
        message: 'Disable this API key if you want to prevent further usage of this key.',
        submitText: 'yes, disable api key',
        cancelText: 'cancel, keep api key enabled',
        submitCallback: () => {
          keyService.current.enabled = false;
          keyService.update(keyService.current);
          disableModalActive = false;
        },
        cancelCallback: () => {
          disableModalActive = false;
        }
      }), m(modal, { // ENABLE KEY MODAL
        active: enableModalActive,
        color: 'link',
        title: `Enable (${keyService.current.name}) API Key`,
        message: 'Enable this API key if you want to continue usage of this key.',
        submitText: 'yes, enable api key',
        cancelText: 'cancel, keep api key disabled',
        submitCallback: () => {
          keyService.current.enabled = true;
          keyService.update(keyService.current);
          enableModalActive = false;
        },
        cancelCallback: () => {
          enableModalActive = false;
        }
      }), m(modal, { // RENAME KEY MODAL
        active: renameModalActive,
        takesInput: true,
        color: 'link',
        title: `Rename (${keyService.current.name}) API Key`,
        message: 'Rename this API key.',
        submitText: 'yes, rename api key',
        cancelText: 'cancel, keep api key name',
        submitCallback: (name) => {
          keyService.current.name = name;
          keyService.update(keyService.current);
          renameModalActive = false;
        },
        cancelCallback: () => {
          renameModalActive = false;
        }
      })
      );
    }
  };
};
