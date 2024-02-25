import { app } from './firebase_init.js';

import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'

export const db = getFirestore(app);