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
  }

  componentDidMount () {
    this.setState({ ctx: this.ref.current.getContext('2d') }, () => {
      this.state.ctx.fillStyle = 'black'
      this.state.ctx.fillRect(0, 0, this.state.w, this.state.h)
      this.drawPolygon()
      setInterval(() => console.log(this.state.count), 1000)
      // setInterval(() => {
      //   const x = Math.random() * this.state.w
      //   const y = Math.random() * this.state.h
      //   const r = Math.random() * this.state.w / 4
      //   const points = Math.floor(Math.random() * 7) + 3
      //   const polygon = new Polygon(x, y, r, points, { lineColor: 'white', color: scale(Math.random()), startAngle: Math.random() * 2 * Math.PI })
      //   console.log(polygon)
      //   this.state.ctx.fillStyle = 'rgba(0, 0, 0, 2%)'
      //   this.state.ctx.fillRect(0, 0, this.state.w, this.state.h)
      //   polygon.draw(this.state.ctx)
      // }, 10)
    })
  }

  drawPolygon = () => {
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
