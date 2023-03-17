import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, Image } from '@rneui/themed';

export default function PictureCard({itemData}){

    return (
        <ScrollView>
            <View style={styles.wrapper}>
                <Text style={styles.spacing}>{itemData.date}</Text>
                <Text style={styles.highlight}>{itemData.title}</Text>
                <Image source={{uri: itemData.url}} style={styles.img}/>
                <Text style={styles.body}>{itemData.explanation}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 80,
        backgroundColor: '#ffffff',
        padding: 24,
    },
    textWrap: {
        flex: 1,
        flexDirection: 'row',
    },
    highlight: {
        color: '#005F73',
        fontWeight: 'bold',
        fontSize: 20,
    },
    spacing: {
        marginBottom: 24,
    },
    body: {
        lineHeight: 24
    },
    img: {
        width: '100%',
        resizeMode: 'contain',
        height: undefined,
        aspectRatio: 1,
    }
})