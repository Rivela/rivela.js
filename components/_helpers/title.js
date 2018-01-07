/* global d3, rivela */

;(function () {
  var ns = '_title'
  window.rivela[ns] = function init (cfg) {
    var utils = rivela._utils()
    var uga = utils.getAccessor

    function build () {
      var data = cfg.data

      cfg.eContainer.append('g').classed('title', true)
            .append('text')

      cfg.container
            .select('.title')
            .attr('transform', `translate(${cfg.outerw / 2},${-10})`)
            .select('text')
            .text(() => uga(data, 0, cfg.labels.title))
    }
    return build
  }
})()
