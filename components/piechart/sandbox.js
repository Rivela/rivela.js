
var chart = rivela.piechart()

var svg = d3.select('svg')
var data = [3, 9, 13, 2]
datum = 10

svg.datum(data).call(chart)
  .on('pick', function () {
    var event = d3.event.detail
    console.log(event)
  })
  .on('unpick', function () {
    var event = d3.event.detail
    console.log(event)
  })

var update = () => svg.datum(data).call(chart.immediately())

var ctrlData = [
  {name: () => {
    data.push(datum)
    svg.datum(data).call(chart)
  },
    type: 'button',
    label: 'Add data point'},
  {name: () => {
    data.splice(0, 1)
    svg.datum(data).call(chart)
  },
    type: 'button',
    label: 'Remove last data point'},
  {name: () => {
    data = data.map(d => Math.random() * 20)
    svg.datum(data).call(chart)
  },
    type: 'button',
    label: 'Shuffle data points'},
  {name: () => {
    var colors = d3.scaleOrdinal(d3.schemeCategory10)
    chart.colors((d, i) => colors(i))
    svg.datum(data).call(chart)
  },
    type: 'button',
    label: 'Set color scale'},
  {name: () => {
    data = [{k: 'a', v: 4}, {k: 'b', v: 6}, {k: 'c', v: 8}]
    datum = {k: 'd', v: 7}
    chart.key(d => d.k).value(d => d.v)
    svg.datum(data).call(chart)
  },
    type: 'button',
    label: 'Use structured dataset'},
  {name: 'labels.title', type: 'text', v: ''},
  {name: 'radius.inner', type: 'range', m: 0, M: 1, v: 0},
  {name: 'radius.labels', type: 'range', m: 0, M: 2, v: 0},
  {name: () => {
    data = [{k: 'a', v: 4, s: 5}, {k: 'b', v: 6, s: 10}, {k: 'c', v: 8, s: 15}]
    datum = {k: 'd', v: 9, s: 12}
    chart.key(d => d.k).value(d => d.v)
    chart.radius({inner: d => d.s, outer: d => 40 + d.s})
    svg.datum(data).call(chart)
  },
    type: 'button',
    label: 'radius by func'},
    {name: 'angles.start', type: 'range', m: -Math.PI / 2, M: Math.PI / 2, v: 0},
    {name: 'angles.end', type: 'range', m: 0, M: Math.PI * 2, v: Math.PI * 2},
    {name: 'angles.pad', type: 'range', m: 0, M: 1, v: 0}
]

buildCtrl(defaultCtrl().def.concat(ctrlData), chart, update)
