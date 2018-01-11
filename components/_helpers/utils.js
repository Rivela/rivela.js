;(function () {
  var ns = '_utils'
  window.rivela[ns] = function init () {
    var ob = {
      getAccessor: function (d, i, a) {
        if (typeof a === 'function') {
          return a(d, i)
        } else {
          return a
        }
      },

      defaults: function () {
        return {
          interfaces: [
            'width',
            'height',
            'padding',
            'margin',
            'labels',
            'rotateLabels'
          ],
          width: 200,
          height: 200,
          padding: {top: 4, bottom: 4, left: 4, right: 4},
          margin: {top: 20, bottom: 20, left: 20, right: 20},
          labels: {x: '', y: '', title: ''},
          otime: 500,
          ctime: 500,
          rotateLabels: {x: false, y: false}
        }
      },

      setProps: function (obj, options) {
        for (var k in options) {
          if (obj.hasOwnProperty(k)) {
            obj[k] = options[k]
          }
        }
      },

      injectInterfaces: function (interfaces, build, cfg) {
        interfaces.push('interfaces')
        interfaces.forEach(d => {
          build[d] = function (value) {
            if (!arguments.length) return cfg[d]
            if (typeof cfg[d] === 'object' && typeof value === 'object') {
              ob.setProps(cfg[d], value)
            } else {
              cfg[d] = value
            }
            return build
          }
        })
        build.immediately = function () {
          cfg.ctime = 0
          return build
        }
      }
    }
    return ob
  }
})()

/*

  var calcFit = function (element) {
    var ratio = element.attr('ratio')
    var factor = (ratio) ? (ratio.split(' ')[1] / ratio.split(' ')[0]) : 1
    var computedW = parseInt(window.getComputedStyle(element.node()).width.split('px')[0])
    var attrH = element.attr('height')
    var calcH = (attrH) || parseInt(computedW * factor)
    element.attr('viewBox', `0 0 ${parseInt(computedW)} ${parseInt(calcH)}`)
    return {width: computedW, height: calcH}
  }
*/
