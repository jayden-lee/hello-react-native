import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import MainScreen from "./screens/MainScreen";
import DetailScreen from "./screens/DetailScreen";
import WriteScreen from "./screens/WriteScreen";

const BaseNavi = createBottomTabNavigator(
  {
    MainScreen: {
      screen: MainScreen,
      navigationOptions: MainScreen.navigationOptions
    },
    DetailScreen: {
      screen: DetailScreen,
      navigationOptions: DetailScreen.navigationOptions
    },
    WriteScreen: {
      screen: WriteScreen,
      navigationOptions: WriteScreen.navigationOptions
    }
  },
  {
    tabBarOptions: {
      showLabel: true
    }
  }
);

const BaseNavi2 = createStackNavigator(
  {
    Write: WriteScreen,
    Tab: BaseNavi,
    Detail: DetailScreen
  },
  {
    initialRouteName: "Tab",
    mode: "modal",
    headerMode: "none"
  }
);

const MyNavi = createAppContainer(BaseNavi2);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MyNavi />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
