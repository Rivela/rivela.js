
d3.json('/../components/mapchart/examples/countries.geo.json', data => {
  var colors = d3.scaleOrdinal(d3.schemeCategory20b)

  var chart = rivela.mapchart()

  var svg = d3.select('svg')
      .datum(data.features)
      .call(chart)

  var update = () => svg.datum(data.features).call(chart.immediately())

  var ctrlData = []

  buildCtrl(defaultCtrl().def.concat(ctrlData), chart, update)
})
