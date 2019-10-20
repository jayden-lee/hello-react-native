import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { SafeAreaView } from "react-navigation";
import CalendarPicker from "react-native-calendar-picker";

export default ListScreen = () => {
  return (
    <SafeAreaView>
      <CalendarPicker />
    </SafeAreaView>
  );
};
