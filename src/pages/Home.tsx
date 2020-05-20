import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {RootStackNavigation} from '@/navigator';

interface IProps {
  navigation: RootStackNavigation;
}

export default class Home extends Component<IProps> {
  onPress = () => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {
      id: 100,
    });
  };

  render() {
    return (
      <View>
        <Text> Home </Text>
        <Button title="跳转到详情页" onPress={this.onPress} />
      </View>
    );
  }
}
