
var chart = rivela.heatmap()

var svg = d3.select('svg')
var data = d3.range(100).map(d => {
  var c = ['a', 'b', 'c', 'd', 'e', 'f']
  var x = 2000 + parseInt(Math.random() * 10)
  var y = c[parseInt(Math.random() * c.length)]
  return {x: x, y: y, value: Math.random()}
})
svg.datum(data).call(chart)

var update = () => svg.datum(data).call(chart.immediately())

var ctrlData = [

]

buildCtrl(defaultCtrl().def.concat(ctrlData), chart, update)
