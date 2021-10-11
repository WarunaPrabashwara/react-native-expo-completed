import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDXY5LpY2-S1KPOsz4LzSLU7ffxRTSN1Mk",
    authDomain: "secondeffort-38704.firebaseapp.com",
    projectId: "secondeffort-38704",
    storageBucket: "secondeffort-38704.appspot.com",
    messagingSenderId: "383534170520",
    appId: "1:383534170520:web:d098ef7d839b129496abed"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;