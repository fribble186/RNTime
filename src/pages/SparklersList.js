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
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {get_friend} from '../common/user';
import {save, load, remove} from '../utils/storage';

function SparklersList({navigation}) {
  const [friend_list, setFriendList] = React.useState([]);
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const onFocus = navigation.addListener('focus', async () => {
      console.log('SparklersList');
      let ret;
      try {
        ret = await load('token');
        if (ret) {
          setLogin(true);
        }
      } catch (e) {
        setLogin(false);
      }
      if (ret) {
        setLoading(true);
        let get_friend_response = await get_friend();
        let get_friend_responseJson = await get_friend_response.json();
        console.log(get_friend_responseJson.data);
        let data = get_friend_responseJson.data;
        for (let item of data) {
          item.key = item.user_detail.id;
        }
        setFriendList(data);
        setLoading(false);
      }
    });
    return onFocus;
  }, [navigation]);
  const refresh = async () => {
    setLoading(true);
    let get_friend_response = await get_friend();
    let get_friend_responseJson = await get_friend_response.json();
    console.log(get_friend_responseJson.data);
    let data = get_friend_responseJson.data;
    for (let item of data) {
      item.key = item.user_detail.id;
    }
    setFriendList(data);
    setLoading(false);
  };
  return (
    <SafeAreaView style={{...styles.flex_column, ...styles.flex_1}}>
      {login ? (
        <FlatList
          onRefresh={() => refresh()}
          refreshing={loading}
          ItemSeparatorComponent={({highlighted}) => (
            <View style={[style.separator, {marginLeft: 80}]} />
          )}
          data={friend_list}
          renderItem={({item, separators}) => (
            <TouchableHighlight
              activeOpacity={0.3}
              underlayColor="#ffefb9"
              onPress={() =>
                navigation.navigate('SparklersPost', {
                  name: item.user_detail.nick_name,
                  receiver_id: item.user_detail.id,
                })
              }
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View
                style={[
                  styles.padding_8,
                  styles.flex_row,
                  styles.align_center,
                ]}>
                <Image
                  source={require('../img/avatar.png')}
                  style={style.avatar}
                />
                <Text>{item.user_detail.nick_name}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
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

export default SparklersList;
