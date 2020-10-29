import React from 'react'
import Polygon from './Polygon'
import chroma from 'chroma-js'

const scale = chroma.scale([
  '8C00FC',
  '3500FF',
  '01FE01',
  'FFFE37',
  'FF8600',
  'ED0003'
]).mode('lab')

export default class Canvas extends React.Component {
  constructor (props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      polygons: [],
      w: 750,
      h: 750,
      count: 0
    }
    for (let i =0; i< 5; i++) {
      this.state.polygons.push(this.createRandPolygon())
    }
  }

  componentDidMount () {
    this.setState({ ctx: this.ref.current.getContext('2d') }, () => {
      this.state.ctx.fillStyle = 'black'
      this.state.ctx.fillRect(0, 0, this.state.w, this.state.h)
      this.animationLoop()
      // this.state.polygons.map(polygon => polygon.draw(this.state.ctx))
      // setInterval(() => {
      //   this.state.ctx.fillStyle = 'black'
      //   this.state.ctx.fillRect(0, 0, this.state.w, this.state.h)
      //   this.state.polygons.map(polygon => {
      //     polygon.move(0, 0, (Math.PI / 20))
      //     polygon.draw(this.state.ctx)
      //   })

      // }, 1000)
    })
  }

  animationLoop = () => {
    this.state.ctx.fillStyle = 'rgba(0, 0, 0, 50%)'
    this.state.ctx.fillRect(0, 0, this.state.w, this.state.h)
    this.state.polygons.map(polygon => {
      polygon.move(0, 0)
      polygon.draw(this.state.ctx)
    })
    requestAnimationFrame(this.animationLoop)
  }

  createRandPolygon = () => {
    const x = Math.random() * this.state.w
    const y = Math.random() * this.state.h
    const r = Math.random() * this.state.w / 4
    const points = Math.floor(Math.random() * 6) + 3
    const rot = (Math.random() - 0.5) * (Math.PI / 12)
    return new Polygon(x, y, r, points, rot, { lineColor: 'white', color: scale(Math.random()), startAngle: Math.random() * 2 * Math.PI })
  }

  drawRandPolygon = () => {
    const x = Math.random() * this.state.w
    const y = Math.random() * this.state.h
    const r = Math.random() * this.state.w / 4
    const points = Math.floor(Math.random() * 6) + 3
    const polygon = new Polygon(x, y, r, points, { lineColor: 'white', color: scale(Math.random()), startAngle: Math.random() * 2 * Math.PI })
    // console.log(polygon)
    this.state.ctx.fillStyle = 'rgba(0, 0, 0, 5%)'
    this.state.ctx.fillRect(0, 0, this.state.w, this.state.h)
    polygon.draw(this.state.ctx)
    this.setState({ count: this.state.count + 1 })
    requestAnimationFrame(this.drawPolygon)
  }

  render () {
    return (
      <canvas height={750} width={750} ref={this.ref} />
    )
  }
}
