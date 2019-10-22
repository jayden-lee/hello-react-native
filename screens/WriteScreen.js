import React from "react";
import { View, TextInput, Dimensions, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-navigation";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import WriteHeader from "../components/WriteHeader";
import uuid from "uuid/v1";
import * as ImagePicker from "expo-image-picker";
import Constants from 'expo-constants';

export default class WriteScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons
        name="grease-pencil"
        size={25}
        style={{ color: tintColor }}
      />
    ),
    tabBarOnPress: ({ navigation }) => {
      navigation.navigate("Write");
    }
  };

  state = {
    inputTitle: "",
    inputContent: "",
    imageUri: ""
  };

  _showTitle = value => {
    this.setState({ inputTitle: value });
  };

  _showContent = value => {
    this.setState({ inputContent: value });
  };

  _saveText = () => {
    if (this.state.inputTitle !== "") {
      const id = uuid();
      const date = this._getToday();
      const newPost = {
        id: id,
        title: this.state.inputTitle,
        content: this.state.inputContent,
        date: date,
        imageUri: this.state.imageUri
      };

      // reset title, content
      this.setState({
        inputTitle: "",
        inputContent: "",
        imageUri: ""
      });
      this.props.navigation.navigate("MainScreen", { post: newPost });
    } else {
      this.props.navigation.navigate("MainScreen");
    }
  };

  _getToday = () => {
    tyear = new Date().getFullYear().toString();
    tmonth = (new Date().getMonth() + 1).toString();
    tday = new Date().getDate().toString();

    if (tmonth < 10) {
      tmonth = "0" + tmonth;
    }

    if (tday < 10) {
      tday = "0" + tday;
    }
    return tyear + "-" + tmonth + "-" + tday;
  };

  _selectImage = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    });

    this.setState({ imageUri: result.uri });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <WriteHeader
            saveProps={this._saveText}
            selectImage={this._selectImage}
          />
          <TextInput
            value={this.state.inputTitle}
            onChangeText={this._showTitle}
            placeholder="제목을 입력하세요"
            style={styles.title}
            returnKeyType="done"
          />

          {this.state.imageUri ? (
            <Image
              source={{ uri: this.state.imageUri }}
              style={{ width: 100, height: 100 }}
            />
          ) : null}
          <TextInput
            value={this.state.inputContent}
            onChangeText={this._showContent}
            placeholder="내용을 입력하세요"
            multiline={true}
            style={styles.content}
            returnKeyType="done"
          />
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
  contentContainer: {
    width: "90%"
  },
  title: {
    marginVertical: 30,
    fontSize: 30,
    paddingBottom: 12,
    borderBottomWidth: 2
  },
  content: {
    fontSize: 20
  }
});
