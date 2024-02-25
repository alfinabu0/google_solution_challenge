import { getUserId } from "./auth.js";
import { db } from "./firestore_init.js";
import {doc, setDoc} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

document.addEventListener('click', (e) => { 
    if (e.target.tagName === 'BUTTON') { 
        if (e.target.id === 'ideator' || e.target.id === 'developer') {
            const userId = getUserId();
            console.log('User ID: ' + userId);
            //create a document to users collection with doc id as user id
            //set the role field to the button id
            setDoc(doc(db, 'users', userId), {
                uid: userId,
                role: e.target.id

            }).then(() => {
                console.log('User role set');
                switch (e.target.id) {
                    case 'ideator':
                        window.location.href = './ideator.html';
                        break;
                    case 'developer':
                        window.location.href = './builder.html';
                        break;
                }
            }).catch((error) => {
                console.log('Error setting user role: ' + error.message);
            });

        }
    }
});