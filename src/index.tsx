import React from 'react'
import Navigator from '@/navigator'
import { Provider } from 'react-redux'
import store from '@/config/dva'
import { StatusBar } from 'react-native'
import '@/config/http';

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
        {/* 设置顶部状态栏 */}
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
      </Provider>
    )
  }
}
