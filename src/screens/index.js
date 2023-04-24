import React from 'react';
import {View} from 'react-native';

import Routes from './routes';
import defaultStyles from '../template/styles';

function Main() {
  return (
    <View style={defaultStyles.root}>
      <Routes />
    </View>
  );
}

export default Main;
