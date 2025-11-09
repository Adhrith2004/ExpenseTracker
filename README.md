## Expense Tracker (React + Firestore + Auth)

Google Sign-In authentication and per-user transactions.

- Google Sign-In (Firebase Auth)
- Each user's transactions are stored under `users/{uid}/transactions`
- App shows Sign in / Sign out and user info in header
- Transactions only visible to the signed-in user

## Setup
1. Install dependencies:
```
npm install
```

2. Create a Firebase project. Enable:
 - Firestore (in native mode)
 - Authentication → Google provider

3. Add your Firebase config to environment or directly into `src/firebase.js`.
Use `.env` with variables like:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
```

4. Run dev server:
```
npm run dev
```

## Firestore rules (basic per-user rule)
This example allows users to read/write only their own `transactions` subcollection.
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/transactions/{txId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
Make sure to test and adjust rules for your use case.
