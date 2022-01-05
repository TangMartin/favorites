import firebase from 'react-native-firebase'

export function addFavorites(location) {

    firebase.firestore()
    .collection('favoritelist')
    .add({
        locationid: location.reference,
        createdAt: firebase.firestore.FiedValue.serverTimestamp()
    }).then((data) => addComplete(data))
    .catch((error) => console.log(error))
}