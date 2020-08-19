import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA63QAN1jNCAAjgDjejZbEAHbAmMkFtCas",
    authDomain: "dwoods-xyz.firebaseapp.com",
    databaseURL: "https://dwoods-xyz.firebaseio.com",
    projectId: "dwoods-xyz",
    storageBucket: "dwoods-xyz.appspot.com",
    messagingSenderId: "101446357899",
    appId: "1:101446357899:web:7939d02fe283537d8a958e",
    measurementId: "G-YFPHEQDMB9"
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const postsCollection = db.collection('posts')

export {
    db,
    postsCollection
}