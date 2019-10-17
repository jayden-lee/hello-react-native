import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = () => (
  <TextInput
    style={StyleSheet.input}
    placeholder={"오늘의 할 일"}
    maxLength={30}
    returnKeyType="done"
  />
);

const styles = StyleSheet.create({
  input: {
    fontSize: 25,
    paddingTop: 15
  }
});

export default Input;
