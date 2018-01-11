;(function () {
  var ns = '_axisx'
  window.rivela[ns] = function init (cfg) {
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

      eContainer.append('g').classed('ax x axis', true)

      var xAxis = d3.axisBottom(mapX).ticks(6)

      container
        .select('.x.axis')
        .attr('transform', `translate(${cfg.pl},${outerh})`)
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
        .attr('dy', () => (rotLabels.x) ? '.15em' : '.71em')
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
