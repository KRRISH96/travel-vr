import React from 'react';
import { Animated, asset, View, StyleSheet } from 'react-360';
import Entity from 'Entity';
import AmbientLight from 'AmbientLight';
import PointLight from 'PointLight';

const AnimatedEntity = Animated.createAnimatedComponent(Entity);
const LOW_JUMP_VALUE = 0;
const TOP_JUMP_VALUE = 0.25;

export default class Pikachu extends React.Component {
  rotation = new Animated.Value(360);
  jumpValue = new Animated.Value(LOW_JUMP_VALUE);

  spin = () => {
    this.rotation.setValue(360);
    Animated.timing(this.rotation, {
      toValue: 0,
      duration: 3000
    }).start(() => this.spin());
  };

  jump = currentValue => {
    let nextValue =
      currentValue === TOP_JUMP_VALUE ? LOW_JUMP_VALUE : TOP_JUMP_VALUE;
    Animated.timing(this.jumpValue, {
      toValue: nextValue,
      duration: 500
    }).start(() => this.jump(nextValue));
  };

  componentDidMount() {
    this.spin();
    this.jump(LOW_JUMP_VALUE);
  }
  render() {
    return (
      <View>
        <AmbientLight intensity={1} color={'#fff'} />
        <PointLight
          intensity={1}
          color={'#fff'}
          style={{ transform: [{ translate: [0, 1, 5] }] }}
        />
        <AnimatedEntity
          source={{ gltf2: asset('model.gltf') }}
          style={{
            transform: [
              { translateY: this.jumpValue },
              { rotateX: this.rotation },
              { scale: 0.5 }
            ]
          }}
        />
      </View>
    );
  }
}
