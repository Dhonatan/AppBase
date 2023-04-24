import {StyleSheet, Platform, Dimensions} from 'react-native';
import {bgColor, primaryColor} from '~/config/colors';
import {isIphoneX} from 'react-native-iphone-x-helper';
const height = Dimensions.get('window').height;
const smallDevice = height < 610;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    width: '100%',
    backgroundColor: bgColor,
    justifyContent: 'center',
    paddingBottom: Platform.select({android: 0, ios: isIphoneX() ? 15 : 0}),
  },
  content: {
    flex: 1,
    paddingBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    maxHeight: smallDevice ? 100 : 120,
  },
  buttons: {
    zIndex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  footer: {
    width: '100%',
    marginBottom: 15,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    bottom: 0,
  },
  btnDefault: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    borderWidth: 0,
    marginBottom: 25,
    justifyContent: 'center',
    backgroundColor: primaryColor,
  },
  textBtn: {
    fontWeight: 'bold',
    color: 'white',
  },
  btnInverse: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    marginBottom: 25,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: primaryColor,
    backgroundColor: 'transparent',
  },
  textInverse: {
    fontWeight: 'bold',
    color: primaryColor,
  },
});
