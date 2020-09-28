const hljs = require('highlight.js/lib/core');
const m = require('mithril');
const classNames = require('classnames');

const link = (id, name) => {
  return m('a.is-dark.has-text-decoration-none', {
    onclick: () => {
      document.getElementById(id).scrollIntoView();
    }
  }, name);
};

const section = (section) => {
  return m('section.container', [
    m(`h4#${section.id}.has-margin-top.has-text-weight-semibold`, section.name),
    section.paragraphs.map((paragraph) => {
      return m('p', paragraph);
    }),
    (section.url) ? m('pre', m('code.bash', section.url)) : null
  ]);
};

const quickstart = (section) => {
  return m('section.container', [
    m(`h4#${section.id}.has-margin-top.has-text-weight-semibold`, section.name),

    section.steps.map((step) => {
      return [
        m(`h6#${step.id}.has-text-info is-uppercase has-text-weight-semibold is-gapless`, step.name),
        m('p', step.description)
      ];
    })
  ]);
};

const support = (section) => {
  return m('section.container', [
    m(`h4#${section.id}.has-margin-top.has-text-weight-semibold`, section.name),

    section.channels.map((channel) => {
      return [
        m(`h6#${channel.id}.has-text-info is-uppercase has-text-weight-semibold is-gapless`, channel.name),
        m('p', channel.description)
      ];
    })
  ]);
};

const resource = (section) => {
  return m('section.container', [
    m(`h5#${section.id}.has-margin-top.has-text-weight-semibold`, section.name),
    section.paragraphs.map((paragraph) => {
      return m('p', paragraph);
    }),
    m('.table-wrapper', m('table.is-fullwidth',
      m('thead', m('tr.has-text-weight-semibold', [
        m('th', 'Attribute'),
        m('th', 'Type'),
        m('th', 'Description')
      ])),
      m('tbody', section.attributes.map((attribute) => {
        return m('tr', [
          m('td', attribute.name),
          m('td', attribute.type),
          m('td', attribute.description)
        ]);
      }))
    )),
    section.endpoints.map((endpoint) => {
      return [
        m(`h6#${endpoint.id}.documentation-endpoint-heading.has-text-info.is-uppercase.has-text-weight-semibold`, endpoint.name),
        m('span.tag.has-margin-bottom', {
          class: classNames({
            'is-info': endpoint.method === 'GET',
            'is-primary': endpoint.method === 'PUT',
            'is-warning': endpoint.method === 'POST',
            'is-danger': endpoint.method === 'DELETE'
          })
        }, endpoint.method),
        m('p', endpoint.description),
        m('p.has-text-weight-semibold', 'Request'),
        m('pre', m('code', m.trust(hljs.highlight('bash', endpoint.request).value))),
        (Array.isArray(endpoint.requestParams) && endpoint.requestParams.length) ? m('.table-wrapper', m('table.is-fullwidth',
          m('thead', m('tr.has-text-weight-semibold', [
            m('th', 'Request Parameter'),
            m('th', 'Type'),
            m('th', 'Description')
          ])),
          m('tbody', endpoint.requestParams.map((param) => {
            return m('tr', [
              m('td', param.value),
              m('td', param.type),
              m('td', param.description)
            ]);
          }))
        )) : null,
        (endpoint.response) ? [
          m('p.has-text-weight-semibold', 'Response'),
          m('pre', m('code', m.trust(hljs.highlight('json', endpoint.response).value)))
        ] : null,
        m('.table-wrapper', m('table.is-fullwidth',
          m('thead', m('tr.has-text-weight-semibold', [
            m('th', 'Response Code'),
            m('th', 'Description')
          ])),
          m('tbody', endpoint.codes.map((code) => {
            return m('tr', [
              m('td', code.value),
              m('td', code.description)
            ]);
          }))
        ))
      ];
    })
  ]);
};

const authSignupRequest = `curl --request POST 'https://meco.dev/v1/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "steve@email.com",
    "password": "password"
}'`;

const authSignupResponse = `{
  "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdGV2ZUBlbWFpbC5jb20iLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpYXQiOjE2MDEwMzk4NTYsImV4cCI6MTYwMTA0NzA1Nn0.j53Gg9i-TrCNHvOUjk6-DoEWxe4XEaZoknJxm_GH-54",
  "refresh_token": "c62e8dc0-0002-474b-8a86-01c309d1fe17"
}`;

const authSigninRequest = `curl --request POST 'https://meco.dev/v1/auth/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "steve@email.com",
    "password": "password"
}'`;

