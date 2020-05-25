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
  FlatList,
  Alert,
} from 'react-native';
import {add_friend, get_strangers} from '../common/user';

function FriendList({navigation}) {
  const [stranger_list, onStrangerList] = React.useState();
  const add = async nickname => {
    let add_friend_response = await add_friend(nickname);
    let add_friend_responseJson = await add_friend_response.json();
    if (add_friend_responseJson.result.indexOf('success') > -1) {
      Alert.alert('提示', '添加成功');
      navigation.goBack();
    }
  };
  React.useEffect(() => {
    const onFocus = navigation.addListener('focus', async () => {
      console.log('SparklersAdd');
      let get_strangers_response = await get_strangers();
      let get_strangers_responseJson = await get_strangers_response.json();
      console.log(get_strangers_responseJson.data);
      let data = get_strangers_responseJson.data;
      for (let item of data) {
        item.key = item.user_detail.id;
      }
      onStrangerList(data);
    });
    return onFocus;
  }, [navigation]);
  return (
    <SafeAreaView style={{...styles.flex_column, ...styles.flex_1}}>
      <FlatList
        ItemSeparatorComponent={({highlighted}) => (
          <View style={[style.separator, {marginLeft: 80}]} />
        )}
        data={stranger_list}
        renderItem={({item, separators}) => (
          <View
            style={[
              styles.width_100,
              styles.padding_8,
              styles.flex_row,
              styles.align_center,
            ]}>
            <Image source={require('../img/avatar.png')} style={style.avatar} />
            <View style={[styles.flex_column, styles.flex_1]}>
              <Text>{item.user_detail.nick_name}</Text>
              <Text>请求添加好友</Text>
            </View>
            <TouchableOpacity onPress={() => add(item.user_detail.nick_name)}>
              <View style={[style.button, styles.flex_row, styles.center]}>
                <Text>同意</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
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
  button: {
    height: 30,
    width: 80,
    backgroundColor: '#FFD954',
    borderRadius: 100,
  },
});

export default FriendList;
