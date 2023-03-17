import { useState, useEffect, useRef } from 'react';

import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button, SearchBar } from '@rneui/themed';

import PictureCard from '../components/PictureCard';
import { apiKey, apiURL } from '../Constants';

export default function ArchiveScreen() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pictureResult, setPictureResult] = useState([]);
    const [currDate, setCurrDate] = useState('');
    const [searchInputVal, setSearchInputVal] = useState('');

    const dateInput = useRef(null);

    const updateSearchInputVal = (searchText) => {        
        setSearchInputVal(searchText);
      };
    
      const applySearch = () => {

        setCurrDate(searchInputVal);
        setSearchInputVal('');
        dateInput.current.blur();
      };

    useEffect(() => {

        const uri = `${apiURL}?api_key=${apiKey}&date=${currDate}&thumbs=true`;

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

    }, [currDate]);

    return (
        <ScrollView style={styles.wrapper}>
            <Text>Find a Photo</Text>
            <View>
                <SearchBar ref={dateInput} value={searchInputVal} onChangeText={updateSearchInputVal}/>
                <Button onPress={applySearch}>Find</Button>
            {displayContainer(error, isLoaded, pictureResult)}
            </View>
        </ScrollView>
    )
}

function displayContainer(error, isLoaded, pictureResult) {
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
    } else if(pictureResult === undefined) {
        return (
            <View>
                <Text style={styles.heading}>No records found for the search</Text>
            </View>
        );
    } else {
        return (
            <PictureCard itemData={pictureResult} />
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#bde3d7',
        height: '100%',
        paddingHorizontal: 32,
    },
    heading: {
        color: '#ffffff',
        marginBottom: 24,
        textTransform: 'uppercase',
        fontWeight: 700,
        fontSize: 20,
    },
})