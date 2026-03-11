import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessagesScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Messages Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default MessagesScreen;