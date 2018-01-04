;(function () {
  var ns = 'circlepack' // namespace
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
    cfg.pad = 0

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

        var pack = d3.pack()
            .size([cfg.innerw, cfg.innerh])
            .padding(cfg.pad)

        var nodes = pack(structure)

        var elems = cfg.container
          .select('.chart')
          .selectAll('g')
          .data(nodes.children)

        var enterElems = elems.enter()
          .append('g')

        enterElems.append('circle')
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y)
          .attr('r', 0)

        elems.merge(enterElems)
          .select('circle')
          .transition()
          .duration(cfg.ctime)
          .ease(d3.easeCubicInOut)
          .attr('cx', (d, i) => d.x)
          .attr('cy', (d, i) => d.y)
          .attr('r', (d, i) => d.r)
          .style('fill', cfg.colors)

        title()

        foot()
      })
    }

    utils.injectInterfaces(cfg.interfaces, build, cfg)

    return build
  }
})()
