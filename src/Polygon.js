export default class Polygon {
  constructor (xCenter, yCenter, radius, numOfPoints, options) {
    this.x = xCenter
    this.y = yCenter
    this.r = radius
    this.color = options.color || 'black'
    this.lineWidth = options.lineWidth || 2
    this.lineColor = options.lineColor || 'black'
    this.startAngle = options.startAngle || 0

    const radians = []
    for (let i = 0; i < numOfPoints; i++) {
      radians.push((this.startAngle + (i / numOfPoints) * 2 * Math.PI) % (2 * Math.PI))
    }

    this.points = radians.map(radian => {
      const x = this.x + (this.r * Math.cos(radian))
      const y = this.y + (this.r * Math.sin(radian))
      return [x, y]
    })
  }

  draw (ctx, _options) {
    ctx.beginPath()
    this.points.map((point, i) => {
      return i === 0
        ? ctx.moveTo(...point)
        : ctx.lineTo(...point)
    })
    ctx.closePath()
    ctx.fillStyle = this.color
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.lineColor
    ctx.fill()
    ctx.stroke()
  }
}
