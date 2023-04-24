import React from 'react';
import {Image} from 'react-native';
import {Box, View} from 'native-base';

import {styles} from './styles';
import Logo from '~/assets/images/logo.png';
import ButtonCustom from '~/components/Button';
import Header from '~/components/Header';

function Welcome({navigation}) {
  return (
    <Box style={styles.container}>
      <Header title="Welcome" />
      <View style={styles.content}>
        <Image source={Logo} style={styles.image} />
      </View>

      <View style={styles.footer}>
        <View style={styles.buttons}>
          <ButtonCustom
            title={'Login'}
            styleText={styles.textBtn}
            style={styles.btnDefault}
            onPress={() => navigation.navigate('Login')}
          />

          <ButtonCustom
            title={'SingUp'}
            styleText={styles.textInverse}
            style={styles.btnInverse}
            onPress={() => navigation.navigate('SingUp')}
          />
        </View>
      </View>
    </Box>
  );
}

export default Welcome;
