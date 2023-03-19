import { useState, useEffect } from 'react';

import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from '@rneui/themed';

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
            <ScrollView>
              <Text>Error: {error.message}</Text>
            </ScrollView>
        );
    } else if(!isLoaded) {
        return (
            <ScrollView>
              <Text>Loading ...</Text>
              <ActivityIndicator size="large" color={c.highlight}/>
            </ScrollView>
        );
    } else if(dataResult === undefined) {
        return (
            <ScrollView>
              <Text>No records found for the search</Text>
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
})