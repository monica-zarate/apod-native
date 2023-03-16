import { useState, useEffect } from 'react';

import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Text } from '@rneui/themed';

import PicturePreview from '../components/PicturePreview';
import { apiKey, apiURL } from '../Constants';

export default function Month({navigation}) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataResult, setDataResult] = useState([]);

    useEffect(() => {

        const uri = `${apiURL}?api_key=${apiKey}&start_date=2023-03-01&thumbs=true`;

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
        <View style={styles.wrapper}>
            <Text style={styles.heading}>March 2023</Text>
            {displayContainer(error, isLoaded, dataResult, navigation)}
        </View>
    );
}

function displayContainer(error, isLoaded, dataResult, navigation) {

    const renderItem = ({ item }) => (
        <PicturePreview itemData={item} navigatorRef={navigation} />
    );

    if(error) {
        return (
            <View>
              <Text style={styles.heading}>Error: {error.message}</Text>
            </View>
        );
    } else if(!isLoaded) {
        return (
            <View>
              <Text style={styles.heading}>Loading ...</Text>
              <ActivityIndicator size="large" color="#00ff00"/>
            </View>
        );
    } else if(dataResult === undefined) {
        return (
            <View>
              <Text style={styles.heading}>No records found for the search</Text>
            </View>
        );
    } else {
        return (
            <FlatList
              data={dataResult}
              renderItem={renderItem}
              keyExtractor={item => item.date}
            />
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