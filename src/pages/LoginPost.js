import * as React from 'react';
import styles from '../styles';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {login, get_sms} from '../common/user';
import {save, load, remove} from '../utils/storage';

function LoginPost({navigation}) {
  const [type, onChangeType] = React.useState('nick');
  const [nick_or_phone, onChangeInput1] = React.useState('');
  const [pass_or_verify, onChangeInput2] = React.useState('');
  const [counter, setCounter] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);
  const sendVerify = async () => {
    if (counter > 0) return;
    await get_sms(nick_or_phone);
    setCounter(60);
  };
  const handleLogin = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    let request;
    if (type !== 'nick') {
      request = {
        phone: nick_or_phone,
        verify: pass_or_verify,
      };
    } else {
      request = {
        nick_name: nick_or_phone,
        password: pass_or_verify,
      };
    }
    let response = await login(request);
    let responseJson = await response.json();
    if (responseJson.result === 'failure') {
      Alert.alert('提示', '登录注册失败');
      setLoading(false);
      return;
    }
    console.log('login data', responseJson);
    if (responseJson.token) {
      await save('token', responseJson.token);
    }
    if (responseJson.nickname) {
      await save('nickname', responseJson.nickname);
    }
    setLoading(false);
    navigation.goBack();
  };
  React.useEffect(() => {
    const onFocus = navigation.addListener('focus', async () => {
      console.log('LoginPost focus');
    });
    return onFocus;
  }, [navigation]);
  return (
    <SafeAreaView style={{...styles.flex_column, ...styles.flex_1}}>
      {type === 'nick' ? (
        <View
          style={{
            ...styles.flex_column,
            ...styles.padding_LR_40,
            ...styles.align_center,
          }}>
          <View style={[styles.flex_column, styles.align_center]}>
            <Text style={[styles.bold, styles.margin_top_30, {fontSize: 20}]}>
              光阴账号登录
            </Text>
            <Text style={[styles.gray, styles.margin_top_16]}>
              新用户请用手机验证码登录
            </Text>
          </View>
          <View
            style={{
              ...styles.flex_row,
              ...styles.align_center,
              ...styles.margin_bottom_30,
              ...styles.margin_top_30,
            }}>
            <TextInput
              style={{...style.input, ...styles.flex_1}}
              onChangeText={text => onChangeInput1(text)}
              value={nick_or_phone}
              placeholder="用户名"
            />
          </View>
          <View style={{...styles.flex_row, ...styles.align_center}}>
            <TextInput
              style={{...style.input, ...styles.flex_1}}
              onChangeText={text => onChangeInput2(text)}
              value={pass_or_verify}
              secureTextEntry={true}
              placeholder="密码"
            />
          </View>
          <TouchableOpacity
            style={[
              style.login,
              styles.flex_column,
              styles.center,
              styles.margin_top_30,
            ]}
            onPress={() => handleLogin()}>
            <View style={[styles.flex_row]}>
              <Text>LOGIN</Text>
              {loading ? (
                <ActivityIndicator
                  style={styles.margin_left_16}
                  size="small"
                  color="#d0d0d0"
                />
              ) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.flex_row, ...styles.margin_top_16}}
            onPress={() => onChangeType('phone')}>
            <Text>使用手机号快捷登录</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            ...styles.flex_column,
            ...styles.padding_LR_40,
            ...styles.align_center,
          }}>
          <View style={[styles.flex_column, styles.align_center]}>
            <Text style={[styles.bold, styles.margin_top_30, {fontSize: 20}]}>
              手机号登录
            </Text>
            <Text style={[styles.gray, styles.margin_top_16]}>
              新用户请用手机验证码登录
            </Text>
          </View>
          <View
            style={{
              ...styles.flex_row,
              ...styles.align_center,
              ...styles.margin_bottom_30,
              ...styles.margin_top_30,
            }}>
            <TextInput
              style={{...styles.flex_1, ...style.input}}
              onChangeText={text => onChangeInput1(text)}
              value={nick_or_phone}
              placeholder="手机号"
            />
          </View>
          <View style={{...styles.flex_row, ...styles.align_center}}>
            <TextInput
              style={{...style.verify_input}}
              onChangeText={text => onChangeInput2(text)}
              value={pass_or_verify}
              secureTextEntry={true}
              placeholder="验证码"
            />
            <View style={styles.flex_1} />
            <TouchableOpacity
              style={{
                ...styles.flex_row,
                ...styles.align_center,
              }}
              onPress={() => sendVerify()}>
              {counter > 0 ? (
                <Text style={styles.margin_right_16}>{counter}秒</Text>
              ) : (
                <Text style={styles.margin_right_16}>发送验证码</Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              style.login,
              styles.flex_row,
              styles.center,
              styles.margin_top_30,
            ]}
            onPress={() => handleLogin()}>
            <View style={[styles.flex_row]}>
              <Text>LOGIN/REGISTER</Text>
              {loading ? (
                <ActivityIndicator
                  style={styles.margin_left_16}
                  size="small"
                  color="#d0d0d0"
                />
              ) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.flex_row, ...styles.margin_top_16}}
            onPress={() => onChangeType('nick')}>
            <Text>使用账号密码</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  light: {
    width: 150,
    height: 150,
  },
  login: {
    width: 280,
    height: 35,
    borderRadius: 50,
    backgroundColor: '#FFD954',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#d0d0d0',
    height: 40,
    fontSize: 15,
    padding: 0,
    paddingRight: 10,
    paddingLeft: 10,
  },
  verify_input: {
    borderBottomWidth: 1,
    borderBottomColor: '#d0d0d0',
    height: 40,
    fontSize: 15,
    padding: 0,
    width: 160,
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export default LoginPost;
