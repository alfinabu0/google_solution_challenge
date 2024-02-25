import { db } from "./firestore_init.js";
import { auth } from "./auth_init.js";
import {collection, addDoc} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

export function saveIdea() { 
    console.log('Saving idea');
    console.log('User ID: ' + auth.currentUser.uid)
    const doc = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        ideatorId: auth.currentUser.uid
    };

    if(doc.title === '' || doc.description === '') {
        alert('Please fill in all fields');
        return;
    }

    addDoc(collection(db, 'ideas'), doc).then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        window.location.href = './ideator.html';
    }).catch((error) => {
        console.error('Error adding document: ', error);
    });
}