/* global d3, rivela */

;(function () {
  var ns = '_axisy'
  window.rivela[ns] = function init (cfg) {
    function build () {
      var container = cfg.container
      var eContainer = cfg.eContainer
      var mapY = cfg.mapY
      var outerh = cfg.outerh
      var ctime = cfg.ctime
      var labels = cfg.labels
      var rotLabels = cfg.rotateLabels

      /*
          --------------------------------------
          Axis Y
      */
      eContainer.append('g').classed('ax y axis', true)

      var yAxis = d3.axisLeft(mapY).ticks(6)

      container
            .select('.y.axis')
            .attr('transform', `translate(0,${cfg.pt})`)
            .transition()
            .duration(ctime)
            .call(yAxis)

      container
            .select('.y.axis')
            .selectAll('text')
            .transition()
            .duration(ctime)
            .attr('dx', () => (rotLabels.y) ? '.4em' : null)
            .attr('dy', () => (rotLabels.y) ? '-.5em' : '.32em')
            .attr('transform', () => (rotLabels.y) ? 'rotate(-45)' : 'rotate(0)')

      /*
          --------------------------------------
          Axis Y Label
      */
      eContainer.append('g').classed('ax y label', true)
            .append('text')

      container
            .select('.y.label')
            .attr('transform', `rotate(-90), translate(${outerh / 2 * -1}, ${-30})`)
            .select('text')
            .text(labels.y)
            .style('text-anchor', 'middle')
    }
    return build
  }
})()
