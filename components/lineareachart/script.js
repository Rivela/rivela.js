/* global d3, rivela */

;(function () {
  var ns = 'lineareachart'
  window.rivela[ns] = function init () {
    var utils = rivela._utils()
    var uga = utils.getAccessor

    var cfg = utils.defaults()
    cfg.ns = ns

    var base = rivela._base(cfg)
    var foot = rivela._foot(cfg)
    var axisx = rivela._axisx(cfg)
    var axisy = rivela._axisy(cfg)
    var title = rivela._title(cfg)
    var linearea = rivela._linearea(cfg)

    function build (selection) {
      selection.each(function (data, index) {
        base(this, build, data, index)
        linearea(cfg.type, 'path')
        axisx()
        axisy()
        title()
        foot()
      })
    }

    utils.injectInterfaces(cfg.interfaces, build, cfg)

    return build
  }
})()
