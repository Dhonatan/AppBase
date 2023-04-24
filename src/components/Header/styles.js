import {StyleSheet} from 'react-native';
import {primaryColor} from '~/config/colors';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 19,
    color: primaryColor,
  },
  icon: {
    fontSize: 30,
    color: primaryColor,
  },
  noIcon: {
    fontSize: 30,
    color: 'transparent',
    backgroundColor: 'transparent',
  },
});
