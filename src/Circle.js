export default class Circle {
  constructor (x, y, radius, options) {
    this.x = x // x center of circle
    this.y = y // y center of circle
    this.r = radius

    this.vX = options.vx || 0
    this.vY = options.vy || 0
    this.gravity = 0.1

    this.color = options.color || 'black'
    this.lineWidth = options.lineWidth || 1
    this.lineColor = options.lineColor || 'black'
    this.startAngle = options.startAngle || 0
  }

  draw (ctx, _options) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.lineColor
    ctx.fill()
    ctx.stroke()
  }

  move () {
    this.vY += this.gravity
    this.x += this.vX
    this.y += this.vY
  }
}
