/* global d3, rivela */

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

    var _objects

    cfg.key = (d, i) => i
    cfg.value = d => d
    cfg.sort = null
    cfg.colors = null
    cfg.radius = {inner: 0, labels: 0}
    cfg.angles = {start: 0, end: Math.PI * 2, pad: 0}

    cfg.interfaces.push(
      'key',
      'value',
      'radius',
      'colors',
      'sort',
      'angles'
    )

    function build (selection) {
      selection.each(function (data, index) {
        base(this, build, data, index)

        cfg.container.select('.chart')
            .attr('transform', `translate(${cfg.innerw / 2 + (cfg.padding.left)},${cfg.innerh / 2 + (cfg.padding.top)})`)

        var minDim = Math.min(cfg.innerw, cfg.innerh)
        var radius_outer = minDim / 2
        var radius_inner = radius_outer * cfg.radius.inner
        var radius_labels = radius_outer + radius_outer * cfg.radius.labels
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
          .innerRadius((d, i) => uga(d.data, i, radius_inner))
          .outerRadius((d, i) => uga(d.data, i, radius_outer))

        var labelArc = d3.arc()
          .innerRadius((d, i) => uga(d.data, i, radius_inner))
          .outerRadius(radius_labels)

        var piedata = pie(data)

        // cfg.eContainer.append('g').classed('chart', true)

        /*
            --------------------------------------
            Data binding
        */
        var elems = cfg.container
          .select('.chart')
          .selectAll('.slice')
          .data(piedata)

        /*
            --------------------------------------
            Enter phase, elements need to be created
        */
        var enterElems = elems.enter()
          .append('g')
          .classed('slice', true)

        enterElems.append('path')
          .classed('arc', true)
          .each(function (d) {
            this._startAngle = d.startAngle
            this._endAngle = d.endAngle
          })

        enterElems.append('text')
          .classed('label', true)

        /*
            --------------------------------------
            Update phase, elements need to be updated
        */
        elems.merge(enterElems)
          .select('path')
          .transition()
          .duration(cfg.ctime)
          .ease(d3.easeCubicInOut)
          .attrTween('d', function (d) {
            const i1 = d3.interpolate(this._startAngle, d.startAngle)
            const i2 = d3.interpolate(this._endAngle, d.endAngle)
            this._startAngle = d.startAngle
            this._endAngle = d.endAngle
            return t => {
              d.startAngle = i1(t)
              d.endAngle = i2(t)
              return arc(d)
            }
          })
          .style('fill', cfg.colors)

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

        /*
            --------------------------------------
            Exit phase, elements need to go away
        */
        var exitElems = elems.exit()
          .remove()

        // exitElems.select('path')
        //     .transition()
        //     .duration(ctime / 2)
        //     .ease(d3.easeExpInOut)
        //     .style('opacity', 0)
        //     .remove()

        // exitElems.select('text')
        //     .remove()

        // keep a reference of the list of objects
        _objects = elems.merge(enterElems).merge(exitElems)
        cfg.group = _objects.nodes()

        /*
            --------------------------------------
            Mouse/Touch interactions
        */

        _objects.on('click', function (d, i, _group) {
          d._picked = true
          cfg.element.dispatch('pick', {detail: {datum: d, el: this, index: i, group: _group}})
        })

        title()
        foot()
      })
    }

    /*
        --------------------------------------
        Private functions
    */

    function getKey (d, i) {
      return utils.getAccessor(d.data, i, cfg.key)
    }

    function getValue (d, i) {
      var dd = (d.data) ? d.data : d
      return utils.getAccessor(dd, i, cfg.value)
    }

    utils.injectInterfaces(cfg.interfaces, build, cfg)

    return build
  }
})()
