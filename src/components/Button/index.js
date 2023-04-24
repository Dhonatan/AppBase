import React from 'react';
import {Keyboard} from 'react-native';
import {Box, View, Spinner, Button as ButtonBase} from 'native-base';
import {RectButton} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import {styles} from './styles';
import {textColor} from '~/config/colors';
import Text from '~/components/Text';
import DefaultIcon from 'react-native-vector-icons/FontAwesome';

function ButtonCustom({
  title,
  onPress,
  loading,
  disabled,
  uppercase,
  style,
  styleText,
  iconStyle,
  iconLeft,
  iconRight,
  loadingSize,
  colorSpinner,
  withRectButton,
  customIcon,
}) {
  const isDisabled = disabled || loading;
  const Button = withRectButton ? RectButton : ButtonBase;
  const Icon = customIcon || DefaultIcon;

  function onPressButton() {
    if (!disabled && !loading) {
      Keyboard.dismiss();
      if (onPress) {
        onPress();
      }
    }
  }

  return (
    <Box style={styles.box}>
      {!loading && !!iconLeft && (
        <Icon style={{...styles.iconLeft, ...iconStyle}} name={iconLeft} />
      )}

      <Button
        iconRight={!!iconRight}
        iconLeft={!!iconLeft}
        disabled={isDisabled}
        onPress={onPressButton}
        style={{...styles.button(disabled), ...style}}>
        {!loading && (
          <Text
            uppercase={uppercase}
            style={{...styles.text(disabled), ...styleText}}>
            {title}
          </Text>
        )}

        {loading && (
          <View style={styles.content}>
            <Spinner
              size={loadingSize}
              color={colorSpinner}
              style={styles.center}
            />
          </View>
        )}
      </Button>
      {!loading && !!iconRight && (
        <Icon style={{...styles.iconRight, ...iconStyle}} name={iconRight} />
      )}
    </Box>
  );
}

ButtonCustom.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  uppercase: PropTypes.bool,
  style: PropTypes.object,
  styleText: PropTypes.object,
  iconStyle: PropTypes.object,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  colorSpinner: PropTypes.string,
  withRectButton: PropTypes.bool,
  loadingSize: PropTypes.number,
  customIcon: PropTypes.any,
};

ButtonCustom.defaultProps = {
  loading: false,
  disabled: false,
  uppercase: false,
  style: {},
  styleText: {},
  iconStyle: {},
  iconLeft: null,
  iconRight: null,
  customIcon: null,
  colorSpinner: textColor,
  withRectButton: false,
  loadingSize: 38,
};

export default ButtonCustom;
