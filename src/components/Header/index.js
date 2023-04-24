import React from 'react';
import {TouchableOpacity} from 'react-native';
import {withNavigation} from '@react-navigation/compat';
import {HStack} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import {styles} from './styles';
import Text from '~/components/Text';

function Header({
  title,
  goBack,
  style,
  styleIcon,
  styleTitle,
  iconLeft,
  iconRight,
  goBackAction,
  menu,
  navigation,
}) {
  return (
    <HStack
      py="1"
      justifyContent="space-between"
      alignItems="center"
      style={style}>
      <HStack>
        {goBack && !goBackAction && (
          <TouchableOpacity
            style={styles.btnIos}
            onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" style={{...styles.icon, ...styleIcon}} />
          </TouchableOpacity>
        )}

        {goBack && goBackAction && (
          <TouchableOpacity style={styles.btnIos} onPress={goBackAction}>
            <Icon name="arrowleft" style={{...styles.icon, ...styleIcon}} />
          </TouchableOpacity>
        )}

        {!!(!goBack && iconLeft) && iconLeft}

        {menu && (
          <TouchableOpacity
            style={styles.btnIos}
            onPress={() => navigation?.openDrawer()}>
            <Icon name="menuunfold" style={{...styles.icon, ...styleIcon}} />
          </TouchableOpacity>
        )}
      </HStack>

      <HStack>
        {!!title && (
          <Text style={{...styles.title, ...styleTitle}}>{title}</Text>
        )}
      </HStack>

      <HStack>
        {!!iconRight && iconRight}
        {!iconRight && <Icon name="arrowleft" style={styles.noIcon} />}
      </HStack>
    </HStack>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  goBack: PropTypes.bool,
  style: PropTypes.object,
  styleIcon: PropTypes.object,
  styleTitle: PropTypes.object,
  iconRight: PropTypes.node,
  goBackAction: PropTypes.func,
  menu: PropTypes.bool,
};

Header.defaultProps = {
  title: '',
  goBack: false,
  style: {},
  styleIcon: {},
  styleTitle: {},
  iconRight: null,
  goBackAction: null,
  menu: true,
};

export default withNavigation(Header);
