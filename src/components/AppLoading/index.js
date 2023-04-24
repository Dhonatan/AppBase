import React from 'react';
import {Spinner, View} from 'native-base';
import {styles} from './styles';

function AppLoading() {
  return (
    <View style={styles.loading}>
      <Spinner size={40} />
    </View>
  );
}

export default AppLoading;
