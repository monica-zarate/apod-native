import { useState, useEffect } from 'react';

import { ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text } from '@rneui/themed';

import PictureCard from '../components/PictureCard';
import { apiKey, apiURL } from '../Constants';

export default function Today({navigation}) {

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
            <Text style={styles.heading}>Today's Photo</Text>
            {displayContainer(error, isLoaded, dataResult, navigation)}
        </ScrollView>
    );
}

function displayContainer(error, isLoaded, dataResult, navigation) {

    if(error) {
        return (
            <ScrollView>
              <Text style={styles.heading}>Error: {error.message}</Text>
            </ScrollView>
        );
    } else if(!isLoaded) {
        return (
            <ScrollView>
              <Text style={styles.heading}>Loading ...</Text>
              <ActivityIndicator size="large" color="#00ff00"/>
            </ScrollView>
        );
    } else if(dataResult === undefined) {
        return (
            <ScrollView>
              <Text style={styles.heading}>No records found for the search</Text>
            </ScrollView>
        );
    } else {
        return (
            <PictureCard itemData={dataResult} navigatorRef={navigation} />
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#005F73',
        height: '100%',
        padding: 32,
    },
    heading: {
        color: '#ffffff',
        marginBottom: 24,
        textTransform: 'uppercase',
        fontWeight: 700,
        fontSize: 24,
    },
})