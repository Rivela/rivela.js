;(function () {
  var ns = '_axisx'
  window.rivela[ns] = function init (cfg) {
    var utils = rivela._utils()
    var uga = utils.getAccessor

    cfg.axisx = null
    cfg.axisxOpposite = false
    cfg.interfaces.push(
        'axisx',
        'axisxOpposite'
      )

    function build () {
      var container = cfg.container
      var eContainer = cfg.eContainer
      var mapX = cfg.mapX
      var outerw = cfg.outerw
      var outerh = cfg.outerh
      var ctime = cfg.ctime
      var labels = cfg.labels
      var rotLabels = cfg.rotateLabels

      /*
            --------------------------------------
            Axis X
      */

      var ax = (cfg.axisx) ? cfg.axisx : (cfg.axisxOpposite) ? d3.axisTop() : d3.axisBottom()
      eContainer.append('g').classed('ax x axis', true)

      var xAxis = ax
        .scale(mapX)

      var pos = (cfg.axisxOpposite) ? 0 : outerh

      container
        .select('.x.axis')
        .attr('transform', `translate(${cfg.pl},${pos})`)
        .transition()
        .duration(ctime)
        .call(xAxis)

      container
        .select('.x.axis')
        .selectAll('text')
        .transition()
        .duration(ctime)
        .style('text-anchor', () => (rotLabels.x) ? 'end' : 'middle')
        .attr('dx', () => (rotLabels.x) ? '-.8em' : '0')
        // .attr('dy', () => (rotLabels.x) ? '.15em' : '.71em')
        .attr('transform', () => (rotLabels.x) ? 'rotate(-65)' : 'rotate(0)')

      /*
        --------------------------------------
        Axis X Label
      */
      eContainer.append('g').classed('ax x label', true)
        .append('text')

      container
        .select('.x.label')
        .attr('transform', `translate(${outerw / 2},${outerh + 25})`)
        .select('text')
        .text(labels.x)
        .style('text-anchor', 'middle')
    }
    return build
  }
})()
