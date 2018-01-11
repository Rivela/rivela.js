;(function () {
  var ns = 'piechart'
  window.rivela[ns] = function init () {
    var utils = rivela._utils()
    var uga = utils.getAccessor

    var cfg = utils.defaults()
    cfg.ns = ns

    var foot = rivela._foot(cfg)
    var base = rivela._base(cfg)
    var title = rivela._title(cfg)
    var pie = rivela._pie(cfg)

    function build (selection) {
      selection.each(function (data, index) {
        base(this, build, data, index)

        pie()

        title()
        foot()
      })
    }

    utils.injectInterfaces(cfg.interfaces, build, cfg)

    return build
  }
})()
