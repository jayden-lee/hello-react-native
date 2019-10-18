import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SubTitle = ({title}) => (
    <View>
        <Text style={styles.subTitleText}>{title}</Text>
    </View>
);

styles = StyleSheet.create({
    subTitleText: {
        color: '#3f4e66',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default SubTitle;