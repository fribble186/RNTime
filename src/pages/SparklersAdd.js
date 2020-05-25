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
import {add_friend} from '../common/user';
import {save, load, remove} from '../utils/storage';

function SparklersAdd({navigation}) {
  const [value, onChangeText] = React.useState();
  const add = async () => {
    let add_friend_response = await add_friend(value);
    let add_friend_responseJson = await add_friend_response.json();
    console.log(add_friend_responseJson.result);
    if (add_friend_responseJson.result.indexOf('success') > -1) {
      Alert.alert('提示', '添加成功,等待对方同意');
      navigation.goBack();
    } else if (add_friend_responseJson.result.indexOf('self') > -1) {
      Alert.alert('提示', '自己本身就是自己的好朋友');
    } else if (add_friend_responseJson.result.indexOf('wrong') > -1) {
      Alert.alert('提示', '没有这个昵称的用户呢');
    }
  };
  React.useEffect(() => {
    const onFocus = navigation.addListener('focus', async () => {
      console.log('SparklersAdd');
      load('nickname')
        .then(ret => console.log(ret))
        .catch(e =>
          Alert.alert('提示', '设置好昵称才能加好友噢', [
            {
              text: '确认',
              onPress: () => navigation.goBack(),
            },
          ]),
        );
    });
    return onFocus;
  }, [navigation]);
  return (
    <SafeAreaView style={{...styles.flex_column, ...styles.flex_1}}>
      <View style={[styles.flex_column]}>
        <TextInput
          placeholder="通过用户昵称搜索添加朋友"
          style={[style.input]}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
        <TouchableOpacity
          style={[style.send_button, styles.flex_column, styles.center]}
          onPress={() => add()}>
          <View>
            <Text>Add Buddy</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  input: {
    marginTop: 50,
    height: 60,
    backgroundColor: 'white',
    margin: 30,
    borderRadius: 100,
    textAlign: 'center',
  },
  send_button: {
    height: 50,
    backgroundColor: '#FFD954',
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 100,
  },
});

export default SparklersAdd;
