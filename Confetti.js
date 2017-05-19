'use strict'
import React, { Component } from 'react'
import {
  View,
  Animated,
  TouchableOpacity,
  Text
} from 'react-native'

class Fetti extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{
        width: 10, height: 10, position:"absolute",
        opacity: this.props.opacity,
        backgroundColor: this.props.color,
        transform: [
          {rotate: this.props.rotate},
          {translateX: this.props.translateX},
          {translateY: this.props.translateY}
        ]
      }}>
      </View>
    )
  }
}

export default class Confetti extends Component {
  constructor(props) {
    super(props)
    this.fettis = []
  }

  render() {
    return (
        <View style={{position:"relative", top: 0, left: 0}}>
          {this.fettis.map((o, i) => {
            return <Fetti color={o.e.color} key={o.e.key} opacity={o.e.opacity} translateX={o.e.translateX} translateY={o.e.translateY}  rotate={o.e.rotate} />
          })}
        </View>
    )
  }

  createFettis(count) {
    return Array
      .from({length: count})
      .map((_, index) => {
        return {color: this.props.colors[index % this.props.colors.length], key: index, left: index * 10, opacity: 0, translateX: 0, translateY: 0, rotate: "0deg"}
      })
  }

  start({angle = 110, decay = 0.9, spread = 40, startVelocity = 20, elementCount = 20} = {}) {
    return new Promise((res) => {
      const el = this.createFettis(elementCount)
      this.fettis = el.map((e) => ({
        e,
        physics: this.randomPhysics(angle, spread, startVelocity)
      }))
      this.animateConfettis(decay).then(() => res())
    })
  }

  randomPhysics(angle, spread, startVelocity) {
    const radAngle = angle * (Math.PI / 180)
    const radSpread = spread * (Math.PI / 180)

    return {
      x: 0,
      y: 0,
      z: 0,
      wobble: Math.random() * 10,
      velocity: (startVelocity * 0.5) + (Math.random() * startVelocity),
      angle2D: -radAngle + ((0.5 * radSpread) - (Math.random() * radSpread)),
      angle3D: -(Math.PI / 4) + (Math.random() * (Math.PI / 2)),
      tiltAngle: Math.random() * Math.PI
    }
  }

  updateFetti(fetti, progress, decay) {
    fetti.physics.x += Math.cos(fetti.physics.angle2D) * fetti.physics.velocity;
    fetti.physics.y += Math.sin(fetti.physics.angle2D) * fetti.physics.velocity;
    fetti.physics.wobble += 0.1;
    fetti.physics.y += 3;
    fetti.physics.velocity *= decay;
    fetti.physics.tiltAngle += 0.1;

    fetti.e.translateX = fetti.physics.x + (10 * Math.cos(fetti.physics.wobble));
    fetti.e.translateY = fetti.physics.y + (10 * Math.sin(fetti.physics.wobble));

    fetti.e.rotate = fetti.physics.tiltAngle + "deg";

    fetti.e.opacity = (1 - progress) - 0.1;

    return fetti
  }

  animateConfettis(decay) {
    return new Promise((res) => {
      const totalTicks = 100;
      let tick = 0;

      const update = () => {
            this.fettis.forEach((fetti, i) => {
              this.fettis[i] = this.updateFetti(fetti, tick / totalTicks, decay)
            });

            tick += 1;
            if (tick < totalTicks) {
              requestAnimationFrame(update);
              this.forceUpdate()
            } else {
              res()
            }
          }

      requestAnimationFrame(update);
      this.forceUpdate()
    })
  }

}
