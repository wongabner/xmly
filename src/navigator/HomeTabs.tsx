import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs'
import Home from '@/pages/Home'
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@/models'
import { ICategory } from '@/models/category'
import { createHomeModel } from '@/config/dva'

export type HomeParamList = {
  [key: string]: {
    namespace: string
  }
}

const Tab = createMaterialTopTabNavigator<HomeParamList>()

const mapStateToProps = ({ category }: RootState) => {
  return {
    myCategorys: category.myCategorys
  }
}

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

interface IProps extends ModelState {}

class HomeTabs extends Component<IProps> {
  renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TopTabBarWrapper {...props} />
  }

  renderScreen = (item: ICategory) => {
    createHomeModel(item.id)
    return (
      <Tab.Screen
        key={item.id}
        name={item.id}
        component={Home}
        options={{ tabBarLabel: item.name }}
        initialParams={{
          namespace: item.id
        }}
      />
    )
  }

  render() {
    const { myCategorys } = this.props
    return (
      <Tab.Navigator
        lazy={true}
        tabBar={this.renderTabBar}
        sceneContainerStyle={styles.sceneContainer}
        tabBarOptions={{
          scrollEnabled: true,
          tabStyle: {
            width: 80,
            padding: 0
          },
          indicatorStyle: {
            height: 4,
            width: 20,
            marginLeft: 30,
            borderRadius: 2,
            backgroundColor: '#f86442'
          },
          activeTintColor: '#f86442',
          inactiveTintColor: '#333'
        }}>
        {myCategorys.map(this.renderScreen)}
      </Tab.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent'
  }
})

export default connector(HomeTabs)
