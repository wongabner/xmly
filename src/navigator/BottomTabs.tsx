import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Listen from '@/pages/Listen';
import Found from '@/pages/Found';
import Account from '@/pages/Account';
import { RouteProp, TabNavigationState } from '@react-navigation/native';
import { RootStackNavigation, RootStackParamList } from '.';
import Icon from '@/assets/iconfont/index';
import HomeTabs from './HomeTabs';

export type BottomTabParamList = {
  HomeTabs: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
  state?: TabNavigationState;
};

interface IProps {
  navigation: RootStackNavigation;
  route: Route;
}
function getHeaderTitle(routeName: string) {
  switch (routeName) {
    case 'HomeTabs':
      return '首页';
    case 'Listen':
      return '我听';
    case 'Found':
      return '发现';
    case 'Account':
      return '账户';
    default:
      return '首页';
  }
}

export default class BottomTabs extends Component<IProps> {
  componentDidMount() {
    this.setOptions();
  }

  componentDidUpdate() {
    this.setOptions();
  }

  setOptions = () => {
    const {navigation, route} = this.props;
    const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'HomeTabs';
    if(routeName === 'HomeTabs') {
      navigation.setOptions({
        headerTransparent: true,
        headerTitle: '',
      });
    } else {
      navigation.setOptions({
        headerTransparent: false,
        headerTitle: getHeaderTitle(routeName),
      });
    }
  }

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#f86442',
        }}>
        <Tab.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({ color, size }) => <Icon name="icon-shouye" color={color} size={size} />
          }}
        />
        <Tab.Screen
          name="Listen"
          component={Listen}
          options={{
            tabBarLabel: '我听',
            tabBarIcon: ({ color, size }) => <Icon name="icon-shoucang" color={color} size={size} />
          }}
        />
        <Tab.Screen
          name="Found"
          component={Found}
          options={{
            tabBarLabel: '发现',
            tabBarIcon: ({ color, size }) => <Icon name="icon-faxian" color={color} size={size} />
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({ color, size }) => <Icon name="icon-user" color={color} size={size} />
          }}
        />
      </Tab.Navigator>
    );
  }
}
