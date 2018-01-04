;(function () {
  var version = '0.0.0'

  document.addEventListener('DOMContentLoaded', function () {
    d3.select(window).on('resize', () => {
      console.log('resize')
      d3.selectAll('[ratio]').each(function () {
        var ratio = d3.select(this).attr('ratio')
        var factor = (ratio) ? (ratio.split(' ')[1] / ratio.split(' ')[0]) : 1
        var computedW = parseInt(window.getComputedStyle(this).width.split('px')[0])
        var attrH = d3.select(this).attr('height')
        var calcH = (attrH) || parseInt(computedW * factor)
        if (this.__generator) {
          d3.select(this)
            .attr('viewBox', `0 0 ${parseInt(computedW)} ${parseInt(calcH)}`)
            .call(this.__generator.width(computedW).height(calcH))
        }
      })
    }).dispatch('resize')
  })

  if (!window.rivela) window.rivela = {version: version}
})()
