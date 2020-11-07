import React, { Component } from 'react'
import { View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { RootStackNavigation } from '@/navigator'
import { RootState } from '@/models'
import Carousel from '@/pages/Home/Carousel'

const mapStateToProps = (state: RootState) => {
  return {
    carousels: state.home.carousels,
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
  }

  onPress = () => {
    const { navigation } = this.props
    navigation.navigate('Detail', {
      id: 100
    })
  }

  render() {
    const { carousels, loading } = this.props
    return (
      <View>
        <Carousel data={carousels} />
      </View>
    )
  }
}

export default connector(Home)
