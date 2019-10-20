import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Weather from "./app/components/Weather";
import * as Location from "expo-location";

// Weather API Key
const API_KEY = "c0c905bf9065874bbab0a6a336e3f742";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    this._getWeather();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoaded ? (
          <Weather title={this.state.title} temp={this.state.temp} />
        ) : (
          <ActivityIndicator
            style={styles.indicator}
            color="white"
            size="large"
          />
        )}
      </View>
    );
  }

  _getWeather = async () => {
    await Location.requestPermissionsAsync();
    const _location = await Location.getCurrentPositionAsync();
    const {
      coords: { latitude, longitude }
    } = _location;
    const _repsonse = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );

    const _json = await _repsonse.json();
    this.setState({
      isLoaded: true,
      temp: Math.floor(_json.main.temp),
      title: _json.weather[0].main
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});