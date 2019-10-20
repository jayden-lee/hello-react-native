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

  state = {
    selectedDate: "",
    Posts: [
      {
        title: "10월 21일에 쓴 글",
        content: "본문",
        date: "2019-10-21"
      },
      {
        title: "10월 22일에 쓴 글",
        content: "본문",
        date: "2019-10-22"
      }
    ]
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
