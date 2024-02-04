// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
	apiKey: "AIzaSyBiK6M8H2jGynNPdBLfrZMvhz0GVMIF--A",
	authDomain: "linkloomchatapp.firebaseapp.com",
	projectId: "linkloomchatapp",
	storageBucket: "linkloomchatapp.appspot.com",
	messagingSenderId: "719770982580",
	appId: "1:719770982580:web:a2ecf196f1f1c6ee2bdfe1",
	measurementId: "G-KZGXEMYT3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage }
