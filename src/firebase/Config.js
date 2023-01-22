import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from './info'
firebase.initializeApp(firebaseConfig);
const projectFireStore = firebase.firestore();
const projectFireAuth = firebase.auth();
const createTime = firebase.firestore.Timestamp;
export { projectFireStore, projectFireAuth, createTime };
