// Native & RNEUI library elements
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, Image } from '@rneui/themed';

// Project imports
import { colorPalette as c } from "../Constants";


export default function PictureCard({itemData}){

    // Determine if the picture of the day is a video, to display the video thumbnail instead
    let imgUrl = itemData.media_type === 'video' ? imgUrl = itemData.thumbnail_url : imgUrl = itemData.url;

    return (
        <ScrollView>
            <View style={styles.wrapper}>
                <Text style={styles.spacing}>{itemData.date}</Text>
                <Text h2 style={styles.spacing}>{itemData.title}</Text>
                <Image source={{uri: imgUrl}} style={[styles.img, styles.spacing]}/>
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
        backgroundColor: c.white,
        padding: 24,
    },
    spacing: {
        marginBottom: 24,
    },
    body: {
        lineHeight: 24,
    }
})