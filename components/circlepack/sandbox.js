
var chart = rivela.circlepack()

var svg = d3.select('svg')
var data = [3, 9, 13, 2]
svg.datum(data).call(chart)

var update = () => svg.datum(data).call(chart.immediately())

var ctrlData = [

  {category: 'Axes', name: 'labels.title', type: 'text', v: ''},

  {name: () => {
    data.push(Math.random() * 50)
    svg.datum(data).call(chart)
  },
    type: 'button',
    label: 'Add data point'}
]

buildCtrl(defaultCtrl().def.concat(ctrlData), chart, update)
