import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import m from 'mithril';
import activity from './components/activity/page.component';
import keys from './components/api-keys/page.component';
import documentation from './components/home/documentation.component';
import footer from './components/home/footer.component';
import nav from './components/home/nav.component';
import home from './components/home/page.component';
import privacy from './components/home/privacy.component';
import integrations from './components/integrations/page.component';
import login from './components/login/page.component';
import menu from './components/navigation/menu.component';
import notification from './components/notification.component';
import settings from './components/settings/page.component';
import iconService from './services/icon.service';
import './styles/_all.less';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
iconService.load();

function page (content, page) {
  return {
    view: function (vnode) {
      return [
        m(notification),
        m('main#content', [
          m(menu, { page: page }),
          m(content)
        ])
      ];
    }
  };
}

function homePage (content) {
  return {
    view: function (vnode) {
      return [
        m(nav),
        m(content),
        m(footer)
      ];
    }
  };
}

function defaultRouteResolver (component) {
  return {
    onmatch: function () {
      if (localStorage.getItem('access_token')) m.route.set('/keys');
      else return component;
    },
    render: function (vnode) {
      return vnode;
    }
  };
}

function homeRouteResolver (component) {
  return {
    onmatch: function () {
      return homePage(component);
    },
    render: function (vnode) {
      return vnode;
    }
  };
}

function secureRouteResolver (component, name) {
  return {
    onmatch: function () {
      if (!localStorage.getItem('access_token')) m.route.set('/login');
      else return page(component, name);
    },
    render: function (vnode) {
      return vnode;
    }
  };
}

m.route(document.body, '/', {
  '/': homeRouteResolver(home),
  '/documentation': homeRouteResolver(documentation),
  '/privacy': homeRouteResolver(privacy),
  '/login': defaultRouteResolver(login),
  '/keys': secureRouteResolver(keys, 'keys'),
  '/integrations': secureRouteResolver(integrations, 'integrations'),
  '/activity': secureRouteResolver(activity, 'activity'),
  '/settings': secureRouteResolver(settings, 'settings')
});
