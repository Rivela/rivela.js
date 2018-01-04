
var chart = rivela.barchart()

var svg = d3.select('svg').append('g').attr('transform', 'translate(20, 10)')

var data = [3, 9, 13, 2]

var update = () => svg.datum(data).call(chart.immediately())
var updateAnim = () => svg.datum(data).call(chart)

var ctrlData = [

  {category: 'Axes', name: 'labels.x', type: 'text', v: ''},
  {category: 'Axes', name: 'labels.y', type: 'text', v: ''},
  {category: 'Axes', name: 'rotateLabels.x', type: 'checkbox', v: ''},
  {category: 'Axes', name: 'rotateLabels.y', type: 'checkbox', v: ''},
  {category: 'Axes', name: 'ordinal', type: 'checkbox', v: 'true'},
  {category: 'Axes', name: 'padder.inner', type: 'range', m: 0, M: 1, v: 0.1},
  {category: 'Axes', name: 'padder.outer', type: 'range', m: 0, M: 1, v: 0.1},
  {category: 'Axes', name: 'padder.align', type: 'range', m: 0, M: 1, v: 0.5},
  {category: 'Axes', name: 'horizontal', type: 'checkbox', v: ''},

  {
    category: 'Interact',
    type: 'button',
    label: 'Add data point',
    name: () => {
      data.push(Math.random() * 50)
      updateAnim()
    }
  },

  {
    category: 'Interact',
    type: 'button',
    label: 'Remove last data point',
    name: () => {
      data.pop()
      updateAnim()
    }
  },

  {
    category: 'Interact',
    type: 'button',
    label: 'Shuffle data points',
    name: () => {
      data = data.map(d => Math.random() * 10)
      updateAnim()
    }
  }

]

buildCtrl(defaultCtrl().def.concat(ctrlData), chart, update)
