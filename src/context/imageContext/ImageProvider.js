import React from 'react';
import  firebase from '../../firebase/firebase'
 
import ImageContext from './ImageContext'
 

export default class ImageProvider extends React.Component { 
 
    async removeImage(name) { 
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
   
   

    render() {
        return(
            <ImageContext.Provider
                value={{  
                    removeImage: (name) => {
                        this.removeImage(name)
                    }  
                }}
            >
                {this.props.children}
            </ImageContext.Provider>
        )
    }
}