// React Hook imports
import { useState, useEffect } from 'react';

// Native & RNEUI library elements
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Image } from '@rneui/themed';

// Project imports
import { apiKey, apiURL, colorPalette as c } from '../Constants';
import PictureCard from '../components/PictureCard';


export default function TodayScreen() {

    // useState constants that support the API call process
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pictureResult, setPictureResult] = useState([]);

    // The fetch method gets called inside the useEffect hook to load today's Picture of the Day when the components gets mounted.
    // The API's JSON response gets transformed to a javascript object using the .json() method
    // Then the data result is set using setPictureResult(), isLoaded is now true, so the spinner will disappear.
    // If there's an error, the received message will be assigned to the error variable.
    useEffect(() => {

        const uri = `${apiURL}?api_key=${apiKey}&thumbs=true`;

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
        )

    }, []);

    // TodayScreen returns the result of the displayPicture() method below
    return (
        <ScrollView style={styles.wrapper}>
            {displayPicture(error, isLoaded, pictureResult)}
        </ScrollView>
    );
}


// displayPicture will either return:
// the error message in case of being one, the spinner as the API call is being made, another error message in the specific case of a 404 or 400 response from the API which usually occur when an invalid date was requested or the picture of the current day is not up yet
// If the API successfully returns a Picture object, the data is passed to the PictureCard Component and the information is rendered
function displayPicture(error, isLoaded, pictureResult) {

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
            <PictureCard itemData={pictureResult} />
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