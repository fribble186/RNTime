import * as React from 'react';
import styles from '../styles';
import {save, load, remove} from '../utils/storage';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';

function Account({route, navigation}) {
  const [login, setLogin] = React.useState(false);
  const [nickname, setNickName] = React.useState();
  React.useEffect(() => {
    const onFocus = navigation.addListener('focus', () => {
      load('token')
        .then(ret => setLogin(true))
        .catch(e => {
          console.log('本地没有token', e);
          setLogin(false);
        });
      load('nickname')
        .then(ret => setNickName(ret))
        .catch(e => {
          setNickName(null);
          console.log('本地没有nickname', e);
        });
    });
    return onFocus;
  }, [navigation]);
  const logout = () => {
    Alert.alert('提示', '确定要退出登陆吗？', [
      {text: '我再想想', onPress: () => console.log('no')},
      {
        text: '确认',
        onPress: () =>
          remove('token').then(remove('nickname').then(() => setLogin(false))),
      },
    ]);
  };
  return (
    <SafeAreaView style={{...styles.flex_column, ...styles.flex_1}}>
      {login ? (
        <View
          style={{
            ...styles.flex_column,
            ...styles.padding_LR_40,
            ...styles.margin_top_30,
          }}>
          <View
            style={{
              ...styles.flex_row,
              ...styles.margin_bottom_30,
              ...styles.align_center,
            }}>
            <Image source={require('../img/avatar.png')} style={style.avatar} />
            <Text>欢迎你，</Text>
            <Text>{nickname ? nickname : '没有昵称的你'}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangeAccount')}>
            <View
              style={{
                ...styles.flex_row,
                ...styles.padding_TB_10,
                ...styles.border,
                ...styles.center,
                ...styles.main_background,
              }}>
              <Text>修改用户名和密码</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FriendList')}>
            <View
              style={{
                ...styles.flex_row,
                ...styles.padding_TB_10,
                ...styles.border,
                ...styles.center,
                ...styles.main_background,
                ...styles.margin_top_16,
              }}>
              <Text>新的好友</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => logout()}>
            <View
              style={{
                ...styles.flex_row,
                ...styles.padding_TB_10,
                ...styles.border,
                ...styles.center,
                ...styles.main_background,
                ...styles.margin_top_16,
              }}>
              <Text>退出登录</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            ...styles.flex_column,
            ...styles.flex_1,
            ...styles.center,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('loginPost')}>
            <View
              style={{
                ...styles.flex_row,
                ...styles.padding_TB_10,
                ...styles.padding_LR_40,
                ...styles.border,
                ...styles.center,
                ...styles.main_background,
              }}>
              <Text>登录</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    marginRight: 30,
  },
  separator: {
    backgroundColor: '#d0d0d0',
    height: 1,
    width: '100%',
  },
});

export default Account;
