;(function () {
  var ns = '_title'
  window.rivela[ns] = function init (cfg) {
    var utils = rivela._utils()
    var uga = utils.getAccessor

    cfg.title = ''
    cfg.interfaces.push(
        'title'
    )

    function build () {
      var data = cfg.data

      var binding = cfg.container.selectAll('.title')
            .data([null])

      binding.enter()
        .append('g').classed('title', true)
        .append('text')

      cfg.container
        .select('.title')
        .attr('transform', `translate(${cfg.width / 2},${20})`)
        .select('text')
        .text(() => uga(data, 0, cfg.title))
    }
    return build
  }
})()
