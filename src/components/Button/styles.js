import {primaryColor, disabledColor} from '~/config/colors';
import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');
const smallDevice = height < 610;

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  button: disabled => ({
    height: 55,
    width: '100%',
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderColor: disabled ? disabledColor : primaryColor,
  }),
  box: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconLeft: {
    left: 20,
    bottom: 20,
    fontSize: 22,
    color: 'white',
    zIndex: 2,
    position: 'absolute',
  },
  iconRight: {
    right: 20,
    bottom: 20,
    fontSize: 22,
    color: 'white',
    position: 'absolute',
  },
  text: disabled => ({
    fontSize: smallDevice ? 13 : 16,
    textAlign: 'center',
    color: disabled ? disabledColor : primaryColor,
  }),
  center: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
