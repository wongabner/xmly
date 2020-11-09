import React, { useCallback } from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet
} from 'react-native'

const Touchable: React.FC<TouchableOpacityProps> = React.memo(props => {
  return <TouchableOpacity activeOpacity={0.8} {...props} />
})

export default Touchable