const authSigninResponse = `{
  "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdGV2ZUBlbWFpbC5jb20iLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpYXQiOjE2MDEwMzk4NTYsImV4cCI6MTYwMTA0NzA1Nn0.j53Gg9i-TrCNHvOUjk6-DoEWxe4XEaZoknJxm_GH-54",
  "refresh_token": "c62e8dc0-0002-474b-8a86-01c309d1fe17"
}`;

const authRefreshRequest = `curl --request POST 'https://meco.dev/v1/auth/refresh' \
--header 'Content-Type: application/json' \
--data-raw '{
    "access_token": "expired_access_token",
    "refresh_token": "refresh_token"
}'`;

const authRefreshResponse = `{
  "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdGV2ZUBlbWFpbC5jb20iLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpYXQiOjE2MDEwMzk4NTYsImV4cCI6MTYwMTA0NzA1Nn0.j53Gg9i-TrCNHvOUjk6-DoEWxe4XEaZoknJxm_GH-54"
}`;

const authResetRequest = `curl --request POST 'http://localhost:8080/v1/auth/reset?token=token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "password": "2Q4B_523P"
}'`;

const accountsRetrieveResponse = `{
  "username": "technician@starbug.com",
  "full_name": "David Lister",
  "email_subscription_enabled": true,
  "billing_alert_enabled": false,
  "created_date": "2020-02-25T10:30:44.232Z"
}`;

const accountsUpdateRequest = `curl --request PUT 'https://meco.dev/v1/accounts/me' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer access_token' \
--data-raw '{
    "full_name": "Arnold Rimmer",
    "email_subscription_enabled": true,
    "billing_alert_enabled": true
}'
`;

const accountsUpdateResponse = `{
  "username": "technician@starbug.com",
  "full_name": "Arnold Rimmer",
  "email_subscription_enabled": true,
  "billing_alert_enabled": true,
  "created_date": "2020-02-25T10:30:44.232Z"
}
`;

const apiKeysCreateRequest = `curl --request POST 'https://meco.dev/v1/api-keys' \
--header 'Authorization: Bearer access_token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "queeg key",
    "enabled": true,
    "scope": {
      "image": true,
      "gif": false,
      "text": {
        "toxicity": false,
        "severe_toxicity": true,
        "identity_attack": true,
        "insult": false,
        "profanity": false,
        "threat": false
      },
      "video": true
    },
    "access_policies": [{
      "name": "hologram simulation suite",
      "range": "500.0.0.1/32"
    }]
}'`;

const apiKeysCreateResponse = `{
  "id": 1,
  "name": "queeg key",
  "prefix": "maNeCG7",
  "key": "maNeCG7.NTJmYmNlMzMtYmUzNC00NTY4LThlMzctMDE1NzAwYzQyZDM5",
  "created_date": "2020-06-10T13:03:39.55907+01:00",
  "last_used_date": null,
  "modified_date": null,
  "enabled": true,
  "scope": {
      "image": true,
      "gif": false,
      "text": {
        "toxicity": false,
        "severe_toxicity": true,
        "identity_attack": true,
        "insult": false,
        "profanity": false,
        "threat": false
      },
      "video": true
  },
  "access_policies": [
      {
          "name": "hologram simulation suite",
          "range": "500.0.0.1/32"
      }
  ]
}`;

const apiKeysUpdateRequest = `url --request PUT 'https://meco.dev/v1/api-keys/1' \
--header 'Authorization: Bearer access_token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "holly key",
    "enabled": false,
    "scope": {
      "image": false,
      "gif": false,
      "text": {
        "toxicity": false,
        "severe_toxicity": false,
        "identity_attack": false,
        "insult": false,
        "profanity": false,
        "threat": true
      },
      "video": false
    },
    "access_policies": [{
      "name": "hologram simulation suite",
      "range": "592.0.0.1/32"
    }]
}'
`;

const apiKeysUpdateResponse = `{
  "id": 1,
  "name": "holly key",
  "prefix": "maNeCG7",
  "created_date": "2020-06-10T13:03:39.55907+01:00",
  "last_used_date": null,
  "modified_date": "2020-06-10T17:51:02.996613+01:00",
  "enabled": false,
  "scope": {
      "image": false,
      "gif": false,
      "text": {
        "toxicity": false,
        "severe_toxicity": false,
        "identity_attack": false,
        "insult": false,
        "profanity": false,
        "threat": true
      },
      "video": false
  },
  "access_policies": [
      {
          "name": "hologram simulation suite",
          "range": "592.0.0.1/32"
      }
  ]
}`;

