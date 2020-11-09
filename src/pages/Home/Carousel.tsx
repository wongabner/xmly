import React from 'react'
import { StyleSheet, View } from 'react-native'
import SnapCarrousel, {
  ParallaxImage,
  Pagination,
  AdditionalParallaxProps
} from 'react-native-snap-carousel'
import ICarousel from '@/models/home'
import { viewportWidth, wp, hp } from '@/utils'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@/models/index'

const mapStateToProps = ({ home }: RootState) => {
  return {
    data: home.carousels,
    activeCarouselIndex: home.activeCarouselIndex
  }
}

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

interface IProps extends ModelState {}

const sliderWidth = viewportWidth

const sideWidth = wp(90)
export const sideHeight = hp(26)
const itemWidth = sideWidth + wp(2) * 2

class Carousel extends React.Component<IProps> {
  state = {
    activeSlide: 0
  }
  // 切换轮播图
  onSnapToItem = (index: number) => {
    const { dispatch } = this.props
    dispatch({
      type: 'home/setState',
      payload: {
        activeCarouselIndex: index
      }
    })
  }

  renderItem = (
    { item }: { item: ICarousel },
    parallaxProps?: AdditionalParallaxProps
  ) => {
    return (
      <ParallaxImage
        source={{ uri: item.image }}
        style={styles.image}
        containerStyle={styles.imageContainer}
        // parallaxFactor={0.8}
        showSpinner
        spinnerColor="rgba(0,0,0,0.25)"
        {...parallaxProps}
      />
    )
  }

  get pagination() {
    const { data, activeCarouselIndex } = this.props
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          containerStyle={styles.paginationContainer}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dot}
          activeDotIndex={activeCarouselIndex}
          dotsLength={data.length}
          inactiveDotScale={0.7}
          inactiveDotOpacity={0.4}
        />
      </View>
    )
  }

  render() {
    const { data } = this.props
    return (
      <View>
        <SnapCarrousel
          data={data}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages
          onSnapToItem={this.onSnapToItem}
          loop
          autoplay
        />
        {this.pagination}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: sideHeight,
    borderRadius: 8,
    backgroundColor: '#dedede'
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover'
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  paginationContainer: {
    position: 'absolute',
    top: -20,
    backgroundColor: 'rgba(0,0,0,.35)',
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8
  },
  dotContainer: {
    marginHorizontal: 6
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,.92)'
  }
})
export default connector(Carousel)
