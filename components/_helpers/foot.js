/* global d3, rivela */

;(function () {
  var ns = '_foot'
  window.rivela[ns] = function init (cfg) {
    function build () {
      cfg.ctime = cfg.otime

      var element = cfg.element
      var group = (cfg.group) ? cfg.group : null

      cfg.container.select('.background')
            .on('click', function () {
              element.dispatch('unpick', {detail: {group: group}})
            })
    }
    return build
  }
})()
