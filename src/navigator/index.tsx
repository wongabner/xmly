import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators
} from '@react-navigation/stack'

import BottomTabs from './BottomTabs'
import Category from '@/pages/Category'
import Detail from '@/pages/Detail'
import { Platform, StyleSheet, StatusBar, View, Text } from 'react-native'
import Icon from '@/assets/iconfont/index'

export type RootStackParamList = {
  BottomTabs: {
    screen?: string
  }
  Category: undefined
  Detail: {
    id: number
  }
}

export type RootStackNavigation = StackNavigationProp<RootStackParamList>

let Stack = createStackNavigator<RootStackParamList>()

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
            ...Platform.select({
              android: {
                headerStatusBarHeight: StatusBar.currentHeight
              }
            }),
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <Icon name="icon-back" size={20} style={{ marginLeft: 5 }} />
            ),
            headerTintColor: '#333',
            headerStyle: {
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottomWidth: StyleSheet.hairlineWidth
                },
                ios: {}
              })
            }
          }}>
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{
              headerTitle: '首页'
            }}
          />
          <Stack.Screen
            name="Category"
            component={Category}
            options={{
              headerTitle: '分类'
            }}
          />
          <Stack.Screen
            options={{ headerTitle: '详情页' }}
            name="Detail"
            component={Detail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default Navigator
