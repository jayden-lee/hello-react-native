import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({value, changeText, addTodo}) => (
  <TextInput
    style={styles.input}
    value={value}
    placeholder={"오늘의 할 일"}
    maxLength={30}
    onChangeText={changeText}
    onEndEditing={addTodo}
    returnKeyType="done"
  />
);

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    paddingTop: 15,
    paddingBottom: 10,
  }
});

export default Input;
