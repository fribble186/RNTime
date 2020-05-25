import * as React from 'react';
import styles from '../styles';
import {save, load, remove} from '../utils/storage';
import {SafeAreaView, View, Text, SectionList, StyleSheet} from 'react-native';

function Todo(props) {
  return (
    <View
      style={{
        ...styles.flex_row,
        ...styles.width_100,
        ...styles.padding_LR_40,
        ...styles.padding_TB_10,
      }}>
      <Text
        style={props.item.done ? styles.done : null}
        onPress={props.item.done ? () => props.doTodo(props.item.index) : null}>
        {props.item.content}
      </Text>
      <View style={styles.flex_1} />
      <Text
        onPress={
          props.item.done
            ? () => props.deleteDone(props.item.index)
            : () => props.doneTodo(props.item.index)
        }>
        {props.item.done ? '做完啦' : '没做完'}
      </Text>
    </View>
  );
}

function TodoList({route, navigation}) {
  const [Todos, setTodos] = React.useState([]);
  const [Dones, setDones] = React.useState([]);
  React.useEffect(() => {
    const onFocus = navigation.addListener('focus', () => {
      load('todos')
        .then(ret => setTodos(ret))
        .catch(() => setTodos([]));
      load('dones')
        .then(ret => setDones(ret))
        .catch(() => setDones([]));
    });
    return onFocus;
  }, [navigation]);
  const doneTodo = async index => {
    let _todos, _dones;
    _todos = await load('todos');
    _todos = _todos.slice();
    try {
      _dones = await load('dones');
      _dones = _dones.slice();
    } catch (err) {
      _dones = [];
    }
    _dones.push(_todos[index]);
    _todos.splice(index, 1);
    await save('todos', _todos);
    await save('dones', _dones);
    setTodos(_todos);
    setDones(_dones);
  };
  const doTodo = async index => {
    let _todos, _dones;
    _todos = await load('todos');
    _dones = await load('dones');
    _todos = _todos.slice();
    _dones = _dones.slice();
    _todos.push(_dones[index]);
    _dones.splice(index, 1);
    await save('todos', _todos);
    await save('dones', _dones);
    setTodos(_todos);
    setDones(_dones);
  };
  const deleteDone = async index => {
    let _dones;
    _dones = await load('dones');
    _dones = _dones.slice();
    _dones.splice(index, 1);
    await save('dones', _dones);
    setDones(_dones);
  };
  return (
    <SafeAreaView
      style={{
        ...styles.flex_1,
        ...styles.flex_column,
      }}>
      <View style={{...styles.flex_1, ...styles.flex_column}}>
        <View style={{...styles.flex_1, ...styles.flex_column}}>
          <SectionList
            sections={[
              {
                title: '待做完',
                data: Todos.map((item, index) => ({
                  content: item,
                  done: false,
                  index,
                })),
              },
              {
                title: '已做完',
                data: Dones.map((item, index) => ({
                  content: item,
                  done: true,
                  index,
                })),
              },
            ]}
            keyExtractor={(item, index) => `todo${index}`}
            renderItem={({item}) => (
              <Todo
                item={item}
                doneTodo={doneTodo}
                doTodo={doTodo}
                deleteDone={deleteDone}
              />
            )}
            renderSectionHeader={({section}) => (
              <Text style={style.sectionHeader}>{section.title}</Text>
            )}
          />
        </View>
        <Text
          style={{...styles.float_icon, ...styles.white}}
          onPress={() => navigation.navigate('TodoPost')}>
          +
        </Text>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  sectionHeader: {
    marginLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
  },
});

export default TodoList;
