import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Home from '@/pages/Home'

const Tab = createMaterialTopTabNavigator()

export default class HomeTabs extends Component {
  render() {
    return (
      <Tab.Navigator
        lazy={true}
        tabBarOptions={{
          scrollEnabled: true,
          tabStyle: {
            width: 70
          },
          indicatorStyle: {
            height: 4,
            width: 20,
            marginLeft: 25,
            borderRadius: 2,
            backgroundColor: '#f86442'
          },
          activeTintColor: '#f86442',
          inactiveTintColor: '#333'
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ tabBarLabel: '推荐' }}
        />
        <Tab.Screen
          name="Home1"
          component={Home}
          options={{ tabBarLabel: '推荐1' }}
        />
        <Tab.Screen
          name="Home12"
          component={Home}
          options={{ tabBarLabel: '推荐2' }}
        />
        <Tab.Screen
          name="Home13"
          component={Home}
          options={{ tabBarLabel: '推荐3' }}
        />
        <Tab.Screen
          name="Home14"
          component={Home}
          options={{ tabBarLabel: '推荐4' }}
        />
        <Tab.Screen
          name="Home15"
          component={Home}
          options={{ tabBarLabel: '推荐5' }}
        />
        <Tab.Screen
          name="Home16"
          component={Home}
          options={{ tabBarLabel: '推荐6' }}
        />
        <Tab.Screen
          name="Home17"
          component={Home}
          options={{ tabBarLabel: '推荐7' }}
        />
        <Tab.Screen
          name="Home18"
          component={Home}
          options={{ tabBarLabel: '推荐8' }}
        />
        <Tab.Screen
          name="Home19"
          component={Home}
          options={{ tabBarLabel: '推荐9' }}
        />
      </Tab.Navigator>
    )
  }
}
