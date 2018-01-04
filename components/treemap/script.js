/* global d3, rivela */

;(function () {
  var ns = 'treemap'
  window.rivela[ns] = function init () {
    var utils = rivela._utils()
    var uga = utils.getAccessor

    var cfg = utils.defaults()
    cfg.ns = ns

    var foot = rivela._foot(cfg)
    var base = rivela._base(cfg)
    var title = rivela._title(cfg)

    var _objects
    var group

    cfg.value = d => d
    cfg.sort = undefined
    cfg.colors = null
    cfg.pad = 1

    cfg.interfaces.push(
      'value',
      'sort',
      'colors',
      'pad'
    )

    function build (selection) {
      selection.each(function (data, index) {
        base(this, build, data, index)

        var structure = d3.hierarchy({root: 'root', children: data})
                            .sort(cfg.sort)
                            .sum((d, i) => uga(d, i, cfg.value))

        var tree = d3.treemap()
            .size([cfg.innerw, cfg.innerh])
            .padding(cfg.pad)

        var nodes = tree(structure)

        var elems = cfg.container
          .select('.chart')
          .selectAll('g')
          .data(nodes.children)

        var enterElems = elems.enter()
          .append('g')

        enterElems.append('rect')
          .attr('x', d => d.x0)
          .attr('y', d => d.y0)
          .classed('sector', true)

        elems.merge(enterElems)
          .select('rect')
          .transition()
          .duration(cfg.ctime)
          .attr('x', d => d.x0)
          .attr('y', d => d.y0)
          .attr('width', d => d.x1 - d.x0)
          .attr('height', d => d.y1 - d.y0)
          .style('fill', cfg.colors)

        title()
        foot()
      })
    }

    utils.injectInterfaces(cfg.interfaces, build, cfg)

    return build
  }
})()
