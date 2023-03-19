import { useState, useEffect } from 'react';

import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Image } from '@rneui/themed';

import PictureCard from '../components/PictureCard';
import { apiKey, apiURL, colorPalette as c } from '../Constants';

export default function Today() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataResult, setDataResult] = useState([]);

    useEffect(() => {

        const uri = `${apiURL}?api_key=${apiKey}&thumbs=true`;

        fetch(uri)
        .then(res => res.json())
        .then(
            (result) => {
                setDataResult(result);
                setIsLoaded(true);
            }, 
            (error) => {
            setError(error);
            setIsLoaded(true);
            }
        )

    }, []);

    return (
        <ScrollView style={styles.wrapper}>
            {displayContainer(error, isLoaded, dataResult)}
        </ScrollView>
    );
}

function displayContainer(error, isLoaded, dataResult) {

    if(error) {
        return (
            <ScrollView style={styles.section}>
              <Text>Error: {error.message}</Text>
            </ScrollView>
        );
    } else if(!isLoaded) {
        return (
            <ScrollView style={styles.section}>
              <Text>Loading ...</Text>
              <ActivityIndicator size="large" color={c.highlight}/>
            </ScrollView>
        );
    } else if(dataResult.code === 404 || dataResult.code === 400) {
        return (
            <ScrollView style={styles.section}>
              <Text>SORRY! Something wen't wrong:</Text>
              <Text>Today's Picture is not up yet, or you've entered an invalid date</Text>
              <Text>Try a different date!</Text>
                <Image source={{uri: "https://media.giphy.com/media/GDnomdqpSHlIs/giphy.gif"}}/>
            </ScrollView>
        );
    } else {
        return (
            <PictureCard itemData={dataResult} />
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: c.primary,
        height: '100%',
        paddingHorizontal: 32,
    },
    section: {
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 80,
        backgroundColor: c.white,
        padding: 24,
    },
})