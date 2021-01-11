import React from 'react';
import  firebase from '../../firebase/firebase'
 
import ImageContext from './ImageContext'
 

export default class ImageProvider extends React.Component { 

    state = { 
        imageList: [ 
            {
                name: 'name' , 
                url: 'url', 
                quantity: 2, 

            }
        ],
        nameList: []
    } 

    async componentDidMount() { 
          this.fetchListFromStorage()
          this.fetchListFromFirestore()
    }

    async fetchListFromStorage() {
        const listRef = firebase.storage.ref(); 
        
        let imagesArray = []

        await listRef.listAll().then(function(res) {
            res.items.forEach(function(itemRef) { 
                imagesArray.push(itemRef.fullPath) 
            });
          }).catch(function(error) {
              console.log(error) 
          });
          this.setState({
            imageList: imagesArray
          }) 
    }

    async fetchListFromFirestore() {
        const listRef = firebase.db.collection("site1category").doc('imageList')
        const doc = await listRef.get();
      
        if (!doc.exists) {
            console.log('No such page!');  

        } else { 
            this.setState({
                nameList: doc.data().list
            }) 
        }
    }
    async uploadImage(imageData) {
        let answerUrl
        const storageRef = firebase.storage.ref(`${imageData.name}`).put(imageData)
        storageRef.on('state-changed', 
          snapshot => {
            console.log("image uploaded")
            // console.log( snapshot )
          }, 
          error => {
            console.log(error.message)
          },
          () => { 
            storageRef.snapshot.ref.getDownloadURL()
              .then( url => {
                answerUrl = url 
              })
          }
        )
        return answerUrl
    }

    removeImage(name) { 
        const storageRef = firebase.storage.ref();
 
        const imageRef = storageRef.child(name)
     
        imageRef.delete().then(function() {
            console.log('File deleted successfully')
        }).catch(function(error) {
            console.log(error) 
        }); 
    }

    render() {
        return(
            <ImageContext.Provider
                value={{
                    imageList: this.state.imageList, 
                    nameList: this.state.nameList ,
                    // updateImageNameList: (name) => {
                    //     let newList = this.state.nameList.slice()
                    //     let isUnic = true
                    //     newList.map((item) => {
                    //         if( item === name ) isUnic = false
                    //     })
                    //     if(isUnic) newList.push(name)

                    //     this.setState({
                    //         nameList: newList
                    //     }) 
                    //     firebase.db.collection("site1category").doc('imageList').update({
                    //         list: newList
                    //     })
                    // },
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