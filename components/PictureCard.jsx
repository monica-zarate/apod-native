import { View, StyleSheet } from 'react-native';
import { Text, ListItem, Image } from '@rneui/themed';

export default function PictureCard({itemData}){
    return (
        <ListItem style={styles.wrapper}>
            <ListItem.Content>  
                <ListItem.Subtitle><Text style={styles.highlight}>Date: </Text><Text>2023-03-13</Text></ListItem.Subtitle>
                <ListItem.Title><Text style={styles.highlight}>Title: </Text><Text>Rainbow Tree</Text></ListItem.Title>
                <Image source={require('../assets/rainbow-tree.jpg')} style={styles.img}/>
                <Text>What lies at the end of a rainbow? Something different for everyone. For the photographer taking this picture, for example, one end of the rainbow ended at a tree. Others nearby, though, would likely see the rainbow end somewhere else. The reason is because a rainbow's position depends on the observer. The center of a rainbow always appears in the direction opposite the Sun, but that direction lines up differently on the horizon from different locations. This rainbow's arc indicates that its center is about 40 degrees to the left and slightly below the horizon, while the Sun is well behind the camera and just above the horizon. Reflections and refractions of sunlight from raindrops in a distant storm in the direction of the rainbow are what causes the colorful bands of light. This single exposure image was captured in early January near Knight's Ferry, California, USA.</Text>
            </ListItem.Content>
            
        </ListItem>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    highlight: {
        color: '#005F73',
        fontWeight: 'bold',
    },
    img: {
        width: 200,
        height: 200,
        marginVertical: 24,
    }
})