import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./app/components/Header";
import SubTitle from "./app/components/SubTitle";
import Input from "./app/components/Input";
import TodoItem from "./app/components/TodoItem";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.headercenterd}>
        <Header />
      </View>
      <View style={styles.subContainer}>
        <SubTitle title="할 일을 입력해주세요" />
        <Input />
      </View>
      <View style={styles.subContainer}>
        <SubTitle title="해야할 일 목록" />
      </View>
      <View style={styles.todoContainer}>
        <SubTitle title="To-Do List" />
        <TodoItem text="할일하기1" />
        <TodoItem text="할일하기2" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 70,
    marginBottom: 40
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3f4e66"
  },
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    height: "100%"
  },
  headercenterd: {
    alignItems: "center"
  },
  subContainer: {
    marginLeft: 20
  }
});
