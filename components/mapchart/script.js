;(function () {
  var ns = 'mapchart'
  window.rivela[ns] = function init () {
    var utils = rivela._utils()

    var cfg = utils.defaults()
    cfg.ns = ns

    var foot = rivela._foot(cfg)
    var base = rivela._base(cfg)
    var title = rivela._title(cfg)

    var _objects
    var group

    cfg.colors = null

    cfg.interfaces.push(
        'colors'
    )

    function build (selection) {
      selection.each(function (data, index) {
        base(this, build, data, index)

        /*
            --------------------------------------
            Configurations
        */
        var projection = d3.geoMercator()
                            .scale((cfg.innerw + 1) / 2 / Math.PI)
                            .translate([cfg.innerw / 2, cfg.innerh / 2])

        var genPath = d3.geoPath()
                    .projection(projection)

        /*
            --------------------------------------
            Data binding
        */
        var elems = cfg.container
            .select('.chart')
            .selectAll('path')
            .data(data) // needs to be a geo.json feature array

        /*
            --------------------------------------
            Enter phase, elements need to be created
        */
        var enterElems = elems.enter()
            .append('path')
            .classed('area', true)

        /*
            --------------------------------------
            Update phase, elements need to be updated
        */
        elems.merge(enterElems)
            .attr('d', genPath)
            .transition()
            .duration(cfg.otime)
            .style('fill', cfg.colors)

        /*
            --------------------------------------
            Exit phase, elements need to go away
        */
        var exitElems = elems.exit()
            .remove()

        // keep a reference of the list of objects
        _objects = elems.merge(enterElems).merge(exitElems)
        group = _objects.nodes()

        /*
            --------------------------------------
            Mouse/Touch interactions
        */

        _objects.on('click', function (d, i, _group) {
          element.dispatch('pick', {detail: {datum: d, el: this, index: i, group: _group}})
        })

        title()
        foot()
      })
    }

    utils.injectInterfaces(cfg.interfaces, build, cfg)

    return build
  }
})()
