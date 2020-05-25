import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import BottomTabs from './BottomTabs';
import Detail from '@/pages/Detail';
import {Platform, StyleSheet, StatusBar} from 'react-native';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Detail: {
    id: number;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

let Stack = createStackNavigator<RootStackParamList>();

class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="float"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerStatusBarHeight: StatusBar.currentHeight,
            headerStyle: {
              // backgroundColor: 'red',
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
                ios: {},
              }),
            },
          }}>
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{
              headerTitle: '首页',
            }}
          />
          <Stack.Screen
            options={{headerTitle: '详情页'}}
            name="Detail"
            component={Detail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
