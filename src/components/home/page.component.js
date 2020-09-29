const m = require('mithril');
const classNames = require('classnames');

const heroSvg = require('../../images/svg/hero.svg');
const featureOneSvg = require('../../images/svg/code_development.svg');
const featureTwoSvg = require('../../images/svg/security.svg');
const featureThreeSvg = require('../../images/svg/under_constructions_2.svg');
const featureFourSvg = require('../../images/svg/moving_forward.svg');
const stepOneSvg = require('../../images/svg/step_1.svg');
const stepTwoSvg = require('../../images/svg/step_2.svg');
const stepThreeSvg = require('../../images/svg/step_3.svg');
const operationSvg = require('../../images/svg/chatting.svg');

const prices = [
  { name: 'starter', color: 'link', monthlyCost: 'Free', yearlyCost: 'Free', overage: 'N/A', monthlyOperations: 1000, yearlyOperations: 1000 },
  { name: 'indie', color: 'info', monthlyCost: m.trust('£50<span>/month</span>'), yearlyCost: m.trust('£540<span>/year</span>'), overage: '£0.002 / per operation', monthlyOperations: 10000, yearlyOperations: 120000 },
  { name: 'pro', color: 'primary', monthlyCost: m.trust('£200<span>/month</span>'), yearlyCost: m.trust('£2160<span>/year</span>'), overage: '£0.001 / per operation', monthlyOperations: 100000, yearlyOperations: 1200000 }
];

const stages = [
  { title: 'create', description: 'Sign up and create an API key for your application. Then, tailor your keys scope to handle the complex nature of user generated content specifically for your use case.' },
  { title: 'request', description: 'The MECO API is built on a RESTful architecture which allows easy integration. Just sit back and let MECO perform all your moderation checks based on the policies you set out.' },
  { title: 'response', description: 'We provide a response with actionable insights so you can understand the content better. Reject content that doesn’t fit your T&Cs.' }
];

const tips = [
  { description: 'GDPR compliant' },
  { description: 'Fast API response time' },
  { description: 'Privacy compliant' },
  { description: 'Open-source' }
];

const integrationStepSvg = (i) => {
  switch (i) {
    case 0:
      return m('div.svg', m.trust(stepOneSvg));
    case 1:
      return m('div.svg', m.trust(stepTwoSvg));
    default:
      return m('div.svg', m.trust(stepThreeSvg));
  }
};

