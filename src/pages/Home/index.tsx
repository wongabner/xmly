import React, { Component } from 'react'
import { FlatList, ListRenderItemInfo, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { RootStackNavigation } from '@/navigator'
import { RootState } from '@/models'
import Carousel from '@/pages/Home/Carousel'
import Guess from '@/pages/Home/Guess'
import ChannelItem from './ChannelItem'
import { IChannel } from '@/models/home'

const mapStateToProps = (state: RootState) => {
  return {
    carousels: state.home.carousels,
    channels: state.home.channels,
    loading: state.loading.effects['home/fetchCarousels']
  }
}

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

interface IProps extends ModelState {
  navigation: RootStackNavigation
}

class Home extends Component<IProps> {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'home/fetchCarousels'
    })
    dispatch({
      type: 'home/fetchChannels'
    })
  }

  onPress = () => {
    const { navigation } = this.props
    navigation.navigate('Detail', {
      id: 100
    })
  }

  renderItem = ({ item }: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} />
  }

  get header() {
    const { carousels } = this.props
    return (
      <View>
        <Carousel data={carousels} />
        <Guess />
      </View>
    )
  }

  render() {
    const { channels } = this.props
    return (
      <FlatList
        ListHeaderComponent={this.header}
        data={channels}
        renderItem={this.renderItem}
      />
    )
  }
}

export default connector(Home)
