
var chart = rivela.lineareachart()

var svg = d3.select('svg')

var data = [3, 9, 13, 2]

chart.multiple(d => d)
data = d3.range(5).map(d => {
  return d3.range(5).map(c => Math.random())
})

chart.serie(d => d.arr)
data = d3.range(5).map(d => {
  return {key: 'a', arr: d3.range(5).map(c => Math.random())}
})

chart.extents({y: [{arr: [0, 10]}]})

// chart.multiple(d => d.ooo)
// data = {name: 'ooo',
//   ooo: d3.range(5).map(d => {
//     return {key: 'a', arr: d3.range(5).map(c => Math.random())}
//   })}

// chart.serie(null)
// data = {name: 'ooo',
//   ooo: d3.range(5).map(d => {
//     return d3.range(5).map(c => Math.random())
//   })}

var colors = d3.scaleOrdinal(d3.schemeCategory20)
chart.colors((d, i) => colors(i))

console.log(data)

svg.datum(data).call(chart)
  .on('pick', function () {
    var event = d3.event.detail
    d3.selectAll(event.group)
            .style('stroke', '#ccc')
    d3.select(event.el)
            .style('stroke', 'red')
  })
  .on('unpick', function () {
    var event = d3.event.detail
    d3.selectAll(event.group)
      .style('stroke', (d, i) => colors(i))
  })

var update = () => svg.datum(data).call(chart.immediately())

var ctrlData = [
  {name: () => {
    data.push(Math.random() * 50)
    svg.datum(data).call(chart)
  },
    type: 'button',
    label: 'Add data point'},
  {name: () => {
    data.pop()
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
    chart.curve(d3.curveBasis)
    svg.datum(data).call(chart)
  },
    type: 'button',
    label: 'Smooth curve'},
    {type: 'select', v: 'line,area', name: 'type'},
    {name: 'labels.title', type: 'text', v: ''},
    {name: 'labels.x', type: 'text', v: ''},
    {name: 'labels.y', type: 'text', v: ''},
    {name: 'rotateLabels.x', type: 'checkbox', v: ''},
    {name: 'rotateLabels.y', type: 'checkbox', v: ''},
    {name: 'ordinal', type: 'checkbox', v: ''},
    {name: 'padder.inner', type: 'range', m: 0.0, M: 1.0, v: 0.1},
    {name: 'padder.outer', type: 'range', m: 0.0, M: 1.0, v: 0.1},
    {name: 'padder.align', type: 'range', m: 0.0, M: 1.0, v: 0.5}
]

buildCtrl(defaultCtrl().def.concat(ctrlData), chart, update)