module.exports = (initialVnode) => {
  let yearlyPricing = false;

  return {
    oninit: (vnode) => {
      yearlyPricing = false;
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m('main.container.is-gapless.is-fluid.fade-in-long#home', [
        // Hero
        m('section#hero', m('.container', [
          m('.row', [
            m('.column.is-6.has-text-left', m('.hero.is-halfheight', m('.hero-body', [
              m('h1.has-text-weight-semibold', m.trust('<span>M</span>oderating <span>E</span>xplicit <span>C</span>ontent <span>O</span>nline')),
              m('h5', 'AI powered cloud platform to protect digital communities against explicit content'),
              m('button.is-link', {
                onclick: () => {
                  m.route.set('/login');
                }
              }, 'Create a free account')
            ]))),
            m('.column.is-6.is-mobile-hidden',
              m('div.svg.is-fullheight', m.trust(heroSvg))
            )
          ]),
          // Checkpoints
          m('.row', tips.map((tip) => {
            return m('.column.is-3', [
              m('span.has-text-success.icon.fas.fa-check-circle.fa-2x'),
              m('p.is-inline', tip.description)
            ]);
          }))
        ])),
        // Features
        m('section#features.is-hcentered.has-border-top', m('.container', [
          m('.title', [
            m('h4.has-text-weight-semibold', 'What MECO can do for you'),
            m('h5.has-text-medium', 'Detect and filter unwanted content in images and text')
          ]),
          // Feature one
          m('.row.is-mobile-reversed.is-vcentered',
            m('.column.has-text-right-mobile.is-6', [
              m('p.has-text-info.is-uppercase.has-text-weight-semibold.is-gapless', 'Smoothly integrate'),
              m('h5.has-text-weight-semibold', 'Define your Threshold'),
              m('p', 'The boundary of suitable content for your platform is specific to you and your user demographic. By detecting individual objects associated with explicit content, we give you the power to filter content based on the thresholds you define.')
            ]),
            m('.column.is-6', m('div.svg', m.trust(featureOneSvg)))
          ),
          // Feature two
          m('.row.is-vcentered', [
            m('.column.is-6', m('div.svg', m.trust(featureTwoSvg))),
            m('.column.is-6.has-text-left-mobile', [
              m('p.has-text-info.is-uppercase.has-text-weight-semibold.is-gapless', 'Boost reputation'),
              m('h5.has-text-weight-semibold', 'Protect your Brand'),
              m('p', 'Inappropriate, harmful, or illegal content hosted on your company’s platform can diminish the reputation of your brand. Let us filter whatever is not useful, acceptable, or necessary for your brand and keep your digital community safe and your reputation intact.')
            ])
          ]),
          // Feature three
          m('.row.is-mobile-reversed.is-vcentered',
            m('.column.is-6.has-text-right-mobile', [
              m('p.has-text-info.is-uppercase.has-text-weight-semibold.is-gapless', 'Reduce trauma'),
              m('h5.has-text-weight-semibold', 'Safeguard your Team'),
              m('p', 'The mental health of human moderators is adversely affected through prolonged exposure to explicit content. Moreover, many companies outsource manual moderation to countries where employees are ineligible for mental health care benefits.'),
              m('p', 'No human is involved in our process; no matter what your content is, it will remain private while MECO does the heavy lifting.')
            ]),
            m('.column.is-6', m('div.svg', m.trust(featureThreeSvg)))
          ),
          // Feature Four
          m('.row.is-vcentered', [
            m('.column.is-6', m('div.svg', m.trust(featureFourSvg))),
            m('.column.is-6.has-text-left-mobile', [
              m('p.has-text-info.is-uppercase.has-text-weight-semibold.is-gapless', 'Increase efficiency'),
              m('h5.has-text-weight-semibold', 'Supercharge your Platform'),
              m('p', 'A typical human moderator can cost you £0.06 per image, providing "best-effort" for quality and throughput.'),
              m('p', 'Our advanced pre-trained deep learning models are capable of detecting explicit content in real-time, with high accuracy at a fraction of the cost. Relax, knowing our cloud platform can scale to meet the demands of your business.')
            ])
          ]),
          // CTA
          m('.row.cta', [
            m('.column.is-12.has-text-left-mobile', m('p.has-text-info.is-uppercase.has-text-weight-semibold.is-gapless', 'Ready to get started?')),
            m('.column.is-6.has-text-left-mobile', m('h5', 'Start moderating your content today')),
            m('.column.is-6.has-text-right-mobile', m('button.is-link', {
              onclick: () => {
                m.route.set('/login');
              }
            }, 'Create a free account'))
          ])
        ])),
        // Integration
        m('section#integration.is-hcentered.has-border-top', m('.container', [
          m('.title', [
            m('h4.has-text-weight-semibold', 'How it Works'),
            m('h5.has-text-medium', 'Three simple steps to integrate MECO into your project')
          ]),
          m('.row', stages.map((stage, i) => {
            return m('.column.is-4', [
              integrationStepSvg(i),
              m('p.has-text-info.is-uppercase.has-text-weight-semibold.is-gapless', stage.title),
              m('p', stage.description)
            ]);
          })),
          // CTA
          m('.row.cta', [
            m('.column.is-12.has-text-left-mobile', m('p.has-text-info.is-uppercase.has-text-weight-semibold.is-gapless', 'Build your perfect moderation pipeline today')),
            m('.column.is-6.has-text-left-mobile', m('h5', 'Have a look at all the features our API offers')),
            m('.column.is-6.has-text-right-mobile', m('button', {
              onclick: () => {
                m.route.set('/documentation');
              }
            }, 'Documentation'))
          ])
        ])),
        // Pricing
        m('section#pricing.is-hcentered.has-border-top', m('.container', [
          m('.title', [
            m('h4.has-text-weight-semibold.is-hcentered', 'Straightforward Plans'),
            m('h5.has-text-medium.is-hcentered', 'We don\'t believe in hiding moderation features behind paywalls')
          ]),
          m('.row.pricing-switch.has-text-info.is-uppercase.has-text-weight-semibold', m('.column', [
            m('span.has-padding-right', {
              class: classNames({ 'is-disabled': yearlyPricing })
            }, 'Monthly'),
            m('label.switch', [
              m('input', {
                type: 'checkbox',
                checked: yearlyPricing,
                onclick: () => {
                  yearlyPricing = !yearlyPricing;
                }
              }),
              m('span.slider.is-rounded')
            ]),
            m('span.has-padding-left', {
              class: classNames({ 'is-disabled': !yearlyPricing })
            }, 'Yearly')
          ])),
          // Pricing Cards
          m('.row', prices.map((price) => {
            return m('.column.is-4', m('.card', [
              m(`.card-overlay.is-${price.color}`),
              m('.card-content.is-hcentered', [
                m('h5.has-text-info.is-uppercase.has-text-weight-semibold', price.name),
                m('h4.has-text-weight-semibold', yearlyPricing ? price.yearlyCost : price.monthlyCost),
                m('span.has-text-primar.is-size-7.has-text-weight-semibold', 'Operations: '),
                m('span.is-size-7', `${yearlyPricing ? price.yearlyOperations.toLocaleString() + (price.name === 'starter' ? ' / month' : ' / year') : price.monthlyOperations.toLocaleString() + ' / month'}`),
                m('br'),
                m('span.has-text-primar.is-size-7.has-text-weight-semibold', 'Overage: '),
                m('span.is-size-7', price.overage)
              ])
            ]));
          })),
          m('.row.pricing-faq', m('.column', [
            m('p.has-text-info.is-uppercase.has-text-weight-semibold.is-gapless', 'What is an Operation?'),
            m('p', 'An operation is counted as one image used on the MECO prediction API.'),
            m('div.svg.is-small', m.trust(operationSvg))
          ]))
        ])),
        // Banner
        m('section#banner.has-border-top', m('.container', m('.row', [
          m('.column.has-text-left', [
            m('p.has-text-info.is-uppercase.has-text-weight-semibold.is-gapless', 'Built for developers from the ground up'),
            m('p', 'Get started with 1,000 free operations each month. Create a free account and start building today; through data science, we can build a safer online environment.'),
            m('button.is-link.has-margin-right', {
              onclick: () => {
                m.route.set('/login');
              }
            }, 'Get started for free'),
            m('button', {
              onclick: () => {
                m.route.set('/documentation');
              }
            }, 'Documentation')
          ])
        ])))
      ]);
    }
  };
};
