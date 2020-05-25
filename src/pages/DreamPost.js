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
} from 'react-native';
import {get_dreams, post_dreams} from '../common/dream';

function DreamPost({navigation}) {
  const [value, onChangeText] = React.useState('今天梦到了什么?');
  const [dream, onChangeDream] = React.useState([]);
  React.useEffect(() => {
    const onFocus = navigation.addListener('focus', async () => {
      console.log('DreamPost focus');
      let date = new Date();
      let y = date.getFullYear();
      let m = '0' + (date.getMonth() + 1).toString();
      let d = date.getDate();
      let date_str = y + '-' + m + '-' + d;
      let get_dream_response = await get_dreams({date: date_str});
      let get_dream_responseJson = await get_dream_response.json();
      console.log(get_dream_responseJson);
      onChangeDream(get_dream_responseJson.data);
    });
    return onFocus;
  }, [navigation]);
  const handleClickSubmit = async () => {
    await post_dreams(value);
  };
  return (
    <SafeAreaView style={{...styles.flex_column, ...styles.flex_1}}>
      <View style={{...styles.flex_row}}>
        <Image source={require('../img/light.png')} style={style.light} />
        <View style={styles.flex_1} />
      </View>
      {dream.length === 0 ? (
        <View
          style={{
            ...styles.flex_column,
            ...styles.padding_LR_40,
          }}>
          <TextInput
            style={{...styles.border, ...style.input}}
            onChangeText={text => onChangeText(text)}
            multiline={true}
            value={value}
          />
          <View style={{...styles.flex_column, ...styles.margin_top_30}}>
            <Button
              title="记录"
              color="#FFD954"
              onPress={() => handleClickSubmit()}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            ...styles.flex_column,
            ...styles.padding_LR_40,
          }}>
          <Text>{dream[0].content}</Text>
        </View>
      )}
      <View style={styles.flex_1} />
      <View style={styles.flex_row}>
        <View style={styles.flex_1} />
        <TouchableOpacity
          style={{
            ...styles.flex_column,
            ...styles.align_center,
            ...styles.margin_right_16,
            ...styles.margin_bottom_16,
          }}
          onPress={() => navigation.navigate('DreamCalendar')}>
          <Image
            source={require('../img/calendar.png')}
            style={style.calendar}
          />
          <Text style={styles.text_10}>梦境日记</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  light: {
    width: 150,
    height: 150,
  },
  calendar: {
    width: 30,
    height: 30,
  },
  input: {
    height: 200,
    textAlignVertical: 'top',
  },
});

export default DreamPost;
