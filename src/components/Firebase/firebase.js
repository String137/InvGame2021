import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyDE-rkv3YppYCMJkdU6yVpFf0safqNBcPw",
  authDomain: "invgame2021.firebaseapp.com",
  projectId: "invgame2021",
  storageBucket: "invgame2021.appspot.com",
  messagingSenderId: "813200689074",
  appId: "1:813200689074:web:d79340114945f39be886ab",
  measurementId: "G-V7TWC87084"
};
class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users/');

  company = (name) => this.db.ref(`companies/${name}`)

}

export default Firebase;