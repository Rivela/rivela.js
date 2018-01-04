/* global d3, rivela */

;(function () {
  var ns = '_linearea'
  window.rivela[ns] = function init (cfg) {
    var utils = rivela._utils()
    var uga = utils.getAccessor

    cfg.x = (d, i) => i
    cfg.y = d => d
    cfg.serie = null
    cfg.multiple = null
    cfg.curve = d3.curveLinear
    cfg.extents = {x: null, y: null}
    cfg.padder = {inner: 0.1, outer: 0.1, align: 0.5}
    cfg.ordinal = false
    cfg.colors = null
    cfg.type = 'line' // line,area
    cfg.scales = {x: d3.scaleLinear, y: d3.scaleLinear}

    cfg.interfaces.push(
      'x',
      'y',
      'serie',
      'multiple',
      'curve',
      'extents',
      'padder',
      'ordinal',
      'colors',
      'type',
      'scales'
    )

    function build (type, cname) {
      var element = cfg.element

      var series

      if (cfg.multiple) { // d => d
        series = uga(cfg.data, 0, cfg.multiple)
      } else {
        series = [cfg.data]
      }

      var name = (cname) || type

      var extDataX = (cfg.extents.x) || series
      var extDataY = (cfg.extents.y) || series

      var minX = d3.min(extDataX, (d, i) => {
        var serie = (cfg.serie) ? uga(d, i, cfg.serie) : d
        return d3.min(serie, (c, j) => uga(c, j, cfg.x))
      })

      var minY = d3.min(extDataY, (d, i) => {
        var serie = (cfg.serie) ? uga(d, i, cfg.serie) : d
        return d3.min(serie, (c, j) => uga(c, j, cfg.y))
      })

      var maxX = d3.max(extDataX, (d, i) => {
        var serie = (cfg.serie) ? uga(d, i, cfg.serie) : d
        return d3.max(serie, (c, j) => uga(c, j, cfg.x))
      })

      var maxY = d3.max(extDataY, (d, i) => {
        var serie = (cfg.serie) ? uga(d, i, cfg.serie) : d
        return d3.max(serie, (c, j) => uga(c, j, cfg.y))
      })

      var mapX
      var colw = 0

      if (cfg.ordinal) {
        var map = (cfg.serie) ? uga(extDataX, 0, cfg.serie) : extDataX.map(cfg.x)
        mapX = d3.scaleBand()
            .domain(map)
            .range([0, cfg.innerw])
            .paddingInner([cfg.padder.inner])
            .paddingOuter([cfg.padder.outer])
            .align([cfg.padder.align])
        colw = mapX.bandwidth()
      } else {
        mapX = cfg.scales.x()
          .domain([minX, maxX])
          .range([0, cfg.innerw])
      }

      var mapY = cfg.scales.y()
          .domain([minY, maxY])
          .nice()
          .range([cfg.innerh, 0])

      cfg.mapX = mapX
      cfg.mapY = mapY

      /*
          --------------------------------------
          Generator
      */
      var gen

      if (type === 'line') {
        gen = d3.line()
          .x((d, i) => mapX(uga(d, i, cfg.x)) + colw / 2)
          .y((d, i) => mapY(uga(d, i, cfg.y)))
          .curve(cfg.curve)
      }

      if (type === 'area') {
        gen = d3.area()
          .x((d, i) => mapX(uga(d, i, cfg.x)) + colw / 2)
          .y1((d, i) => mapY(uga(d, i, cfg.y)))
          .y0((d, i) => cfg.innerh)
          .curve(cfg.curve)
      }

      var elems = cfg.container
          .select('.chart')
          .selectAll(`.${name}`)
          .data(series)

      /*
          --------------------------------------
          Enter phase, elements need to be created
      */
      var enterElems = elems.enter()
          .append('path')
          .style('opacity', 0)
          .classed(name, true)

      /*
          --------------------------------------
          Update phase, elements need to be updated
      */
      var visProp = (type === 'line') ? 'stroke' : 'fill'
      var notVisProp = (type === 'line') ? 'fill' : 'stroke'
      elems.merge(enterElems)
          .classed('line area', false)
          .classed(type, true)
          .transition()
          .duration(cfg.ctime)
          .style('opacity', 1)
          .attr('d', (d, i) => {
            var serie = (cfg.serie) ? uga(d, i, cfg.serie) : d
            return gen(serie)
          })
          .style(notVisProp, null)
          .style(visProp, cfg.colors)

      /*
          --------------------------------------
          Exit phase, elements need to go away
      */
      var exitElems = elems.exit()
            .transition()
            .duration(cfg.ctime / 2)
            .style('opacity', 0)
            .remove()

      /*
          --------------------------------------
          Mouse/Touch interactions
      */

      // keep a reference of the list of objects
      var _objects = elems.merge(enterElems).merge(exitElems)
      cfg.group = _objects.nodes()

      _objects.on('click', function (d, i, _group) {
        d._picked = true
        element.dispatch('pick', {detail: {datum: d, el: this, index: i, group: _group}})
      })
    }
    return build
  }
})()
