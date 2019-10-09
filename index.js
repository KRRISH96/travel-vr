import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  VrButton,
  View,
  Environment,
  NativeModules,
  Prefetch,
  asset
} from 'react-360';
import Flag from './components/Flag';
import Pikachu from './components/Pikachu';

const PLACES = [
  { name: 'Spain', flag: 'flag_spain.png', panorama: 'spain.jpg' },
  { name: 'Italy', flag: 'flag_italy.png', panorama: 'italy.jpg' },
  { name: 'Space', flag: 'flag_nasa.png', panorama: 'stars.png' },
  { name: 'Ukraine', flag: 'flag_ukraine.jpg', panorama: 'ukraine.jpg' }
];

const { TitleChanger } = NativeModules;

export default class TravelVr extends React.Component {
  state = {
    activeFlag: ''
  };

  setActiveFlag = image => {
    this.setState({
      activeFlag: image
    });
  };

  changeBackground = (panorama, name) => {
    Environment.setBackgroundImage(asset(panorama));
    TitleChanger.changeTitle('Welcome to ' + name);
  };

  renderFlags = () =>
    PLACES.map(({ name, flag, panorama }) => (
      <React.Fragment key={flag}>
        <Prefetch source={asset(panorama)} />
        <VrButton
          onClick={() => this.changeBackground(panorama, name)}
          onEnter={() => this.setActiveFlag(flag)}
          onExit={() => this.setActiveFlag('')}
        >
          <Flag flag={flag} activeFlag={this.state.activeFlag} />
        </VrButton>
      </React.Fragment>
    ));
  render() {
    return <View style={styles.panel}>{this.renderFlags()}</View>;
  }
}

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 4680,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

AppRegistry.registerComponent('TravelVr', () => TravelVr);
AppRegistry.registerComponent('Flag', () => Flag);
AppRegistry.registerComponent('Pikachu', () => Pikachu);
