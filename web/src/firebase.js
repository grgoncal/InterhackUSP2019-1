import firebase from 'firebase'
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    "YOUR FIREBASE DATA"
};

firebase.initializeApp(config);
firebase.firestore().settings(settings);
export default firebase;