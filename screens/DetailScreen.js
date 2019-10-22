import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NullPage from "../components/NullPage";
import DetailHeader from "../components/DetailHeader";

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons
        name="book-open"
        size={25}
        style={{ color: tintColor }}
      />
    )
  };

  post = this.props.navigation.getParam("post");

  _deletesignal = () => {
    this.props.navigation.navigate("MainScreen", { signal: this.post.id });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <DetailHeader deleteProp={this._deletesignal} />
          {this.post ? (
            <View>
              <View style={styles.detailbox}>
                <Text style={styles.detailtitle}>제목 : {this.post.title}</Text>
              </View>
              {this.post.imageUri ? (
                <Image
                  source={{ uri: this.post.imageUri }}
                  style={{ width: 100, height: 100 }}
                />
              ) : null}
              <View style={styles.detailbox}>
                <Text style={styles.detailcontent}>
                  내용 : {this.post.content}
                </Text>
              </View>
            </View>
          ) : (
            <NullPage />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30
  },
  textstyle: {
    fontSize: 30
  },
  detailbox: {
    marginVertical: 30,
    marginLeft: 30,
    borderLeftColor: "grey",
    borderLeftWidth: 5,
    paddingLeft: 20
  },
  contentContainer: {
    width: "90%"
  },
  detailtitle: {
    fontSize: 30
  },
  detailcontent: {
    fontSize: 20
  }
});
