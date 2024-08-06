import { View, Text, StyleSheet } from 'react-native';

export default function PokemonScreen() {
    return (
        <View style={styles.container}>
            <Text>Pokemon</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
