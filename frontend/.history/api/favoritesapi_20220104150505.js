import firebase from 'react-native-firebase'

export function addFavorites(location, addComplete) {

    firebase.firestore()
    .collection('favoritelist')
    .add({
        locationid: location.reference,
        createdAt: firebase.firestore.FiedValue.serverTimestamp()
    }).then((data) => addComplete(data))
    .catch((error) => console.log(error))
}

export function getGeolocation(long, lat, type) {
    var snapshot = await firebase.firestore()
    .collection('Foods')
}