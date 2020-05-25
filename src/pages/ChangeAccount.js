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
} from 'react-native';
import {change_account} from '../common/user';
import {save, load, remove} from '../utils/storage';

function ChangeAccount({navigation}) {
  const [name, onChangeName] = React.useState();
  const [pw, onChangePW] = React.useState();
  const confirm = async () => {
    if (pw.length < 6) {
      Alert.alert('提示', '密码小于6位');
      return;
    } else if (pw.indexOf(' ') > -1) {
      Alert.alert('提示', '别调皮输入空格');
    } else if (name.length > 20) {
      Alert.alert('提示', '昵称长度不能超过20');
    } else if (pw.length > 20) {
      Alert.alert('提示', '密码长度不能超过20');
    } else {
      await change_account(name, pw);
      Alert.alert('提示', '修改成功');
      await save('nickname', name);
      navigation.goBack();
    }
  };
  return (
    <SafeAreaView style={{...styles.flex_column, ...styles.flex_1}}>
      <View style={[styles.flex_column]}>
        <TextInput
          placeholder="用户名"
          style={[style.input, styles.margin_top_30]}
          onChangeText={text => onChangeName(text)}
          value={name}
        />
        <TextInput
          placeholder="密码（输入大于6位的字符）"
          style={[style.input, styles.margin_top_16, styles.margin_bottom_30]}
          onChangeText={text => onChangePW(text)}
          secureTextEntry={true}
          value={pw}
        />
        <TouchableOpacity
          style={[style.send_button, styles.flex_column, styles.center]}
          onPress={() => confirm()}>
          <View>
            <Text>Confirm</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 100,
    textAlign: 'center',
    backgroundColor: 'white',
    marginLeft: 30,
    marginRight: 30,
  },
  send_button: {
    height: 50,
    borderRadius: 100,
    backgroundColor: '#FFD954',
    marginRight: 30,
    marginLeft: 30,
  },
});

export default ChangeAccount;
