import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs'
import Home from '@/pages/Home'
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper'

const Tab = createMaterialTopTabNavigator()

class HomeTabs extends Component {
  renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TopTabBarWrapper {...props} />
  }
  render() {
    return (
      <Tab.Navigator
        lazy={true}
        tabBar={this.renderTabBar}
        sceneContainerStyle={styles.sceneContainer}
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
      </Tab.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent'
  }
})

export default HomeTabs
