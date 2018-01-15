;(function () {
  var ns = '_base'
  window.rivela[ns] = function init (cfg) {
    var utils = rivela._utils()
    var uga = utils.getAccessor

    function build (_element, ref, _data, _index) {
      _element.__generator = ref

      var element = d3.select(_element)
      var data = _data
      var index = _index

      cfg.element = element
      cfg.data = data
      cfg.index = index

      element.classed('rivela', true)

      cfg.pl = uga(data, 0, cfg.padding.left)
      cfg.pr = uga(data, 0, cfg.padding.right)
      cfg.pt = uga(data, 0, cfg.padding.top)
      cfg.pb = uga(data, 0, cfg.padding.bottom)

      cfg.ml = uga(data, 0, cfg.margin.left)
      cfg.mr = uga(data, 0, cfg.margin.right)
      cfg.mt = uga(data, 0, cfg.margin.top)
      cfg.mb = uga(data, 0, cfg.margin.bottom)

      cfg.outerw = cfg.width - cfg.ml - cfg.mr
      cfg.outerh = cfg.height - cfg.mt - cfg.mb

      cfg.innerw = cfg.outerw - cfg.pl - cfg.pr
      cfg.innerh = cfg.outerh - cfg.pt - cfg.pb

      var binding = element.selectAll('.' + cfg.ns)
            .data([null])

      // ------- enter

      var eWrapper = binding.enter()
            .append('g')
            .classed(cfg.ns, true)

      eWrapper.append('g')
            .classed('behind', true)
            .append('rect')
            .classed('basement', true)

      var eContainer = eWrapper.append('g')
            .classed('front', true)

      eWrapper.append('g')
            .classed('overall', true)

      eContainer.append('g')
            .classed('back', true)
            .append('rect')
            .classed('background', true)

      eContainer.append('g')
            .classed('chart', true)

      // ------------- update

      var container = binding.merge(eWrapper)

      container.select('.basement')
            .attr('width', cfg.width)
            .attr('height', cfg.height)

      container.select('.front')
            .attr('transform', `translate(${cfg.ml},${cfg.mt})`)

      container.select('.background')
            .attr('width', cfg.outerw)
            .attr('height', cfg.outerh)

      container.select('.chart')
            .attr('transform', `translate(${cfg.pl},${cfg.pt})`)

      cfg.container = container
      cfg.eContainer = eContainer
    }
    return build
  }
})()
