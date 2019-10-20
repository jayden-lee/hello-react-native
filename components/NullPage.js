import React from "react";
import { StyleSheet, View, Text } from "react-native";
export default function NullPage() {
  return (
    <View style={styles.nullbox}>
      <Text style={styles.nulltext}> 일기를 선택해주세요 </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  nullbox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50
  },
  nulltext: {
    fontSize: 30,
    color: "lightgrey"
  }
});
