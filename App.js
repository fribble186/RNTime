import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Image, TouchableOpacity} from 'react-native';

import {SparklersIcon, DreamIcon, AccountIcon} from './src/components/TabIcons';
import SparklersList from './src/pages/SparklersList';
import SparklersPost from './src/pages/SparklersPost';
import SparklersAdd from './src/pages/SparklersAdd';
import TodoList from './src/pages/TodoList';
import DreamPost from './src/pages/DreamPost';
import Account from './src/pages/Account';
import TodoPost from './src/pages/TodoPost';
import DreamCalendar from './src/pages/DreamCalendar';
import LoginPost from './src/pages/LoginPost';
import ChangeAccount from './src/pages/ChangeAccount';
import FriendList from './src/pages/FriendList';

import {save, load, remove} from './src/utils/storage';

const BarExtra = {
  headerStyle: {backgroundColor: '#FFD954'},
  headerTintColor: 'black',
  headerTitleStyle: {fontWeight: 'bold'},
};

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'SparklersList';

  switch (routeName) {
    case 'SparklersList':
      return '聊天列表';
    case 'DreamPost':
      return '梦呓';
    case 'Account':
      return '我的主页';
  }
}

function TodoDrawer() {
  return (
    <Drawer.Navigator initialRouteName="TodoList">
      <Drawer.Screen
        name="daily"
        component={TodoList}
        options={{title: '日常'}}
      />
      <Drawer.Screen
        name="calendar"
        component={TodoList}
        options={{title: '日程'}}
      />
      <Drawer.Screen
        name="life"
        component={TodoList}
        options={{title: '人生'}}
      />
    </Drawer.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'SparklersList') {
            return SparklersIcon(focused);
          } else if (route.name === 'DreamPost') {
            return DreamIcon(focused);
          } else if (route.name === 'Account') {
            return AccountIcon(focused);
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FFD954',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="SparklersList"
        component={SparklersList}
        options={{title: '烟花'}}
      />
      {/* <Tab.Screen
        name="DreamPost"
        component={DreamPost}
        options={{title: '梦呓'}}
      /> */}
      <Tab.Screen name="Account" component={Account} options={{title: '我'}} />
    </Tab.Navigator>
  );
}

function AddButton(props) {
  const {navigation, route} = props;
  const [login, setLogin] = React.useState(false);
  React.useEffect(() => {
    load('token')
      .then(ret => setLogin(true))
      .catch(() => setLogin(false));
  }, [route]);
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'SparklersList';
  if (routeName === 'SparklersList') {
    return login ? (
      <TouchableOpacity onPress={() => navigation.navigate('SparklersAdd')}>
        <Image
          source={require('./src/img/add.png')}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 20, height: 20, marginRight: 20}}
        />
      </TouchableOpacity>
    ) : null;
  } else {
    return null;
  }
}

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Home"
          component={HomeTabs}
          options={({route, navigation}) => ({
            headerTitle: getHeaderTitle(route),
            headerRight: () => (
              <AddButton route={route} navigation={navigation} />
            ),
            ...BarExtra,
          })}
        />
        <RootStack.Screen
          name="SparklersPost"
          component={SparklersPost}
          options={({route}) => ({title: route.params.name, ...BarExtra})}
        />
        <RootStack.Screen
          name="SparklersAdd"
          component={SparklersAdd}
          options={{title: '添加朋友', ...BarExtra}}
        />
        <RootStack.Screen
          name="DreamCalendar"
          component={DreamCalendar}
          options={{title: '梦境日记', ...BarExtra}}
        />
        <RootStack.Screen
          name="TodoList"
          component={TodoList}
          options={{title: '待办事项', ...BarExtra}}
        />
        <RootStack.Screen
          name="TodoPost"
          component={TodoPost}
          options={{title: '记录待办', ...BarExtra}}
        />
        <RootStack.Screen
          name="loginPost"
          component={LoginPost}
          options={{title: '登录/注册', ...BarExtra}}
        />
        <RootStack.Screen
          name="ChangeAccount"
          component={ChangeAccount}
          options={{title: '修改用户信息', ...BarExtra}}
        />
        <RootStack.Screen
          name="FriendList"
          component={FriendList}
          options={{title: '新的好友', ...BarExtra}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
