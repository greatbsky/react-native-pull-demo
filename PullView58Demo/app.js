import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions
} from 'react-native';

import {PullView} from 'react-native-pull';

export default class extends Component {

	constructor(props) {
        super(props);
        this.state = {refreshing: false, isPushOk: false};
        this.onPullRelease = this.onPullRelease.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
        this.onPushing = this.onPushing.bind(this);
    }

    onPullRelease(resolve) {
		//do something
		setTimeout(() => {
            resolve();
        }, 3000);
    }

	topIndicatorRender(pulling, pullok, pullrelease, position) {
        // console.log(position);
        // console.log(`${position.x}  ${position.y}`);
        if (this.state.isPushOk) {
            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 90}}>
        		  <Text>After Push up!</Text>
        		</View>
            );
        } else {
            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 150}}>
                    {pulling ? <Text>下拉刷新pulling...{position.y}</Text> : null}
                    {pullok ? <Text>松开刷新pullok......{position.y}</Text> : null}
                    {pullrelease ? <Text>玩命刷新中pullrelease......{position.y}</Text> : null}
                </View>
            );
        }
	}

    onPushing(position) {
        console.log('onPushing:');
        console.log(position);
        if (!this.state.isPushOk) {
            this.setState({isPushOk: true});
            return false;
        }
        return true;
    }

  render() {
    return (
      <View style={[{backgroundColor: '#ff5b3f', height: Dimensions.get('window').height}]}>
		<PullView onPullRelease={this.onPullRelease} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={30} onPushing={this.onPushing}
            style={{width: Dimensions.get('window').width}}>
			<View style={{backgroundColor: '#ffffff', height: Dimensions.get('window').height}}>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text style={styles.welcome}>
                    This is a PullView demo like the effect of 58.com's mobile App pulled down.
                </Text>
                <Text>
                    Use function topIndicatorRender(pulling, pullok, pullrelease, position),you can design your top indicator with animation.
                </Text>
            </View>
        </PullView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
