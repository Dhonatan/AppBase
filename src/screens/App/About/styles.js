import {StyleSheet} from 'react-native';
import {primaryColor} from '~/config/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  content: {
    marginTop: 25,
    paddingLeft: 5,
  },

  item: {
    backgroundColor: primaryColor,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Roboto-Bold',
    color: 'white',
  },
  text: {
    textAlign: 'justify',
  },
});
