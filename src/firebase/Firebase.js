import app from 'firebase/app';
import 'firebase/database';

const devConfig = {
  apiKey: process.env.FIREBASE_DEV_API_KEY,
  authDomain: process.env.FIREBASE_DEV_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DEV_DATABASE_URL,
  projectId: process.env.FIREBASE_DEV_PROJECT_ID,
  storageBucket: process.env.FIREBASE_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_DEV_MESSAGING_SENDER_ID,
};

const prodConfig = {
  apiKey: process.env.FIREBASE_PROD_API_KEY,
  authDomain: process.env.FIREBASE_PROD_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_PROD_DATABASE_URL,
  projectId: process.env.FIREBASE_PROD_PROJECT_ID,
  storageBucket: process.env.FIREBASE_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_PROD_MESSAGING_SENDER_ID,
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.database = app.database();
    this.collection = 'collection';
  }

  getCollection = () => this.database.ref(this.collection);

  getCollectionItem = id => this.database.ref(`/${this.collection}/${id}`);

  getCollectionItemData = id => this.database.ref(`/${this.collection}/${id}/data/0`);
}

export default Firebase;
