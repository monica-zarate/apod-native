import { useState, useEffect, useRef } from 'react';

import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button, SearchBar, Image } from '@rneui/themed';

import PictureCard from '../components/PictureCard';
import { apiKey, apiURL, colorPalette as c } from '../Constants';

export default function ArchiveScreen() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pictureResult, setPictureResult] = useState([]);
    const [requestedDate, setRequestedDate] = useState('');
    const [searchInputVal, setSearchInputVal] = useState('');

    const dateInput = useRef(null);

    const updateSearchInputVal = (searchText) => {        
        setSearchInputVal(searchText);
      };
    
      const applySearch = () => {
        setRequestedDate(searchInputVal);
        setSearchInputVal('');
        dateInput.current.blur();
      };

    useEffect(() => {
            const uri = `${apiURL}?api_key=${apiKey}&date=${requestedDate}&thumbs=true`;

            fetch(uri)
            .then(res => res.json())
            .then(
                (result) => {
                    setPictureResult(result);
                    setIsLoaded(true);
                }, 
                (error) => {
                setError(error);
                setIsLoaded(true);
                }
            );
    }, [requestedDate]);

    return (
        <ScrollView style={styles.wrapper}>
            <View style={styles.spacing}>
                <Text style={styles.intro}>Which <Text h2>Picture of the Day</Text> would you like to see?</Text>
            </View>
            <View style={styles.spacing}>
                <Text>Must be after 1995-06-16, the first day an APOD picture was posted.</Text>
            </View>
            <View style={styles.spacing} >
                <SearchBar placeholder='YYYY-MM-DD' ref={dateInput} value={searchInputVal} onChangeText={updateSearchInputVal}/>
            </View>
            <View style={styles.spacing}>
                <Button title='Find' onPress={applySearch}/> 
            </View>
            {requestedDate && displayContainer(error, isLoaded, pictureResult)}
        </ScrollView>
    )
}

function displayContainer(error, isLoaded, pictureResult) {
    if(error) {
        return (
            <View style={styles.section}>
              <Text style={styles.heading}>Error: {error.message}</Text>
            </View>
        );
    } else if(!isLoaded) {
        return (
            <View style={styles.section}>
              <Text style={styles.heading}>Loading ...</Text>
              <ActivityIndicator size="large" color={c.highlight}/>
            </View>
        );
    } else if(pictureResult.code === 404 || pictureResult.code === 400) {
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
            <View style={styles.cardWrap}>
                <PictureCard itemData={pictureResult} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: c.primary,
        height: '100%',
        paddingHorizontal: 32,
    },
    intro: {
        fontSize: 20,
    },
    spacing: {
        marginBottom: 16
    }, 
    cardWrap: {
        marginTop: 8
    },
    section: {
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 80,
        backgroundColor: c.white,
        padding: 24,
    }
})