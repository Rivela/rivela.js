/* global d3, rivela */

;(function () {
  var ns = 'heatmap'
  window.rivela[ns] = function init () {
    var utils = rivela._utils()

    var cfg = utils.defaults()
    cfg.ns = ns

    var foot = rivela._foot(cfg)
    var base = rivela._base(cfg)
    var axisx = rivela._axisx(cfg)
    var axisy = rivela._axisy(cfg)
    var title = rivela._title(cfg)

    var _objects
    var group

    function build (selection) {
      selection.each(function (data, index) {
        base(this, build, data, index)

        /*
            --------------------------------------
            Configurations
        */
        var domX = data.map(d => d.x)
        domX = domX.filter((d, i) => domX.indexOf(d) === i).sort(d3.ascending)

        var mapX = d3.scaleBand()
          .domain(domX)
          .range([0, cfg.innerw])

        var domY = data.map(d => d.y)
        domY = domY.filter((d, i) => domY.indexOf(d) === i).sort(d3.ascending)

        var mapY = d3.scaleBand()
          .domain(domY)
          .range([cfg.innerh, 0])

        var heatdata = []
        domX.forEach(x => {
          domY.forEach(y => {
            var ob = {x: x, y: y}
            var value = 0
            data.forEach(d => {
              if (d.x === x && d.y === y) {
                value += (d.value) ? d.value : 1
              }
            })
            ob.value = value
            heatdata.push(ob)
          })
        })

        var extR = d3.extent(heatdata, (d, i) => d.value)

        var mapr = d3.scaleLinear()
          .domain(extR)
          .range([0, 1])

        cfg.mapX = mapX
        cfg.mapY = mapY

        /*
            --------------------------------------
            Data binding
        */
        var elems = cfg.container
          .select('.chart')
          .selectAll('rect')
          .data(heatdata)

        /*
            --------------------------------------
            Enter phase, elements need to be created
        */
        var enterElems = elems.enter()
          .append('rect')
          .classed('cell', true)
          .attr('width', cfg.innerw / domX.length)
          .attr('height', cfg.innerh / domY.length)
          .style('opacity', 0)
          .attr('x', (d, i) => mapX(d.x))
          .attr('y', (d, i) => mapY(d.y))

        /*
            --------------------------------------
            Update phase, elements need to be updated
        */
        elems.merge(enterElems).transition()
          .duration(cfg.ctime)
          // .delay((d, i) => i * 20)
          .attr('x', (d, i) => mapX(d.x))
          .attr('y', (d, i) => mapY(d.y))
          .attr('width', cfg.innerw / domX.length)
          .attr('height', cfg.innerh / domY.length)
          .style('opacity', (d, i) => mapr(d.value))

        /*
            --------------------------------------
            Exit phase, elements need to go away
        */
        var exitElems = elems.exit()
          .transition()
          .duration(cfg.ctime / 2)
          .remove()

        axisx()
        axisy()
        title()
        foot()
      })
    }

    utils.injectInterfaces(cfg.interfaces, build, cfg)

    return build
  }
})()
