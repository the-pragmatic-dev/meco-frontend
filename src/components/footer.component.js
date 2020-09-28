const m = require('mithril');
const actuatorService = require('../services/actuator.service');

module.exports = (initialVnode) => {
  const serviceStatus = () => {
    return actuatorService.health.status === 'UP' ? 'operational' : 'offline';
  };

  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('.footer.is-fixed-bottom.has-background-white.container.is-fluid',
        m('.row.is-gapless.is-vcentered.is-hcentered', [
          m('.column', m('.tags.has-addons', [
            m('.tag.is-dark', actuatorService.info.app.version.name),
            m('.tag.is-link', `${actuatorService.info.app.version.major}.${actuatorService.info.app.version.minor}.${actuatorService.info.app.version.patch}`)
          ])),
          m('.column', m('.tags.has-addons', [
            m('.tag.is-dark', 'service'),
            m(`.tag.is-${actuatorService.health.status === 'UP' ? 'success' : 'danger'}`, serviceStatus())
          ]))
        ])
      );
    }
  };
};
