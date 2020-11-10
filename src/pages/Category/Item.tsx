import { ICategory } from '@/models/category'
import { viewportWidth } from '@/utils'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface IProps {
  isEdit: boolean
  selected: boolean
  data: ICategory
  disabled?: boolean
}

export const parentWidth = viewportWidth - 10
export const itemWidth = parentWidth / 4
export const itemHeight = 48
export const margin = 5

class Item extends Component<IProps> {
  render() {
    const { data, isEdit, selected, disabled } = this.props
    return (
      <View key={data.id} style={styles.itemWrapper}>
        <View style={[styles.item, disabled && styles.disabled]}>
          <Text>{data.name}</Text>
          {isEdit && !disabled && (
            <View style={styles.icon}>
              <Text style={styles.iconText}>{selected ? '-' : '+'}</Text>
            </View>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    width: itemWidth,
    height: itemHeight
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    margin: margin,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabled: {
    backgroundColor: '#ccc'
  },
  icon: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f86442',
    borderRadius: 8
  },
  iconText: {
    color: '#fff',
    lineHeight: 15
  }
})

export default Item
