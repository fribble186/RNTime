import * as React from 'react';
import styles from '../styles';
import {save, load, remove} from '../utils/storage';
import {SafeAreaView, View, TextInput, Button} from 'react-native';

const addTodo = (todo, navigation) => {
  load('todos')
    .then(ret => {
      let _ret = ret;
      _ret.push(todo);
      save('todos', ret).then(() => navigation.navigate('TodoList'));
    })
    .catch(() =>
      save('todos', [todo]).then(() => navigation.navigate('TodoList')),
    );
};

function TodoList({route, navigation}) {
  const [value, onChangeText] = React.useState('输入要做的事情');
  return (
    <SafeAreaView style={{...styles.flex_column, ...styles.flex_1}}>
      <View
        style={{
          ...styles.flex_column,
          ...styles.padding_LR_40,
          ...styles.margin_top_30,
        }}>
        <TextInput
          style={{...styles.border}}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
        <View style={{...styles.flex_column, ...styles.margin_top_30}}>
          <Button
            title="添加"
            color="#FFD954"
            onPress={() => {
              addTodo(value, navigation);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default TodoList;
