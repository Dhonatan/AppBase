import React from 'react';
import {Text} from 'native-base';
import {styles} from './styles';

export default props => (
  <Text {...props} style={[styles.text, props.style]}>
    {props.children}
  </Text>
);
