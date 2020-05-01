require('dotenv').config();

const admin = require('firebase-admin');

const serviceAccount = require(process.env.FIREBASE_ADMIN_KEY_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

module.exports.db = db;
module.exports.auth = auth;
