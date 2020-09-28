const m = require('mithril');
const bullet = require('bullet-pubsub');
const chart = require('../../chart.component');

const chartContainer = (type, labels, showLabel, seriesPeriod, seriesTotal, seriesCount, seriesName) => {
  return m('.chart.row.is-vcentered',
    m('.column.is-9',
      m(chart, {
        type: type,
        labels: labels,
        showLabel: showLabel,
        series: seriesPeriod
      })
    ),
    m('.chart-latest.column.is-1',
      m(chart, {
        type: type,
        showLabel: showLabel,
        series: seriesTotal,
        summary: true
      })
    ),
    m('.chart-info.column.is-2',
      m('.chart-info-container', [
        m('h4', seriesCount, m('span.is-size-6.has-text-weight-regular', ' (ops)')),
        m('p', seriesName)
      ])
    )
  );
};

const chartTooltipInfo = (color, name, ops) => {
  return [
    m('.row.is-vcentered.is-gapless', [
      m('.column.chart-tooltip-info-name',
        m('span.dot.is-small', {
          class: `is-${color}`
        }),
        m('span', ` ${name}: `)
      ),
      m('.column.chart-tooltip-info-count',
        m('span', ` ${ops} (ops)`)
      )
    ])
  ];
};

module.exports = (initialVnode) => {
  const tmpCurrentOperations = 3119;
  const tmpMaxOperations = 10000;

  // TODO: delete and replace with real data
  const imageSeries = [2, 3, 4, 5, 4, 3, 4, 3, 2, 1, 2, 1, 3, 6, 4, 6, 7, 6, 7, 10, 10, 9, 9, 7];
  const gifSeries = [2, 3, 4, 5, 4, 3, 4, 3, 2, 1, 2, 1, 3, 6, 4, 6, 7, 6, 7, 10, 10, 9, 9, 7];
  const textSeries = [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
  const videoSeries = [10, 10, 10, 10, 9, 9, 10, 10, 10, 9, 9, 6, 6, 5, 5, 4, 7, 7, 10, 10, 8, 4, 4, 4];

  let tooltipTop = 0;
  let tooltipLeft = 0;
  let tooltipTitle = '';
  let tooltipImageOps = 0;
  let tooltipGifOps = 0;
  let tooltipTextOps = 0;
  let tooltipVideoOps = 0;
  let tooltipVisible = false;

  const progress = () => {
    return (tmpCurrentOperations / tmpMaxOperations) * 100;
  };

  const count = (total, num) => { return total + num; };

  const createSeriesPeriod = (data) => {
    const series = [];
    const seriesInverse = [];
    const maxValue = Math.max(...imageSeries.concat(gifSeries).concat(textSeries).concat(videoSeries));
    data.forEach(function (value, i) {
      series.push({ value: value, meta: i });
      seriesInverse.push({ value: maxValue - value, meta: i });
    });
    // Protects the chart not showing with no data. Fills out inverse series with values of 1.
    if (maxValue === 0) {
      seriesInverse.map((x) => {
        x.value = 1;
        return x;
      });
    }
    return [series, seriesInverse];
  };

  const createSeriesPercentage = (data) => {
    const dataCount = data.reduce(count);
    const totalCount = imageSeries.reduce(count) + gifSeries.reduce(count) + textSeries.reduce(count) + videoSeries.reduce(count);
    const percentage = totalCount === 0 ? 0 : (dataCount / totalCount) * 100;
    return [[percentage], [100 - percentage]];
  };

  return {
    oninit: (vnode) => {
      bullet.on('chart-hover', (vars) => {
        if (vars.event.type === 'mousemove') {
          tooltipTop = vars.event.y - 5;
          tooltipLeft = vars.event.x + 5;
          if (vars.summary) {
            tooltipTitle = 'Last 24 hours'; // TODO: based on period dropdown
            tooltipImageOps = imageSeries.reduce(count);
            tooltipGifOps = gifSeries.reduce(count);
            tooltipTextOps = textSeries.reduce(count);
            tooltipVideoOps = videoSeries.reduce(count);
          } else {
            tooltipTitle = '04-04-2019 06:18 AM'; // TODO: based on column label
            tooltipImageOps = imageSeries[vars.index];
            tooltipGifOps = gifSeries[vars.index];
            tooltipTextOps = textSeries[vars.index];
            tooltipVideoOps = videoSeries[vars.index];
          }
          tooltipVisible = true;
        } else {
          tooltipVisible = false;
        }
        m.redraw();
      });
    },
    onremove: (vnode) => {
      bullet.off('chart-hover');
    },
    view: (vnode) => {
      return [
        m('.row.is-vcentered.fade-in', m('.column',
          m('section.has-border', [
            m('h5', `API key operation usage (${tmpCurrentOperations.toLocaleString()} / ${tmpMaxOperations.toLocaleString()})`),
            m('p', [
              m('span', 'This is the total amount of operations that this specific key has contributed against your total operation usage. Once the number of operations exceed your plan limit you will be charged for each operation in excess. You may cap your overage limit in the '),
              m('a.is-info', 'billing settings.')
            ]),
            m(`progress.progress.is-small.is-${progress() >= 100 ? 'warning' : 'info'}`, { value: `${progress()}`, max: '100' }, `${progress()}%`)
          ])
        )),
        m('.tooltip',
          m('span.tooltiptext.is-inline', {
            style: {
              top: `${tooltipTop}px`,
              left: `${tooltipLeft}px`,
              maxWidth: 'none',
              pointerEvents: 'none',
              position: 'fixed',
              visibility: tooltipVisible ? 'visible' : 'hidden'
            }
          }, [
            m('span.has-text-weight-semibold', tooltipTitle),
            chartTooltipInfo('info', 'Image API', tooltipImageOps),
            chartTooltipInfo('danger', 'GIF API', tooltipGifOps),
            chartTooltipInfo('primary', 'Text API', tooltipTextOps),
            chartTooltipInfo('warning', 'Video API', tooltipVideoOps)
          ])
        ),
        chartContainer(
          'image',
          [],
          false,
          createSeriesPeriod(imageSeries),
          createSeriesPercentage(imageSeries),
          imageSeries.reduce(count),
          'Image API'
        ),
        chartContainer(
          'gif',
          [],
          false,
          createSeriesPeriod(gifSeries),
          createSeriesPercentage(gifSeries),
          gifSeries.reduce(count),
          'GIF API'
        ),
        chartContainer(
          'text',
          [],
          false,
          createSeriesPeriod(textSeries),
          createSeriesPercentage(textSeries),
          textSeries.reduce(count),
          'Text API'
        ),
        chartContainer(
          'video',
          ['9 AM', '10:00', '11:00', '12:00', '13:00', '14:00', '3 PM', '16:00', '17:00', '18:00', '19:00', '20:00', '9 PM', '22:00', '23:00', '00:00', '01:00', '02:00', '3 AM', '04:00', '05:00', '06:00', '07:00', '08:00'],
          true,
          createSeriesPeriod(videoSeries),
          createSeriesPercentage(videoSeries),
          videoSeries.reduce(count),
          'Video API'
        )
      ];
    }
  };
};
