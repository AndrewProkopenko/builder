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
        console.log("constructor")
    }   
}

// .collection('test') - имя сайта (site1, site2)
// .doc() - имя документа для обозначения страницы (можно использовать дефолтные, но тогда нужно передавать какую именно страницу обновляем )
  
export default new Firebase()