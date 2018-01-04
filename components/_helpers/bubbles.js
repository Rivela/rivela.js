/* global d3, rivela */

;(function () {
  var ns = '_bubbles'
  window.rivela[ns] = function init (cfg) {
    var utils = rivela._utils()
    var uga = utils.getAccessor

    cfg.x = (d, i) => i
    cfg.y = d => d
    cfg.colors = null
    cfg.padder = {inner: 0.1, outer: 0.1, align: 0.5}
    cfg.key = null
    cfg.extents = {x: null, y: null}
    cfg.z = 4
    cfg.scales = {x: d3.scaleLinear, y: d3.scaleLinear}

    cfg.interfaces.push(
      'x',
      'y',
      'z',
      'key',
      'extents',
      'colors',
      'scales'
    )

    function build () {
      var element = cfg.element

      var extData = (cfg.extents.y) || cfg.data

      var extX = d3.extent(extData, (d, i) => uga(d, i, cfg.x))

      var mapX = cfg.scales.x()
          .domain(extX)
          .nice()
          .range([0, cfg.innerw])

      var extY = d3.extent(extData, (d, i) => uga(d, i, cfg.y))

      var mapY = cfg.scales.y()
          .domain(extY)
          .nice()
          .range([cfg.innerh, 0])

      cfg.mapX = mapX
      cfg.mapY = mapY

      /*
          --------------------------------------
          Data binding

      */
      var elems = cfg.container
          .select('.chart')
          .selectAll('circle')
          .data(cfg.data, cfg.key)

      /*
          --------------------------------------
          Enter phase, elements need to be created
      */
      var enterElems = elems.enter()
          .append('circle')
          .classed('dot', true)
          .attr('r', 0)
          .attr('cx', (d, i) => mapX(uga(d, i, cfg.x)))
          .attr('cy', (d, i) => mapY(uga(d, i, cfg.y)))

      /*
          --------------------------------------
          Update phase, elements need to be updated
      */
      elems.merge(enterElems).transition()
          .duration(cfg.ctime)
          // .delay(cfg.ctime / 10)
          // .attr('r', d => mapR(d[z]))
          .attr('r', (d, i) => uga(d, i, cfg.z))
          .attr('cx', (d, i) => mapX(uga(d, i, cfg.x)))
          .attr('cy', (d, i) => mapY(uga(d, i, cfg.y)))
          .style('fill', cfg.colors)

      /*
          --------------------------------------
          Exit phase, elements need to go away
      */
      var exitElems = elems.exit()
          .transition()
          .duration(cfg.ctime / 2)
          .attr('r', 0)
          .remove()

      // keep a reference of the list of objects
      var _objects = elems.merge(enterElems).merge(exitElems)
      var group = _objects.nodes()

        /*
            --------------------------------------
            Mouse/Touch interactions
        */

      _objects.on('click', function (d, i, _group) {
        element.dispatch('pick', {detail: {datum: d, el: this, index: i, group: _group}})
      })
    }
    return build
  }
})()
