import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, Image } from '@rneui/themed';

export default function PictureCard({itemData, navigationRef}){

    return (
        <ScrollView>
            <View style={styles.wrapper}>  
                <Text style={[styles.highlight, styles.spacing]}>{`Date: ${itemData.date}`}</Text>
                <Text style={[styles.highlight]}>{`Title: ${itemData.title}`}</Text>
                <Image source={{uri: itemData.url}} style={styles.img}/>
                <Text style={[styles.spacing, styles.body]}>{itemData.explanation}</Text>
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
    highlight: {
        color: '#005F73',
        fontWeight: 'bold',
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