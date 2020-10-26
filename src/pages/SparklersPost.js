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
  Animated,
  ActivityIndicator,
} from 'react-native';
import {get_sparklers, send_sparklers} from '../common/user';

const FadeOutView = props => {
  const [fadeAnim] = React.useState(new Animated.Value(1));
  const startFade = props.startFade;
  React.useEffect(() => {
    if (startFade) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 6000,
        useNativeDriver: false,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startFade]);
  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}>
      {props.children}
    </Animated.View>
  );
};

function SparklersPost({route, navigation}) {
  const {receiver_id} = route.params;
  console.log('receiver_id', receiver_id);
  const [value, onChangeText] = React.useState();
  const [message_list, setMessageList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [canIInterval, setCanIInterval] = React.useState(true);
  const [sendLoading, setSendLoading] = React.useState(false);
  var INTERVAL;
  React.useEffect(() => {
    navigation.addListener('focus', async () => {
      console.log('SparklersPost focus');
      setLoading(true);
      let get_sparklers_response = await get_sparklers({receiver_id});
      let get_sparklers_responseJson = await get_sparklers_response.json();
      console.log(get_sparklers_responseJson.data);
      setMessageList(get_sparklers_responseJson.data);
      setLoading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      INTERVAL = setInterval(async () => {
        if (!canIInterval) return;
        setCanIInterval(false);
        console.log('get sparklers');
        let get_sparklers_r = await get_sparklers({receiver_id});
        let get_sparklers_rJson = await get_sparklers_r.json();
        setMessageList(get_sparklers_rJson.data);
        setCanIInterval(true);
      }, 8000);
    });
    navigation.addListener('blur', async () => {
      console.log('SparklersPost blur');
      clearInterval(INTERVAL);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const refresh = async () => {
    let get_sparklers_response = await get_sparklers({receiver_id});
    let get_sparklers_responseJson = await get_sparklers_response.json();
    console.log(get_sparklers_responseJson.data);
    setMessageList(get_sparklers_responseJson.data);
  };

  const reveal = async sparklers_id => {
    setCanIInterval(false);
    console.log('reveal');
    let read_response = await get_sparklers({sparklers_id});
    let read_responseJson = await read_response.json();
    console.log(read_responseJson);
    let _message_list = JSON.parse(JSON.stringify(message_list));
    let message = _message_list.find(item => item.id === sparklers_id);
    message.startFade = true;
    setMessageList(_message_list);
    setTimeout(() => {
      _message_list = [];
      for (let item of message_list) {
        if (item.id !== sparklers_id) {
          _message_list.push(item);
        }
      }
      setMessageList(_message_list);
      setCanIInterval(true);
    }, 8000);
  };

  const send = async () => {
    if (sendLoading) return;
    setSendLoading(true);
    await send_sparklers(receiver_id, value);
    let _message_list = JSON.parse(JSON.stringify(message_list));
    _message_list.push({
      id: _message_list[_message_list.length - 1].id,
      is_self: true,
      message: value,
    });
    setMessageList(_message_list);
    onChangeText('');
    setSendLoading(false);
    refresh();
  };
  return (
    <SafeAreaView style={[styles.flex_column, styles.flex_1]}>
      <FlatList
        data={message_list}
        onRefresh={() => refresh()}
        refreshing={loading}
        ListFooterComponent={<View style={styles.margin_bottom_30} />}
        renderItem={({item, separators}) =>
          item.is_self ? (
            <FadeOutView
              style={{...styles.flex_row, ...styles.margin_top_30}}
              startFade={item.startFade}>
              <View style={styles.flex_1} />
              <Text style={style.read_status}>未读</Text>
              <View style={style.back_y}>
                <Text style={styles.padding_8}>{item.message}</Text>
              </View>
              <Image source={require('../img/trr.png')} style={style.tr} />
              <Image
                source={require('../img/avatar.png')}
                style={style.avatar}
              />
            </FadeOutView>
          ) : (
            <FadeOutView
              style={{...styles.flex_row, ...styles.margin_top_30}}
              startFade={item.startFade}>
              <Image
                source={require('../img/avatar.png')}
                style={style.avatar}
              />
              <Image source={require('../img/tr.png')} style={style.tr} />
              <View style={[style.back_y]}>
                <Text style={styles.padding_8}>
                  {!item.startFade ? '一条未读新消息' : item.message}
                </Text>
              </View>
              {!item.startFade ? (
                <TouchableOpacity onPress={() => reveal(item.id)}>
                  <Image
                    source={require('../img/lock.png')}
                    style={style.lock}
                  />
                </TouchableOpacity>
              ) : null}
            </FadeOutView>
          )
        }
      />

      <View style={styles.flex_1} />
      <View style={[styles.flex_row, style.gray_b]}>
        <TextInput
          placeholder="发送只能绽放5秒的烟花"
          style={[style.input, styles.flex_1, {paddingLeft: 20}]}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
        <TouchableOpacity
          style={[style.send_button, styles.flex_column, styles.center]}
          onPress={() => send()}>
          <View>
            {loading ? (
              <ActivityIndicator
                style={styles.margin_left_16}
                size="small"
                color="#d0d0d0"
              />
            ) : (
              <Text>SEND</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  gray_b: {
    backgroundColor: '#cccccc',
    padding: 10,
  },
  input: {
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  send_button: {
    backgroundColor: '#FFD954',
    width: 60,
    borderRadius: 20,
    marginLeft: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 0,
  },
  back_y: {
    backgroundColor: '#FFD954',
    width: 200,
    borderRadius: 10,
  },
  tr: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
  lock: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginLeft: 10,
  },
  read_status: {
    marginTop: 25,
    marginRight: 10,
  },
});

export default SparklersPost;
