const m = require('mithril');
const bullet = require('bullet-pubsub');
const settings = require('../settings');
const authService = require('./auth.service');

const KeyService = {
  keys: [],
  current: {},
  findAll: () => {
    if (!Array.isArray(KeyService.keys) || !KeyService.keys.length) {
      m.request({
        method: 'GET',
        url: `${settings.host}:${settings.port}/${settings.version}/api-keys`,
        headers: {
          Authorization: `Bearer ${authService.accessToken}`
        }
      }).then((response) => {
        response.sort((a, b) => {
          return a.id - b.id;
        });
        KeyService.keys = response.map(key => ({ ...key, active: false }));
        if (!Array.isArray(KeyService.keys) || !KeyService.keys.length) {
          KeyService.current = {};
        } else {
          KeyService.setCurrent(KeyService.keys[0].id);
        }
      });
    }
    return KeyService.keys;
  },
  findById: (id) => {
    return KeyService.keys.find(key => key.id === id);
  },
  create: (name) => {
    m.request({
      method: 'POST',
      url: `${settings.host}:${settings.port}/${settings.version}/api-keys`,
      headers: {
        Authorization: `Bearer ${authService.accessToken}`,
        'User-Agent': navigator.userAgent
      },
      body: { name: name, enabled: true }
    }).then((response) => {
      KeyService.keys.push(response);
      KeyService.setCurrent(KeyService.keys[KeyService.keys.length - 1].id);
    });
  },
  update: (key) => {
    m.request({
      method: 'PUT',
      url: `${settings.host}:${settings.port}/${settings.version}/api-keys/${key.id}`,
      headers: {
        Authorization: `Bearer ${authService.accessToken}`
      },
      body: key
    });
  },
  delete: (key) => {
    m.request({
      method: 'DELETE',
      url: `${settings.host}:${settings.port}/${settings.version}/api-keys/${key.id}`,
      headers: {
        Authorization: `Bearer ${authService.accessToken}`
      }
    }).then(function (response) {
      KeyService.keys = KeyService.keys.filter(k => k.id !== key.id);
      if (!Array.isArray(KeyService.keys) || !KeyService.keys.length) {
        KeyService.current = {};
      } else {
        KeyService.setCurrent(KeyService.keys[0].id);
      }
    });
  },
  setCurrent: (id) => {
    KeyService.current = KeyService.keys.find(key => key.id === id);
    bullet.trigger('key-current-changed');
  },
  removeAllHashes: () => {
    KeyService.keys.map(k => (k.key = undefined));
  }
};

module.exports = KeyService;
