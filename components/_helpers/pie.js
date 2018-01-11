;(function () {
  var ns = '_pie'
  window.rivela[ns] = function init (cfg) {
    var utils = rivela._utils()
    var uga = utils.getAccessor

    cfg.key = (d, i) => i
    cfg.value = d => d
    cfg.series = null
    cfg.sort = null
    cfg.colors = null
    cfg.radius = {inner: 0, labels: 0, outer: 0}
    cfg.angles = {start: 0, end: Math.PI * 2, pad: 0.02}
    cfg.label = null

    cfg.interfaces.push(
      'key',
      'value',
      'series',
      'radius',
      'colors',
      'sort',
      'angles',
      'label'
    )

    var _objects

    function build () {
      var element = cfg.element
      var data = cfg.data

      var series = (cfg.series) ? uga(data, 0, cfg.series) : data

      cfg.container.select('.chart')
            .attr('transform', `translate(${cfg.innerw / 2 + (cfg.padding.left)},${cfg.innerh / 2 + (cfg.padding.top)})`)

      var minDim = Math.min(cfg.innerw, cfg.innerh)
      var radiusOuter = minDim / 2

        /*
            --------------------------------------
            Configurations
        */
      var pie = d3.pie()
          .value((d, i) => uga(d, i, cfg.value))
          .sort(cfg.sort)
          .startAngle(cfg.angles.start)
          .endAngle(cfg.angles.end)
          .padAngle(cfg.angles.pad)

      var arc = d3.arc()
          // .innerRadius((d, i) => radiusOuter * uga(d.data, i, cfg.radius.inner))
          // .outerRadius((d, i) => radiusOuter)

      var labelArc = d3.arc()
          .innerRadius((d, i) => radiusOuter * uga(d.data, i, cfg.radius.inner))
          .outerRadius((d, i) => radiusOuter + radiusOuter * uga(d.data, i, cfg.radius.labels))

      var piedata = pie(series)

        // cfg.eContainer.append('g').classed('chart', true)

        /*
            --------------------------------------
            Data binding
        */
      var elems = cfg.container
          .select('.chart')
          .selectAll('.item')
          .data(piedata)

        /*
            --------------------------------------
            Enter phase, elements need to be created
        */
      var enterElems = elems.enter()
          .append('g')
          .classed('item', true)

      enterElems.append('path')
          .classed('arc', true)
          .each(function (d, i) {
            this._startAngle = d.startAngle
            this._endAngle = d.endAngle
            this._innerRadius = radiusOuter * uga(d.data, i, cfg.radius.inner)
            this._outerRadius = radiusOuter + radiusOuter * uga(d.data, i, cfg.radius.outer)
          })

      enterElems.append('text')
          .classed('label', true)

      cfg.eContainer.append('g')
          .attr('transform', `translate(${cfg.innerw / 2 + (cfg.padding.left)},${cfg.innerh / 2 + (cfg.padding.top)})`)
          .append('text')
          .classed('mid_label', true)

        /*
            --------------------------------------
            Update phase, elements need to be updated
        */
      elems.merge(enterElems)
          .select('path')
          .transition()
          .duration(cfg.ctime)
          .ease(d3.easeCubicInOut)
          .attrTween('d', function (d, i) {
            const i1 = d3.interpolate(this._startAngle, d.startAngle)
            const i2 = d3.interpolate(this._endAngle, d.endAngle)

            var ir = radiusOuter * uga(d.data, i, cfg.radius.inner)
            const i3 = d3.interpolate(this._innerRadius, ir)

            var or = radiusOuter + radiusOuter * uga(d.data, i, cfg.radius.outer)
            const i4 = d3.interpolate(this._outerRadius, or)

            this._startAngle = d.startAngle
            this._endAngle = d.endAngle
            this._innerRadius = ir
            this._outerRadius = or

            return t => {
              d.startAngle = i1(t)
              d.endAngle = i2(t)
              d.innerRadius = i3(t)
              d.outerRadius = i4(t)
              return arc(d)
            }
          })
          .filter(() => (cfg.colors))
          .style('fill', (d, i) => uga(d.data, i, cfg.colors))

      elems.merge(enterElems)
          .select('text')
          .text((d, i) => uga(d.data, i, cfg.key))
          .classed('label', true)
          .each(function (d) {
            var c = labelArc.centroid(d)
            d3.select(this)
              .transition()
              .duration(cfg.ctime)
              .ease(d3.easeCubicInOut)
              .attr('x', c[0])
              .attr('y', c[1])
          })

      cfg.container.select('.mid_label')
            .text(cfg.label)
          // .transition()
          // .duration(cfg.ctime)
          // .tween('text', function () {
          //   var that = d3.select(this)
          //   var i = d3.interpolate(that.text(), cfg.label)
          //   return function (t) {
          //     that.text(i(t))
          //   }
          // })

        /*
            --------------------------------------
            Exit phase, elements need to go away
        */
      var exitElems = elems.exit()
          .remove()

        // keep a reference of the list of objects
      _objects = elems.merge(enterElems).merge(exitElems)
      cfg.group = _objects.nodes()

        /*
            --------------------------------------
            Mouse/Touch interactions
        */

      _objects.on('click', function (d, i, _group) {
        d._picked = true
        element.dispatch('pick', {detail: {datum: d.data, el: this, index: i, group: _group}})
      })
    }
    return build
  }
})()
