import React, {useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import {View} from 'native-base';

import Request from '~/tools/Request';
import {logout} from '~/store/user/actions';
import {styles} from './styles';

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const [token, setToken] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      let userToken;

      try {
        userToken = await Request.getToken();
      } catch (e) {}

      setToken(userToken);
    };

    loadToken();
  }, []);

  function handleLogout() {
    dispatch(logout({token}));
    props?.navigation?.toggleDrawer();
  }

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.container}
      {...props}>
      <DrawerItemList {...props} />

      <View style={styles.content}>
        <DrawerItem
          label="SAIR"
          labelStyle={styles.label}
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
