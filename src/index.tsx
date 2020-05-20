import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {test} from '@/utils/util';
export default class App extends Component {
  componentDidMount() {
    test();
  }

  render() {
    return (
      <View>
        <Text> app </Text>
      </View>
    );
  }
}
