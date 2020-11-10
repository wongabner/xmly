import React, { Component } from 'react'
import _ from 'lodash'
import { DragSortableView } from 'react-native-drag-sort'
import { RootState } from '@/models'
import { ICategory } from '@/models/category'
import { RootStackNavigation } from '@/navigator'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import HeaderRightBtn from './HeaderRightBtn'
import Item, { itemHeight, itemWidth, margin, parentWidth } from './Item'
import Touchable from '@/components/Touchable'

const mapStateToProps = ({ category }: RootState) => {
  return {
    myCategorys: category.myCategorys,
    categorys: category.categorys,
    isEdit: category.isEdit
  }
}

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

interface IProps extends ModelState {
  navigation: RootStackNavigation
}

interface IState {
  myCategorys: ICategory[]
}

// 我的分类第0项和第1项
const fixedItems = [0, 1]

class Category extends Component<IProps, IState> {
  state = {
    myCategorys: this.props.myCategorys
  }

  constructor(props: IProps) {
    super(props)
    props.navigation.setOptions({
      headerRight: () => <HeaderRightBtn onSubmit={this.onSubmit} />
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: false
      }
    })
  }

  // 点击右上角完成
  onSubmit = () => {
    const { dispatch, navigation, isEdit } = this.props
    const { myCategorys } = this.state
    dispatch({
      type: 'category/toggle',
      payload: {
        myCategorys
      }
    })
    if (isEdit) {
      navigation.goBack();
    }
  }

  // 长按分类item
  onLongPress = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: true
      }
    })
  }
  // 点击分类item
  onPress = (item: ICategory, index: number, selected: boolean) => {
    const { isEdit } = this.props
    const { myCategorys } = this.state
    const disabled = fixedItems.indexOf(index) > -1
    if (disabled && selected) return
    if (isEdit) {
      if (selected) {
        this.setState({
          myCategorys: myCategorys.filter(
            selectedItem => selectedItem.id !== item.id
          )
        })
      } else {
        this.setState({
          myCategorys: myCategorys.concat([item])
        })
      }
    }
  }

  onClickItem = (data: ICategory[], item: ICategory) => {
    this.onPress(item, data.indexOf(item), true);
  };

  onDataChange = (data: ICategory[]) => {
    this.setState({
      myCategorys: data
    })
  }

  renderItem = (item: ICategory, index: number) => {
    const { isEdit } = this.props
    const disabled = fixedItems.indexOf(index) > -1
    return (
      <Item
        key={item.id}
        data={item}
        disabled={disabled}
        isEdit={isEdit}
        selected
      />
    )
  }

  renderUnSelectedItem = (item: ICategory, index: number) => {
    const { isEdit } = this.props
    return (
      <Touchable
        key={item.id}
        onPress={() => this.onPress(item, index, false)}
        onLongPress={this.onLongPress}>
        <Item data={item} isEdit={isEdit} selected={false} />
      </Touchable>
    )
  }

  render() {
    const { categorys, isEdit } = this.props
    const { myCategorys } = this.state
    const clasifyGroup = _.groupBy(categorys, item => item.classify)
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.classifyName}>我的分类</Text>
        <View style={styles.classifyView}>
          {/* {myCategorys.map(this.renderItem)} */}
          <DragSortableView
            dataSource={myCategorys}
            fixedItems={fixedItems}
            renderItem={this.renderItem}
            sortable={isEdit}
            keyExtractor={item => item.id}
            onDataChange={this.onDataChange}
            parentWidth={parentWidth}
            childrenWidth={itemWidth}
            childrenHeight={itemHeight}
            marginChildrenTop={margin}
            onClickItem={this.onClickItem}
          />
        </View>
        <View>
          {Object.keys(clasifyGroup).map(classify => {
            return (
              <View key={classify}>
                <Text style={styles.classifyName}>{classify}</Text>
                <View style={styles.classifyView}>
                  {clasifyGroup[classify].map((item, index) => {
                    if (
                      myCategorys.find(
                        selectedItem => selectedItem.id === item.id
                      )
                    ) {
                      return null
                    } else {
                      return this.renderUnSelectedItem(item, index)
                    }
                  })}
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6f6'
  },
  classifyName: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 8,
    marginLeft: 10
  },
  classifyView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5
  }
})

export default connector(Category)
