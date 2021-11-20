import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function EditProfile() {

    const returnText = 'n aguento mais'
    const [showIt, setShowIt] = useState(false);

    return (
        <View style={styles.basic}>
            <Text>cabo os teste</Text>
            <Button style={styles.button} mode="contained" color="navy"
                onPress={() => setShowIt(!showIt)}
            >aperta ai
            </Button>
            {!!showIt ? <Text style={{ marginTop: 10, fontSize: 16, textAlign: 'center' }}>{returnText}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        width: '50%',
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    basic: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});