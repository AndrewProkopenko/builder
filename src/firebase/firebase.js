import firebase from 'firebase'
 
import { config } from './firebaseConfig'  
  
class Firebase { 
    constructor() {
        const firebaseApp =  firebase.initializeApp(config)
        this.db = firebaseApp.firestore()
        this.storage = firebaseApp.storage()
        this.auth = firebaseApp.auth() 
    }   
    async registerWithGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = result.credential.accessToken;
            // // The signed-in user info.
            // var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
          }); 
    }
    async registerWithEmail(email, password) { 
        await this.auth.createUserWithEmailAndPassword(email, password) 
    }
    async loginWithEmail(email, password) { 
        return this.auth.signInWithEmailAndPassword(email, password)
    }
    async logout() {
        return this.auth.signOut()
    }
}
 
export default new Firebase()