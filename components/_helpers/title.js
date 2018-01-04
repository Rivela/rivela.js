/* global d3, rivela */

;(function () {
  var ns = '_title'
  window.rivela[ns] = function init (cfg) {
    var utils = rivela._utils()
    var uga = utils.getAccessor

    function build () {
      var data = cfg.data

      cfg.eContainer.append('g').classed('title label', true)
            .append('text')

      cfg.container
            .select('.title.label')
            .select('text')
            .attr('transform', `translate(${cfg.outerw / 2},${-10})`)
            .text(() => uga(data, 0, cfg.labels.title))
            .style('text-anchor', 'middle')
    }
    return build
  }
})()
