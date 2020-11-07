import { Dimensions } from 'react-native'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
)

// 根据百分比获取宽度
const wp = (percentage: number) => {
  const value = (percentage * viewportWidth) / 100
  return Math.round(value)
}

// 根据百分比获取宽度
const hp = (percentage: number) => {
  const value = (percentage * viewportHeight) / 100
  return Math.round(value)
}

export { viewportWidth, viewportHeight, wp, hp }
