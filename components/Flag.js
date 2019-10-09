import React from 'react';
import { asset, StyleSheet, Image, VrButton } from 'react-360';

export default class Flag extends React.Component {
  render() {
    const { flag, active } = styles;
    const { flag: flagSrc, activeFlag } = this.props;
    return (
      <Image
        style={[flag, activeFlag === flagSrc && active]}
        source={asset(flagSrc)}
      />
    );
  }
}

const styles = StyleSheet.create({
  flag: {
    height: 400,
    width: 600,
    margin: 20,
    opacity: 0.7
  },
  active: {
    opacity: 1
  }
});
