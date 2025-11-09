/**
 * Firebase initialization with Firestore + Auth.
 * Replace the firebaseConfig with your project's values or use Vite env vars.
 *
 * For Google Sign-In, make sure Google provider is enabled in your Firebase console.
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  // add other fields if necessary
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export async function signInWithGoogle(){
  return signInWithPopup(auth, googleProvider)
}

export async function signOut(){
  return fbSignOut(auth)
}

// Helper to build a user's transactions collection reference path
export function userTransactionsRef(uid){
  return collection(db, 'users', uid, 'transactions')
}
