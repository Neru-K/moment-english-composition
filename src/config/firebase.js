// config/firebase.js

const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');
const { getStorage } = require('firebase/storage');
require('dotenv').config(); // 環境変数を読み込む

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID, // オプションでAnalytics使用する場合
};

// Firebaseアプリを初期化
const firebaseApp = initializeApp(firebaseConfig);

// Firebaseサービスをエクスポート
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

module.exports = { auth, db, storage };