module.exports = (initialVnode) => {
  return {
    oninit: (vnode) => {
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('section#documentation.fade-in-long', m('.container', [
        m('.row.is-hcentered', m('.column',
          m('h4.has-text-weight-semibold', 'Developer Documentation'),
          m('.tags.has-addons', [
            m('.tag.is-dark', 'alpha'),
            m('.tag.is-success', '0.1.0')
          ])
        )),
        m('.row', [
          // Menu
          m('.column.is-3.documentation-links',
            m('ul.no-style', [
              m('li', link('docs-intro', 'Introduction')),
              m('li', m('span', link('docs-quick-start', 'Quick Start')), m('ul', [
                m('li', link('docs-quick-start-signup', 'Signup')),
                m('li', link('docs-quick-start-request', 'Request')),
                m('li', link('docs-quick-start-response', 'Response'))
              ])),
              m('li', link('docs-versioning', 'Versioning')),
              m('li', m('span', 'Moderation Endpoints'), m('ul.no-style', [
                m('li', 'Authentication'),
                m('li', 'Image'),
                m('li', 'Text')
              ])),
              m('li', m('span', link('docs-core-endpoints', 'Core Endpoints')), m('ul', [
                m('li', m('span', link('docs-authentication', 'Authentication')), m('ul', [
                  m('li', link('docs-authentication-signup', 'Signup')),
                  m('li', link('docs-authentication-signin', 'Signin')),
                  m('li', link('docs-authentication-refresh', 'Refresh')),
                  m('li', link('docs-authentication-forgot', 'Forgot Password')),
                  m('li', link('docs-authentication-reset', 'Reset Password'))
                ])),
                m('li', m('span', link('docs-accounts', 'Accounts')), m('ul', [
                  m('li', link('docs-accounts-retrieve', 'Retrieve Account')),
                  m('li', link('docs-accounts-update', 'Update Account'))
                ])),
                m('li', m('span', link('docs-api-keys', 'API Keys')), m('ul', [
                  m('li', link('docs-api-keys-create', 'Create API Key')),
                  m('li', link('docs-api-keys-retrieve', 'Retrieve API Key')),
                  m('li', link('docs-api-keys-update', 'Update API Key')),
                  m('li', link('docs-api-keys-delete', 'Delete API Key')),
                  m('li', link('docs-api-keys-list', 'List API Key'))
                ])),
                m('li', m('span', 'API Key Logs'), m('ul', [
                  m('li', 'Retrieve API Key Logs'),
                  m('li', 'Download API Key Logs')
                ]))
              ])),
              m('li', link('docs-best-practices', 'Best Practices')),
              m('li', m('span', link('docs-support', 'Support')), m('ul', [
                m('li', link('docs-support-github', 'GitHub')),
                m('li', link('docs-support-discord', 'Discord')),
                m('li', link('docs-support-email', 'Email'))
              ]))
            ])
          ),
          // Content
          m('.column.is-9.documentation-content',
            // INTRO BEGIN
            section({
              id: 'docs-intro',
              name: 'Introduction',
              paragraphs: [
                'The MECO API is a RESTful HTTP service allowing you as a client to automate the process of content moderation in realtime. We leverage the latest machine learning techniques to score your content which gives you the power to decide on its impact.',
                'Hosted on a software-as-a-service (SaaS) basis means that we take care of the maintenance and scalability of the service while remaining an affordable option for your business. Communication with our service must be in JSON format. Moderation requests are authenticated with an API key over SSL and verified on each request. These API keys are generated by you and can be restricted to specific moderation features to suit your needs.',
                'For advanced users, if you would like to control your account and key generation programmatically rather than through our dashboard, you may do this through our core endpoints. Authorization of these endpoints is token-based; specifically JSON Web Tokens (JWT). We generate an access token and refresh token pair upon signing up or signing in. Core endpoints require this access token for authorization.',
                'Let\'s get started.'
              ]
            }),
            // INTRO END
            // QUICK START BEGIN
            quickstart({
              id: 'docs-quick-start',
              name: 'Quick Start',
              steps: [{
                id: 'docs-quick-start-signup',
                name: 'Signup',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur vel purus non maximus. Maecenas elit eros, tincidunt at vulputate in, placerat in ante. Quisque fringilla sodales diam, nec hendrerit justo posuere nec.'
              }, {
                id: 'docs-quick-start-request',
                name: 'Request',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur vel purus non maximus. Maecenas elit eros, tincidunt at vulputate in, placerat in ante. Quisque fringilla sodales diam, nec hendrerit justo posuere nec.'
              }, {
                id: 'docs-quick-start-response',
                name: 'Response',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur vel purus non maximus. Maecenas elit eros, tincidunt at vulputate in, placerat in ante. Quisque fringilla sodales diam, nec hendrerit justo posuere nec.'
              }]
            }),
            // QUICK START END
            // VERSIONING BEGIN
            section({
              id: 'docs-versioning',
              name: 'Versioning',
              paragraphs: ['Specify the version of the API as part of the URI. For instance, to use version one of the API prefix the URI with /v1 followed by a specific endpoint.'],
              url: 'https://meco.dev/v1'
            }),
            // VERSIONING END
            // MODERATION ENDPOINTS BEGIN
            section({
              id: 'docs-moderation-endpoints',
              name: 'Moderation Endpoints',
              paragraphs: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur vel purus non maximus. Maecenas elit eros, tincidunt at vulputate in, placerat in ante.'
              ]
            }),
            // MODERATION ENDPOINTS END
            // CORE ENDPOINTS BEGIN
            section({
              id: 'docs-core-endpoints',
              name: 'Core Endpoints',
              paragraphs: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur vel purus non maximus. Maecenas elit eros, tincidunt at vulputate in, placerat in ante.'
              ]
            }),
            // CORE ENDPOINTS END
            // AUTHENTICATION BEGIN
            resource({
              id: 'docs-authentication',
              name: 'Authentication',
              paragraphs: ['This is the object representing a MECO Token Pair.'],
              attributes: [{
                name: 'access_token',
                type: 'string',
                description: 'A bearer access authentication token.'
              }, {
                name: 'refresh_token',
                type: 'string',
                description: 'A universally unique refresh token.'
              }],
              endpoints: [{
                id: 'docs-authentication-signup',
                name: 'Signup',
                method: 'POST',
                description: 'Create a new Account object with the given credentials. The response contains a short-duration access token for accessing secure endpoints, you should store this key securely. The refresh token has a longer duration and is used to refresh an expired access token - see the refresh endpoint. You should also store this securely.',
                request: authSignupRequest,
                requestParams: [{
                  value: 'username',
                  type: 'string required',
                  description: 'Unique username of the account. Must be a valid email.'
                }, {
                  value: 'password',
                  type: 'string required',
                  description: 'The password of the account.'
                }],
                response: authSignupResponse,
                codes: [{
                  value: '201 - Created',
                  description: 'Everything worked as expected.'
                }, {
                  value: '400 - Bad Request',
                  description: 'The request was unacceptable, often due to an invalid parameter.'
                }, {
                  value: '409 - Conflict',
                  description: 'The username is unavailable.'
                }, {
                  value: '429 - Too Many Requests',
                  description: 'Too many requests hit the API too quickly.'
                }, {
                  value: '500 - Internal Server Error',
                  description: 'Something went wrong on MECO\'s end. (These are rare.)'
                }]
              }, {
                id: 'docs-authentication-signin',
                name: 'Signin',
                method: 'POST',
                description: 'Authenticate credentials against an existing Account object. The response contains a short-duration access token for accessing secure endpoints, you should store this key securely. The refresh token has a longer duration and is used to refresh an expired access token - see the refresh endpoint. You should also store this securely.',
                request: authSigninRequest,
                requestParams: [{
                  value: 'username',
                  type: 'string required',
                  description: 'Unique username of the account. Must be a valid email.'
                }, {
                  value: 'password',
                  type: 'string required',
                  description: 'The password of the account.'
                }],
                response: authSigninResponse,
                codes: [{
                  value: '200 - OK',
                  description: 'Everything worked as expected.'
                }, {
                  value: '401 - Unauthorized',
                  description: 'The username or password was invalid.'
                }, {
                  value: '429 - Too Many Requests',
                  description: 'Too many requests hit the API too quickly.'
                }, {
                  value: '500 - Internal Server Error',
                  description: 'Something went wrong on MECO\'s end. (These are rare.)'
                }]
              }, {
                id: 'docs-authentication-refresh',
                name: 'Refresh',
                method: 'POST',
                description: 'Refresh an expired access token. Uses the expired access token along with a refresh token to generate a new access token. The response contains a short-duration access token for accessing secure endpoints, you should store this key securely.',
                request: authRefreshRequest,
                requestParams: [{
                  value: 'access_token',
                  type: 'string required',
                  description: 'An expired access token.'
                }, {
                  value: 'refresh_token',
                  type: 'string required',
                  description: 'A valid refresh token.'
                }],
                response: authRefreshResponse,
                codes: [{
                  value: '200 - OK',
                  description: 'Everything worked as expected.'
                }, {
                  value: '400 - Bad Request',
                  description: 'The request was unacceptable, often due to an invalid parameter.'
                }, {
                  value: '404 - Not Found',
                  description: 'The requested resource doesn\'t exist.'
                }, {
                  value: '429 - Too Many Requests',
                  description: 'Too many requests hit the API too quickly.'
                }, {
                  value: '500 - Internal Server Error',
                  description: 'Something went wrong on MECO\'s end. (These are rare.)'
                }]
              }, {
                id: 'docs-authentication-forgot',
                name: 'Forgot Password',
                method: 'POST',
                description: 'Send an email to the account with a link containing a unique password reset token - see the reset endpoint. You need to supply the username of the Account object.',
                request: 'curl --request POST \'https://meco.dev/v1/auth/forgot?username=crew@starbug.com\'',
                codes: [{
                  value: '200 - OK',
                  description: 'Everything worked as expected.'
                }, {
                  value: '404 - Not Found',
                  description: 'The requested resource doesn\'t exist.'
                }, {
                  value: '429 - Too Many Requests',
                  description: 'Too many requests hit the API too quickly.'
                }, {
                  value: '500 - Internal Server Error',
                  description: 'Something went wrong on MECO\'s end. (These are rare.)'
                }]
              }, {
                id: 'docs-authentication-reset',
                name: 'Reset Password',
                method: 'POST',
                description: 'Reset old password to new password for the Account object associated with the supplied token string. The token is contained in the link previously emailed to the account - see the forgot endpoint. An email notification will be sent to the account on success.',
                request: authResetRequest,
                requestParams: [{
                  value: 'password',
                  type: 'string required',
                  description: 'The new password of the account.'
                }],
                codes: [{
                  value: '201 - Created',
                  description: 'Everything worked as expected.'
                }, {
                  value: '400 - Bad Request',
                  description: 'The request was unacceptable, often due to an invalid parameter.'
                }, {
                  value: '404 - Not Found',
                  description: 'The requested resource doesn\'t exist.'
                }, {
                  value: '429 - Too Many Requests',
                  description: 'Too many requests hit the API too quickly.'
                }, {
                  value: '500 - Internal Server Error',
                  description: 'Something went wrong on MECO\'s end. (These are rare.)'
                }]
              }]
            }),
            // AUTHENTICATION END
            // ACCOUNT BEGIN
            resource({
              id: 'docs-accounts',
              name: 'Accounts',
              paragraphs: ['This is the object representing a MECO Account. You can retrieve it to see properties on the account like it\'s current email address or if the account is enabled yet. A new account is created on signup.'],
              attributes: [{
                name: 'username',
                type: 'string',
                description: 'Unique username of the account.'
              }, {
                name: 'full_name',
                type: 'string',
                description: 'The account owner\'s full name.'
              }, {
                name: 'email_subscription_enabled',
                type: 'boolean',
                description: 'Whether MECO can send emails to this account.'
              }, {
                name: 'billing_alert_enabled',
                type: 'boolean',
                description: 'Whether MECO can send billing alerts to this account.'
              }, {
                name: 'created_date',
                type: 'offset-date-time',
                description: 'Date at which the account was created.'
              }],
              endpoints: [{
                id: 'docs-accounts-retrieve',
                name: 'Retrieve Account',
                method: 'GET',
                description: 'Retrieve an authenticated MECO account.',
                request: 'curl --request GET \'https://meco.dev/v1/accounts/me\' --header \'Authorization: Bearer access_token\'',
                response: accountsRetrieveResponse,
                codes: [{
                  value: '200 - OK',
                  description: 'Everything worked as expected.'
                }, {
                  value: '401 - Unauthorized',
                  description: 'No valid access token provided.'
                }, {
                  value: '429 - Too Many Requests',
                  description: 'Too many requests hit the API too quickly.'
                }, {
                  value: '500 - Internal Server Error',
                  description: 'Something went wrong on MECO\'s end. (These are rare.)'
                }]
              }, {
                id: 'docs-accounts-update',
                name: 'Update Account',
                method: 'PUT',
                description: 'Update an authenticated MECO account by setting the values of the parameters passed. Any parameters not provided will be left unchanged.',
                request: accountsUpdateRequest,
                requestParams: [{
                  value: 'full_name',
                  type: 'string optional',
                  description: 'The account owner\'s full name.'
                }, {
                  value: 'email_subscription_enabled',
                  type: 'boolean optional',
                  description: 'Whether MECO can send emails to this account.'
                }, {
                  value: 'billing_alert_enabled',
                  type: 'boolean optional',
                  description: 'Whether MECO can send billing alerts to this account.'
                }],
                response: accountsUpdateResponse,
                codes: [{
                  value: '200 - OK',
                  description: 'Everything worked as expected.'
                }, {
                  value: '400 - Bad Request',
                  description: 'The request was unacceptable, often due to an invalid parameter.'
                }, {
                  value: '401 - Unauthorized',
                  description: 'No valid access token provided.'
                }, {
                  value: '429 - Too Many Requests',
                  description: 'Too many requests hit the API too quickly.'
                }, {
                  value: '500 - Internal Server Error',
                  description: 'Something went wrong on MECO\'s end. (These are rare.)'
                }]
              }]
            }),
            // ACCOUNTS END
            // API KEYS BEGIN
            resource({
              id: 'docs-api-keys',
              name: 'API Keys',
              paragraphs: [
                'This is the object representing a MECO API Key. The Key Management Service (KMS) presents a single control point to create, update and delete cryptographic keys, and control their use across the MECO API service. You can retrieve an individual API key or list them all.',
                'KMS audits all API requests, including key management actions and usage of keys. User passwords and neither raw nor hashed API keys are logged.'
              ],
              attributes: [{
                name: 'id',
                type: 'integer',
                description: 'Unique identifier of the API key.'
              }, {
                name: 'name',
                type: 'string',
                description: 'The name of the API key.'
              }, {
                name: 'prefix',
                type: 'string',
                description: 'A random alphanumeric string of length 7 to help identify an API key.'
              }, {
                name: 'key',
                type: 'string',
                description: 'The actual API key. This is only shown once at the time of creation.'
              }, {
                name: 'created_date',
                type: 'offset-date-time',
                description: 'Date at which the API key was created.'
              }, {
                name: 'last_used_date',
                type: 'offset-date-time',
                description: 'Date at which the API key was last used.'
              }, {
                name: 'modified_date',
                type: 'offset-date-time',
                description: 'Date at which the API key was last updated.'
              }, {
                name: 'enabled',
                type: 'boolean',
                description: 'Whether the API key can make requests.'
              }, {
                name: 'scope',
                type: 'object',
                description: 'Restrict API key to specific resources.'
              }, {
                name: 'scope.image',
                type: 'boolean',
                description: 'Enables API key to make image requests.'
              }, {
                name: 'scope.gif',
                type: 'boolean',
                description: 'Enables API key to make gif requests.'
              }, {
                name: 'scope.text.toxicity',
                type: 'boolean',
                description: 'Enables API key to make toxicity text requests.'
              }, {
                name: 'scope.text.severe_toxicity',
                type: 'boolean',
                description: 'Enables API key to make severe toxicity text requests.'
              }, {
                name: 'scope.text.identity_attack',
                type: 'boolean',
                description: 'Enables API key to make identity attack text requests.'
              }, {
                name: 'scope.text.insult',
                type: 'boolean',
                description: 'Enables API key to make insult text requests.'
              }, {
                name: 'scope.text.profanity',
                type: 'boolean',
                description: 'Enables API key to make profanity text requests.'
              }, {
                name: 'scope.text.threat',
                type: 'boolean',
                description: 'Enables API key to make threat text requests.'
              }, {
                name: 'scope.text.video',
                type: 'boolean',
                description: 'Enables API key to make video requests.'
              }, {
                name: 'access_policies',
                type: 'object[]',
                description: 'Restrict API key usage to trusted IP addresses.'
              }, {
                name: 'access_policies[i].name',
                type: 'string',
                description: 'The name of the access policy.'
              }, {
                name: 'access_policies[i].range',
                type: 'cidr_ipv4',
                description: 'The trusted IPv4 CIDR block.'
              }],
              endpoints: [{
                id: 'docs-api-keys-create',
                name: 'Create API key',
                method: 'POST',
                description: 'Create a new API key on an existing account. Each account can have up to 25 API keys. The key response attribute will only be shown once and cannot be retrieved at a later time. You should store this key securely.',
                request: apiKeysCreateRequest,
                requestParams: [{
                  value: 'name',
                  type: 'string required',
                  description: 'The name of the API key.'
                }, {
                  value: 'enabled',
                  type: 'boolean optional',
                  description: 'Whether the API key can make requests.'
                }, {
                  value: 'scope',
                  type: 'object optional',
                  description: 'Restrict API key to specific resources.'
                }, {
                  value: 'scope.image',
                  type: 'boolean optional',
                  description: 'Enables API key to make image requests.'
                }, {
                  value: 'scope.gif',
                  type: 'boolean optional',
                  description: 'Enables API key to make gif requests.'
                }, {
                  value: 'scope.text.toxicity',
                  type: 'boolean optional',
                  description: 'Enables API key to make toxicity text requests.'
                }, {
                  value: 'scope.text.severe_toxicity',
                  type: 'boolean optional',
                  description: 'Enables API key to make severe toxicity text requests.'
                }, {
                  value: 'scope.text.identity_attack',
                  type: 'boolean optional',
                  description: 'Enables API key to make identity attack text requests.'
                }, {
                  value: 'scope.text.insult',
                  type: 'boolean optional',
                  description: 'Enables API key to make insult text requests.'
                }, {
                  value: 'scope.text.profanity',
                  type: 'boolean optional',
                  description: 'Enables API key to make profanity text requests.'
                }, {
                  value: 'scope.text.threat',
                  type: 'boolean optional',
                  description: 'Enables API key to make threat text requests.'
                }, {
                  value: 'scope.text.video',
                  type: 'boolean optional',
                  description: 'Enables API key to make video requests.'
                }, {
                  value: 'access_policies',
                  type: 'object[] optional',
                  description: 'Restrict API key usage to trusted IP addresses.'
                }, {
                  value: 'access_policies[i].name',
                  type: 'string required',
                  description: 'The name of the access policy.'
                }, {
                  value: 'access_policies[i].range',
                  type: 'cidr_ipv4 required',
                  description: 'The trusted IPv4 CIDR block.'
                }],
                response: apiKeysCreateResponse,
                codes: [{
                  value: '201 - Created',
                  description: 'Everything worked as expected.'
                }, {
                  value: '400 - Bad Request',
                  description: 'The request was unacceptable, often due to an invalid parameter.'
                }, {
                  value: '401 - Unauthorized',
                  description: 'No valid access token provided.'
                }, {
                  value: '403 - Forbidden',
                  description: 'Indicates that you have exceeded your API key quota.'
                }, {
                  value: '429 - Too Many Requests',
                  description: 'Too many requests hit the API too quickly.'
                }, {
                  value: '500 - Internal Server Error',
                  description: 'Something went wrong on MECO\'s end. (These are rare.)'
                }]
              }, {
                id: 'docs-api-keys-retrieve',
                name: 'Retrieve API key',
                method: 'GET',
                description: 'Retrieve the details of an existing API key. You need to supply the id of the API key that was returned upon creation.',
                request: 'curl --request GET \'https://meco.dev/v1/api-keys/1\' --header \'Authorization: Bearer access_token\'',
                codes: [{
                  value: '200 - OK',
                  description: 'Everything worked as expected.'
                }, {
                  value: '401 - Unauthorized',
                  description: 'No valid access token provided.'
                }, {
                  value: '404 - Not Found',
                  description: 'The requested resource doesn\'t exist.'
                }, {
                  value: '429 - Too Many Requests',
                  description: 'Too many requests hit the API too quickly.'
                }, {
                  value: '500 - Internal Server Error',
                  description: 'Something went wrong on MECO\'s end. (These are rare.)'
                }]
              }, {
                id: 'docs-api-keys-update',
                name: 'Update API key',
                method: 'PUT',
                description: 'Update an API key by setting the values of the parameters passed. Any parameters not provided will be left unchanged. You need to supply the id of the API key that was returned upon creation.',
                request: apiKeysUpdateRequest,
                requestParams: [{
                  value: 'name',
                  type: 'string optional',
                  description: 'The name of the API key.'
                }, {
                  value: 'enabled',
                  type: 'boolean optional',
                  description: 'Whether the API key can make requests.'
                }, {
                  value: 'scope',
                  type: 'object optional',
                  description: 'Restrict API key to specific resources.'
                }, {
                  value: 'scope.image',
                  type: 'boolean optional',
                  description: 'Enables API key to make image requests.'
                }, {
                  value: 'scope.gif',
                  type: 'boolean optional',
                  description: 'Enables API key to make gif requests.'
                }, {
                  value: 'scope.text.toxicity',
                  type: 'boolean optional',
                  description: 'Enables API key to make toxicity text requests.'
                }, {
                  value: 'scope.text.severe_toxicity',
                  type: 'boolean optional',
                  description: 'Enables API key to make severe toxicity text requests.'
                }, {
                  value: 'scope.text.identity_attack',
                  type: 'boolean optional',
                  description: 'Enables API key to make identity attack text requests.'
                }, {
                  value: 'scope.text.insult',
                  type: 'boolean optional',
                  description: 'Enables API key to make insult text requests.'
                }, {
                  value: 'scope.text.profanity',
                  type: 'boolean optional',
                  description: 'Enables API key to make profanity text requests.'
                }, {
                  value: 'scope.text.threat',
                  type: 'boolean optional',
                  description: 'Enables API key to make threat text requests.'
                }, {
                  value: 'scope.text.video',
                  type: 'boolean optional',
                  description: 'Enables API key to make video requests.'
                }, {
                  value: 'access_policies',
                  type: 'object[] optional',
                  description: 'Restrict API key usage to trusted IP addresses.'
                }, {
                  value: 'access_policies[i].name',
                  type: 'string required',
                  description: 'The name of the access policy.'
                }, {
                  value: 'access_policies[i].range',
                  type: 'cidr_ipv4 required',
                  description: 'The trusted IPv4 CIDR block.'
                }],
                response: apiKeysUpdateResponse,
                codes: [{
                  value: '200 - OK',
                  description: 'Everything worked as expected.'
                }, {
                  value: '400 - Bad Request',
                  description: 'The request was unacceptable, often due to an invalid parameter.'
                }, {
                  value: '401 - Unauthorized',
                  description: 'No valid access token provided.'
                }, {
                  value: '404 - Not Found',
                  description: 'The requested resource doesn\'t exist.'
                }, {
                  value: '429 - Too Many Requests',
                  description: 'Too many requests hit the API too quickly.'
                }, {
                  value: '500 - Internal Server Error',
                  description: 'Something went wrong on MECO\'s end. (These are rare.)'
                }]
              }, {
                id: 'docs-api-keys-delete',
                name: 'Delete API key',
                method: 'DELETE',
                description: 'Delete an API key, removing it from the account. This cannot be undone. You need to supply the id of the API key that was returned upon creation.',
                request: 'curl --request DELETE \'https://meco.dev/v1/api-keys/1\' --header \'Authorization: Bearer access_token\'',
                codes: [{
                  value: '204 - No Content',
                  description: 'Everything worked as expected.'
                }, {
                  value: '401 - Unauthorized',
                  description: 'No valid access token provided.'
                }, {
                  value: '404 - Not Found',
                  description: 'The requested resource doesn\'t exist.'
                }, {
                  value: '429 - Too Many Requests',
                  description: 'Too many requests hit the API too quickly.'
                }, {
                  value: '500 - Internal Server Error',
                  description: 'Something went wrong on MECO\'s end. (These are rare.)'
                }]
              }, {
                id: 'docs-api-keys-list',
                name: 'List API key',
                method: 'GET',
                description: 'Return a list of all API keys associated with the MECO account.',
                request: 'curl --request GET \'https://meco.dev/v1/api-keys\' --header \'Authorization: Bearer access_token\'',
                codes: [{
                  value: '200 - OK',
                  description: 'Everything worked as expected.'
                }, {
                  value: '401 - Unauthorized',
                  description: 'No valid access token provided.'
                }, {
                  value: '429 - Too Many Requests',
                  description: 'Too many requests hit the API too quickly.'
                }, {
                  value: '500 - Internal Server Error',
                  description: 'Something went wrong on MECO\'s end. (These are rare.)'
                }]
              }]
            }),
            // API KEYS END
            // BEST PRACTICES BEGIN
            section({
              id: 'docs-best-practices',
              name: 'Best Practices',
              paragraphs: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur vel purus non maximus. Maecenas elit eros, tincidunt at vulputate in, placerat in ante.'
              ]
            }),
            // BEST PRACTICES END
            // SUPPORT BEGIN
            support({
              id: 'docs-support',
              name: 'Support',
              channels: [{
                id: 'docs-support-github',
                name: 'GitHub',
                description: [
                  m('span', 'View our source code on'),
                  m('a.is-link.has-text-decoration-none', {
                    onclick: () => {
                      window.open('https://github.com/the-pragmatic-dev/meco-api', '_blank');
                    }
                  }, ' GitHub '),
                  m('span', 'and get involved if you would like to support the development of MECO.')
                ]
              }, {
                id: 'docs-support-discord',
                name: 'Discord',
                description: [
                  m('span', 'Join our '),
                  m('a.is-link.has-text-decoration-none', {
                    target: '_blank',
                    href: 'https://discord.gg/Y7Rx485'
                  }, ' Discord '),
                  m('span', 'community to directly chat with our development team.')
                ]
              }, {
                id: 'docs-support-email',
                name: 'Email',
                description: [
                  m('span', 'You can write us at '),
                  m('a.is-link.has-text-decoration-none', {
                    target: '_blank',
                    href: 'mailto:steve@thepragmaticdev.uk'
                  }, ' steve@thepragmaticdev.uk.')
                ]
              }]
            })
            // SUPPORT END
          )
        ])
      ]));
    }
  };
};
