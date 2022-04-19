import { Injectable } from '@angular/core';
import { GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { // Inject Firebase auth service
  }

  Username: any = "";
  isLoggedIn = false;

// Sign in with Google
login() {
  console.log("test login");
  this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  console.log("Success for test:")
}


GoogleAuth() {
  console.log("clicked");
  return this.AuthLogin(new GoogleAuthProvider());
}
// Auth logic to run auth providers
AuthLogin(provider: firebase.auth.AuthProvider) {
  return this.afAuth
    .signInWithPopup(provider)
    .then((result) => {

      console.log('You have been successfully logged in as: ', result?.user?.displayName);
      this.isLoggedIn = true;
      this.Username = result?.user?.displayName;
      
      console.log("This is the Username: ", this.Username);
    })
    .catch((error) => {
      console.log(error);
    });
}

logout() {
  firebase.auth().signOut().then(() => {
    console.log("Logged out.");
    this.isLoggedIn = false;
  }).catch((error) => {
    console.log("An error occured logging out: ", error);
  })
}
}