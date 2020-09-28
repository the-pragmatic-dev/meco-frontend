const m = require('mithril');
const bullet = require('bullet-pubsub');
const Chartist = require('chartist');

module.exports = (initialVnode) => {
  let series;
  let labels;
  let showLabel;
  let summary;

  const hover = function (options) {
    return function hover (chart) {
      if (!chart.container) {
        return;
      }
      if (chart instanceof Chartist.Bar) {
        chart.on('created', function (data) {
          chart.container.querySelectorAll('line').forEach(element => {
            element.addEventListener('mousemove', (event) => {
              bullet.trigger('chart-hover', {
                event: event,
                index: element.getAttribute('ct:meta'),
                summary: summary
              });
            });
            element.addEventListener('mouseout', () => {
              bullet.trigger('chart-hover', { event: 'mouseout' });
            });
          });
        });
      }
    };
  };

  return {
    oninit: (vnode) => {
      series = vnode.attrs.series;
      labels = vnode.attrs.labels;
      showLabel = vnode.attrs.showLabel;
      summary = vnode.attrs.summary || false;
    },
    onremove: (vnode) => {
    },
    view: (vnode) => {
      return m(`.ct-chart.ct-golden-section.is-${vnode.attrs.type}-chart`, {
        oncreate: (vnode) => {
          vnode.state.chart = new Chartist.Bar(vnode.dom, {
            labels: labels,
            series: series
          }, {
            stackBars: true,
            fullWidth: true,
            height: '120px',
            chartPadding: 0,
            low: 0,
            axisX: {
              showGrid: false,
              showLabel: showLabel,
              offset: showLabel ? 35 : 0,
              labelOffset: {
                x: 0,
                y: 0
              },
              labelInterpolationFnc: function (value, index) {
                return index % 6 === 0 ? value : '';
              }
            },
            axisY: {
              showGrid: false,
              showLabel: false,
              offset: 0
            },
            plugins: [
              hover()
            ]
          });
        }
      });
    }
  };
};
