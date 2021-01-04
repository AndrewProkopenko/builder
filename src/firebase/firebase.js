import firebase from 'firebase'
 
const firebaseConfig = {
    apiKey: "AIzaSyBmMnCcIyz_t3G5Ia3zaiiMTLtQyrUt1Eg",
    authDomain: "sitebuilder-74d57.firebaseapp.com",
    projectId: "sitebuilder-74d57",
    storageBucket: "sitebuilder-74d57.appspot.com",
    messagingSenderId: "590275119909",
    appId: "1:590275119909:web:5d50bcbd54a317647428cc"
}; 
 

class Firebase { 
    constructor() {
        const firebaseApp =  firebase.initializeApp(firebaseConfig)
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