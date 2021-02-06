  
import firebase from '../../firebase/firebase'
 
const RemoveImage = async (name) => { 
    console.log(name)
    if(name !== '') {
        const storageRef = firebase.storage.ref();

        const imageRef = storageRef.child(name)
    
        try {
            await imageRef.delete().then(function() {
                console.log('File deleted successfully')
            }).catch(function(error) {
                console.log(error) 
            }); 
        } catch (error) {
            console.log(error)
        }
    }  
} 

export { RemoveImage }
