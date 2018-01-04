/* global d3, rivela */

;(function () {
  var ns = '_bars'
  window.rivela[ns] = function init (cfg) {
    var utils = rivela._utils()
    var uga = utils.getAccessor

    cfg.key = (d, i) => i
    cfg.value = d => d
    cfg.colors = null
    cfg.padder = {inner: 0.1, outer: 0.1, align: 0.5}
    cfg.id = null
    cfg.extents = {key: null, value: null}
    cfg.ordinal = true
    cfg.horizontal = false
    cfg.scales = {key: d3.scaleLinear, value: d3.scaleLinear}

    cfg.interfaces.push(
        'key',
        'value',
        'id',
        'extents',
        'horizontal',
        'ordinal',
        'padder',
        'scales'
    )

    function build () {
      var element = cfg.element
      var data = cfg.data

      var isH = cfg.horizontal
      var innerk = (isH) ? cfg.innerh : cfg.innerw
      var innerv = (isH) ? cfg.innerw : cfg.innerh
      var barK = (isH) ? 'height' : 'width'
      var barV = (isH) ? 'width' : 'height'
      var barPos = (isH) ? 'x' : 'y'
      var barNotPos = (isH) ? 'y' : 'x'

      var extData = (cfg.extents.value) || data

      var mapK
      var colSize = 0
      var shift = 0

      if (cfg.ordinal) {
        mapK = d3.scaleBand()
            .domain(extData.map(cfg.key))
            .range([0, innerk])
            .paddingInner([cfg.padder.inner])
            .paddingOuter([cfg.padder.outer])
            .align([cfg.padder.align])
        colSize = mapK.bandwidth()
      } else {
        var extK = d3.extent(extData, (d, i) => uga(d, i, cfg.key))
        mapK = cfg.scales.key()
            .domain(extK)
            .range([0, innerk])
        colSize = innerk / (extData.length)
        shift = colSize / 2
      }

      var extV = d3.extent(extData, (d, i) => uga(d, i, cfg.value))

      if (extV[0] > 0) extV[0] = 0

      var mapV = cfg.scales.value()
            .domain(extV)
            .range([innerv, 0])

      if (isH) mapV.range([0, innerv])

      cfg.mapX = isH ? mapV : mapK
      cfg.mapY = isH ? mapK : mapV

        /*
            --------------------------------------
            Data binding
        */
      var elems = cfg.container
            .select('.chart')
            .selectAll('g')
            .data(data, cfg.id)

        /*
            --------------------------------------
            Enter phase, elements need to be created
        */
      var enterElems = elems.enter()
            .append('g')
            .attr('transform', (d, i) => {
              var v = mapK(uga(d, i, cfg.key)) - shift
              return (isH) ? `translate(0, ${v})` : `translate(${v}, 0)`
            })
            .classed('bar', true)

      enterElems.append('rect')
            .attr(barK, colSize)
            .attr(barV, 0)
            .attr(barPos, d => isH ? 0 : mapV(0))

        /*
            --------------------------------------
            Update phase, elements need to be updated
        */
      elems.merge(enterElems).transition()
            .duration(cfg.ctime)
            .delay(cfg.ctime / 10)
            .ease(d3.easeExpInOut)
            .attr('transform', (d, i) => {
              var v = mapK(uga(d, i, cfg.key)) - shift
              return (isH) ? `translate(0, ${v})` : `translate(${v}, 0)`
            })
            .select('rect')
            .attr(barK, colSize)
            .attr(barV, (d, i) => {
              var _y = uga(d, i, cfg.value)
              if (isH) return mapV(_y)
              if (_y >= 0) {
                return mapV(0) - mapV(_y)
              } else {
                return mapV(_y) - mapV(0)
              }
            })
            .attr(barPos, (d, i) => {
              var _y = uga(d, i, cfg.value)
              if (isH) return 0
              if (_y >= 0) {
                return mapV(_y)
              } else {
                return mapV(0)
              }
            })
            .attr(barNotPos, 0)
            .style('fill', cfg.colors)

        /*
            --------------------------------------
            Exit phase, elements need to go away
        */
      var exitElems = elems.exit()
            .transition()
            .duration(cfg.ctime / 2)
            .ease(d3.easeExpInOut)
            .attr('opacity', 0)
            .remove()
      /*
          --------------------------------------
          Mouse/Touch interactions
      */

      // keep a reference of the list of objects
      var _objects = elems.merge(enterElems).merge(exitElems)
      cfg.group = _objects.nodes()

      _objects
          .on('click', function (d, i, _group) {
            d._picked = true
            element.dispatch('pick', {detail: {datum: d, el: this, index: i, group: _group}})
          })
          .on('mouseenter', function (d, i, _group) {
            d3.select(this).classed('over', true)
            element.dispatch('over', {detail: {datum: d, el: this, index: i, group: _group}})
          })
          .on('mouseleave', function (d, i, _group) {
            d3.select(this).classed('over', false)
            element.dispatch('out', {detail: {datum: d, el: this, index: i, group: _group}})
          })
    }
    return build
  }
})()
