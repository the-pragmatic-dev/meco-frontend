const m = require('mithril');
const settings = require('../settings');

const ActuatorService = {
  info: {
    app: {
      version: {
        name: 'alpha',
        major: 0,
        minor: 1,
        patch: 0
      }
    }
  },
  health: {
    status: 'UP'
  },
  findInfo: () => {
    m.request({
      method: 'GET',
      url: `${settings.host}/actuator/info`
    }).then((response) => {
      ActuatorService.info = response;
    });
  },
  findHealth: () => {
    m.request({
      method: 'GET',
      url: `${settings.host}/actuator/health`
    }).then((response) => {
      ActuatorService.health = response;
    });
  }
};

module.exports = ActuatorService;
