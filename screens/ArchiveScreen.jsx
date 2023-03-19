// React Hook imports
import { useState, useEffect, useRef } from 'react';

// Native & RNEUI library elements
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button, SearchBar, Image } from '@rneui/themed';

// Project imports
import { apiKey, apiURL, colorPalette as c } from '../Constants';
import PictureCard from '../components/PictureCard';


export default function ArchiveScreen() {

    // useState constants that support the API call process
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pictureResult, setPictureResult] = useState([]);
    const [requestedDate, setRequestedDate] = useState('');
    const [searchInputVal, setSearchInputVal] = useState('');

    // dateInput implements the useRef hook to clear the Input component once the search's been requested
    const dateInput = useRef(null);

    // the value of the Input component is called using the onChangeText attribute below
    const updateSearchInputVal = (searchText) => {        
        setSearchInputVal(searchText);
      };
    
    // The applySearch gets called when the user clicks the Find button, this method will set the requestedDate variable, which will trigger the API call 
    const applySearch = () => {
        setRequestedDate(searchInputVal);
        setSearchInputVal('');
        dateInput.current.blur();
      };

    // The fetch method works similarly to TodayScreen, except the requested date is passed to retrieve a picture from the archive.
    // The useEffect will monitor any changes on the requestedDate, to trigger the API call when the button Find gets clicked again, the PictureCard Component will rerender as new information is requested
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
                <Text style={styles.intro}>Which <Text h2>NASA's Picture of the Day</Text> would you like to see?</Text>
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


// Same as the TodayScreen, the displayPicture will either return:
// the error message in case of being one, the spinner as the API call is being made, another error message in the specific case of a 404 or 400 response from the API which usually occur when an invalid date was requested or the picture of the current day is not up yet
// If the API successfully returns a Picture object, the data is passed to the PictureCard Component and the information is rendered
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