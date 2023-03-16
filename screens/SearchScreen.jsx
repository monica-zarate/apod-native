import { ScrollView, StyleSheet, Text } from 'react-native';

export default function Search() {
    return (
        <ScrollView style={styles.wrapper}>
            <Text>Find a Photo</Text>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#005F73',
        height: '100%',
        padding: 32,
    },
})