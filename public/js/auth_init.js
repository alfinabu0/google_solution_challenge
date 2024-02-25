import { app } from "./firebase_init.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

console.log('auth_init.js');
export const auth = getAuth(app);