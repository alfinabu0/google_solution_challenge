import { auth } from './auth_init.js';
import { db } from './firestore_init.js';
import { getDoc, doc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut ,updateProfile} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';


export function signUp() {
    console.log('Signing up');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const displayName = document.getElementById('username').value;
    createUserWithEmailAndPassword(auth,email, password).then((userCredential) => {
        console.log('User signed up');
        
        // update the user's display name
        updateProfile(auth.currentUser, {
            displayName: displayName
        }).then(() => {
            // Profile updated!
            console.log('Profile updated');
            window.location.href = './choose.html';
            // ...
        }).catch((error) => {
            // An error occurred
            console.log('Error updating profile');
        });
        

        
    }).catch((error) => { 
        console.log('Error signing up : ' + error.message);
    });
}

export function signIn() { 
    console.log('signing in');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        console.log('User signed in');
        // check the user's role
        const userId = userCredential.user.uid;
        getDoc(doc(db, 'users', userId)).then((doc) => { 
            if (doc.exists()) {
                console.log('User role: ' + doc.data().role);
                switch (doc.data().role) {
                    case 'ideator':
                        window.location.href = './ideator.html';
                        break;
                    case 'developer':
                        window.location.href = './builder.html';
                        break;
                }
            } else {
                console.log('No such document');
            }
        });
    }).catch((error) => {
        console.log('Error signing in : ' + error.message);
    });
}

export function signOutUser() { }

export function onAuthStateChange(successCallback, failureCallback) { 
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            console.log('User is signed in');
            successCallback(user);
        } else {
            // No user is signed in
            console.log('No user is signed in');
            failureCallback();
        }
    });

}

export function getUserId() {
    return auth.currentUser.uid;
}