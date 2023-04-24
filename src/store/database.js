import AsyncStorage from '@react-native-community/async-storage';

export const getData = async key => {
  try {
    const db = await AsyncStorage.getItem(key);
    return JSON.parse(db);
  } catch (e) {
    return null;
  }
};

export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    return null;
  }
};
