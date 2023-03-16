import { StyleSheet } from 'react-native';
import { Text, ListItem, Image } from '@rneui/themed';

export default function PicturePreview({itemData, navigatorRef}) {
    return (
        <ListItem style={styles.wrapper}>
            <ListItem.Content>
                <Image source={{uri: itemData.url}} style={styles.img}/>
                <Text style={styles.date}>{itemData.date}</Text>
            </ListItem.Content>
        </ListItem>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 80,
    },
    img: {
        width: '100%',
        resizeMode: 'contain',
        height: undefined,
        aspectRatio: 1,
    },
    date: {
        fontWeight: 700,
        color: '#005F73',
    }
})