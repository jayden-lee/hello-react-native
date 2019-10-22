import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const DetailHeader = ({ navigation, deleteProp }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}
      >
        <Ionicons name="ios-arrow-back" size={25} />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity hitSlop={{ top: 2, bottom: 2, left: 2, right: 2 }}>
          <Ionicons name="ios-image" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={{ top: 2, bottom: 2, left: 2, right: 2 }}
          onPress={() => {
            deleteProp();
          }}
        >
          <Ionicons name="ios-close" size={25} color={"#7a7171"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  iconContainer: {
    flexDirection: "row",
    width: 60,
    justifyContent: "space-between"
  }
});

export default withNavigation(DetailHeader);
