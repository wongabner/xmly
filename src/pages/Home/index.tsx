import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator';
import {RootState} from '@/models';

const mapStateToProps = (state: RootState) => {
  return {
    num: state.home.num,
    loading: state.loading.effects['home/asyncAdd'],
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

class Home extends Component<IProps> {
  onPress = () => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {
      id: 100,
    });
  };

  add = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/add',
      payload: {
        num: 10,
      },
    });
  };

  asyncAdd = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/asyncAdd',
      // payload: {
      //   num: 2,
      // },
    });
  };

  render() {
    const {num, loading} = this.props;
    return (
      <View>
        <Text> Home-{num} </Text>
        <Text> {loading ? '正在努力计算中' : ''} </Text>
        <Button title="加" onPress={this.add} />
        <Button title="异步加" onPress={this.asyncAdd} />
        <Button title="跳转到详情页" onPress={this.onPress} />
      </View>
    );
  }
}

export default connector(Home);
