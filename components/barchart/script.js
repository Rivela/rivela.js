;(function () {
  var ns = 'barchart'
  window.rivela[ns] = function init () {
    var utils = rivela._utils()
    var uga = utils.getAccessor

    var cfg = utils.defaults()
    cfg.ns = ns

    var foot = rivela._foot(cfg)
    var base = rivela._base(cfg)
    var axisx = rivela._axisx(cfg)
    var axisy = rivela._axisy(cfg)
    var title = rivela._title(cfg)
    var bars = rivela._bars(cfg)

    function build (selection) {
      selection.each(function (data, index) {
        base(this, build, data, index)
        bars()
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
