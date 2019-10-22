import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { AsyncStorage } from "react-native";

export default class MainScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons
        name="calendar-multiselect"
        size={30}
        style={{ color: tintColor }}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: "",
      Posts: [
        {
          title: "10월 21일에 쓴 글",
          content: "본문",
          id: 1,
          date: "2019-10-21"
        },
        {
          title: "10월 22일에 쓴 글",
          content: "본문",
          id: 2,
          date: "2019-10-22"
        }
      ]
    };
  }

  componentDidMount() {
    this._getData();
    this.props.navigation.addListener("didFocus", payload => {
      newPost = this.props.navigation.getParam("post");
      signal = this.props.navigation.getParam("signal");

      if (newPost) {
        const prevPosts = [...this.state.Posts];
        this.setState({ Posts: prevPosts.concat(newPost) }, this._storeData);
        this.props.navigation.navigate("MainScreen", { post: false });
      } else if (signal) {
        const prevPosts = [...this.state.Posts];
        deleteIndex = prevPosts.findIndex(item => {
          return item.id == signal;
        });
        prevPosts.splice(deleteIndex, 1);
        this.setState({ Posts: prevPosts }, this._storeData);
        this.props.navigation.navigate("MainScreen", { signal: false });
      }
    });
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem("@diary:state", JSON.stringify(this.state));
    } catch (e) {}
  };

  _getData = async () => {
    try {
      const mystate = await AsyncStorage.getItem("@diary:state");
      if (mystate !== null) {
        this.setState(JSON.parse(mystate));
      }
    } catch (e) {}
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Calendar
          onDayPress={day => {
            this.setState((this.state.selectedDate = day));
          }}
          current={new Date()}
        />
        <ScrollView>
          <FlatList
            data={this.state.Posts.filter(data => {
              return data.date == this.state.selectedDate.dateString;
            })}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.listitem}
                  onPress={() => {
                    this.props.navigation.navigate("Detail", { post: item });
                  }}
                >
                  <View>
                    <Text style={styles.listtext}>제목 : {item.title}</Text>
                    <Text style={styles.listtext}>내용 : {item.content}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => {
              return `$(index)`;
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  fontcontainer: {
    fontSize: 30
  },
  textstyle: {
    fontSize: 40
  },
  listitem: {
    marginLeft: 50,
    marginTop: 20,
    borderLeftColor: "black",
    borderLeftWidth: 4,
    paddingLeft: 30
  },
  listtext: {
    fontSize: 20
  }
});
