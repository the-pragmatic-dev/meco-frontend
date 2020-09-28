const AvatarService = {
  fetch: (id) => {
    switch (id) {
      case 0: return require('../images/avatars/0.png').default;
      case 1: return require('../images/avatars/1.png').default;
      case 2: return require('../images/avatars/2.png').default;
      case 3: return require('../images/avatars/3.png').default;
      case 4: return require('../images/avatars/4.png').default;
      case 5: return require('../images/avatars/5.png').default;
      case 6: return require('../images/avatars/6.png').default;
      case 7: return require('../images/avatars/7.png').default;
      case 8: return require('../images/avatars/8.png').default;
      case 9: return require('../images/avatars/9.png').default;
      case 10: return require('../images/avatars/10.png').default;
      case 11: return require('../images/avatars/11.png').default;
      case 12: return require('../images/avatars/12.png').default;
      case 13: return require('../images/avatars/13.png').default;
      case 14: return require('../images/avatars/14.png').default;
      default: return require('../images/avatars/15.png').default;
    }
  }
};
module.exports = AvatarService;
