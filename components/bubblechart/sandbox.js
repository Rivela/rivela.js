
var chart = rivela.bubblechart()

var svg = d3.select('svg').append('g').attr('transform', 'translate(20, 10)')

var data = [3, 9, 13, 2]

var update = () => svg.datum(data).call(chart.immediately())
var updateAnim = () => svg.datum(data).call(chart)

var ctrlData = [

  {category: 'Axes', name: 'labels.title', type: 'text', v: ''},
  {category: 'Axes', name: 'labels.x', type: 'text', v: ''},
  {category: 'Axes', name: 'labels.y', type: 'text', v: ''},
  {category: 'Axes', name: 'rotateLabels.x', type: 'checkbox', v: ''},
  {category: 'Axes', name: 'rotateLabels.y', type: 'checkbox', v: ''},

  {
    type: 'button',
    label: 'Add data point',
    name: () => {
      data.push(Math.random() * 50)
      svg.datum(data).call(chart)
    }
  },

  {
    type: 'button',
    label: 'Remove last data point',
    name: () => {
      data.splice(0, 1)
      svg.datum(data).call(chart)
    }
  }

]

buildCtrl(defaultCtrl().def.concat(ctrlData), chart, update)
