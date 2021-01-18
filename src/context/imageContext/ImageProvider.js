import React from 'react';
import  firebase from '../../firebase/firebase'
 
import ImageContext from './ImageContext'
 

export default class ImageProvider extends React.Component { 

    state = { 
        imageAnswerUrl: '', 
        imageList: [ ], 
    } 

    async componentDidMount() { 
        //   this.fetchListFromStorage()
          this.fetchListFromFirestore()
    }

    // async fetchListFromStorage() {
    //     const listRef = firebase.storage.ref(); 
        
    //     let imagesArray = []

    //     await listRef.listAll().then(function(res) {
    //         res.items.forEach(function(itemRef) { 
    //             imagesArray.push(itemRef.fullPath) 
    //         });
    //       }).catch(function(error) {
    //           console.log(error) 
    //       });
    //       this.setState({
    //         imageList: imagesArray
    //       }) 
    // }

    async addImageToList(newImage, oldName) {
        const newList = this.state.imageList.slice()
        let newItem
        let isNew = true
        let isNeedUpdate = newImage.name === oldName ? false : true 
        if(isNeedUpdate) { 
            for(let i = 0; i < newList.length; i++) {
                if(newList[i].name === newImage.name) {
                    //уже было загружено
                    newList[i].quantity++ 
                    isNew = false
                }
                if(newList[i].name === oldName) {
                    //уже было загружено
                    newList[i].quantity--  
                    if( newList[i].quantity === 0 ) { 
                        this.removeImage(oldName) 
                        newList.splice(i, 1)
                    }
                }
            }
            if(isNew) {
                newItem = {
                    name: newImage.name, 
                    url: newImage.url, 
                    quantity: 1
                }
                newList.push(newItem)
            }
        }
        else { 
            console.log(newImage, oldName)
        }
         
        this.setState({
            imageList: newList
        })
 
        console.log(this.state.imageList, oldName)

        this.updateList(newList)
    }

    async fetchListFromFirestore() {
        const listRef = firebase.db.collection("site1category").doc('imageList')
        const doc = await listRef.get();
      
        if (!doc.exists) {
            console.log('No such page!');  

        } else { 
            this.setState({
                imageList: doc.data().list
            }) 
        }
    }
    async uploadImage(imageData, oldName) { 
        const storageRef = await firebase.storage.ref(`${imageData.name}`).put(imageData)
        const downloadURL = await storageRef.ref.getDownloadURL();
 
        const newImage = {
            url: downloadURL, 
            name: imageData.name, 
            quantity: 1
        }
        this.addImageToList(newImage, oldName)
  
    }
    async updateList(newList) {
        await firebase.db.collection("site1category").doc("imageList").update({
            list: newList, 
        }).then(() => { 
            this.setState({
                imageList: newList
            })
        })
    }

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
    removeImageFromStoreAndList(name) {
        console.log(name)
        const newList = this.state.imageList.slice()
        newList.map( (item, index) => {
            if(item.name === name) {
                item.quantity--
                if(item.quantity === 0) newList.splice(index, 1)
            }
        })
        this.setState({
            imageList: newList
        })  
        this.removeImage(name)
        this.updateList(newList)
    }
   

    render() {
        return(
            <ImageContext.Provider
                value={{
                    imageList: this.state.imageList, 
                    nameList: this.state.nameList ,
                    
                    removeImage: (name) => {
                        this.removeImage(name)
                    },
                    removeImageFromStoreAndList: (name) => {
                        this.removeImageFromStoreAndList(name)
                    },
                    uploadImage: (data, name) => {
                        this.uploadImage(data, name)
                    }
                }}
            >
                {this.props.children}
            </ImageContext.Provider>
        )
    }
}