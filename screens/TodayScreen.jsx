import { View, StyleSheet } from 'react-native';
import PictureCard from '../components/PictureCard';

export default function Today() {
    return (
        <View style={styles.wrapper}>
            <PictureCard/>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#005F73',
        height: '100%',
        padding: 32,
    },
})