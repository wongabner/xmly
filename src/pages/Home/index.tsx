import React, { PureComponent } from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  View,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { RootStackNavigation } from '@/navigator'
import { RootState } from '@/models'
import Carousel, { sideHeight } from '@/pages/Home/Carousel'
import Guess from '@/pages/Home/Guess'
import ChannelItem from './ChannelItem'
import { IChannel } from '@/models/home'

const mapStateToProps = ({ home, loading }: RootState) => {
  return {
    carousels: home.carousels,
    channels: home.channels,
    hasMore: home.pagination.hasMore,
    gradientVisible: home.gradientVisible,
    loading: loading.effects['home/fetchChannels']
  }
}

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

interface IProps extends ModelState {
  navigation: RootStackNavigation
}

interface IState {
  refreshing: boolean
}

class Home extends PureComponent<IProps, IState> {
  state = {
    refreshing: false
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'home/fetchCarousels'
    })
    dispatch({
      type: 'home/fetchChannels'
    })
  }

  onPress = (data: IChannel) => {
    console.log(data, 'data')
  }

  keyExtractor = (item: IChannel) => {
    return item.id
  }

  // 刷新
  onRefresh = () => {
    // 1. 修改刷新状态为true
    this.setState({
      refreshing: true
    })
    // 2. 获取数据
    const { dispatch } = this.props
    dispatch({
      type: 'home/fetchChannels',
      callback: () => {
        // 3. 修改刷新状态为false
        this.setState({
          refreshing: false
        })
      }
    })
  }

  // 加载更多
  onEndReached = () => {
    console.log('--加载更多')
    const { dispatch, loading, hasMore } = this.props
    if (loading || !hasMore) return
    dispatch({
      type: 'home/fetchChannels',
      payload: {
        loadMore: true
      }
    })
  }

  renderItem = ({ item }: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} onPress={this.onPress} />
  }

  onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y
    let newGradientVisible = offsetY < sideHeight
    const { dispatch, gradientVisible } = this.props
    if (gradientVisible !== newGradientVisible) {
      dispatch({
        type: 'home/setState',
        payload: {
          gradientVisible: newGradientVisible
        }
      })
    }
  }

  get header() {
    const { carousels } = this.props
    return (
      <View>
        <Carousel />
        <View style={styles.background}>
          <Guess />
        </View>
      </View>
    )
  }

  get footer() {
    const { hasMore, loading, channels } = this.props
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>--我是有底线的--</Text>
        </View>
      )
    }
    if (loading && hasMore && channels.length > 0) {
      return (
        <View style={styles.loading}>
          <Text>正在加载中。。。</Text>
        </View>
      )
    }
  }

  get empty() {
    const { loading } = this.props
    if (loading) return
    return (
      <View style={styles.empty}>
        <Text>暂无数据</Text>
      </View>
    )
  }

  render() {
    const { channels } = this.props
    const { refreshing } = this.state
    return (
      <FlatList
        ListHeaderComponent={this.header}
        ListFooterComponent={this.footer}
        ListEmptyComponent={this.empty}
        data={channels}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onRefresh={this.onRefresh}
        refreshing={refreshing}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.2}
        onScroll={this.onScroll}
      />
    )
  }
}

const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    paddingVertical: 10
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100
  },
  background: {
    backgroundColor: '#f5f1f1'
  }
})

export default connector(Home)
