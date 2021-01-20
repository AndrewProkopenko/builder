import React from 'react';

import CategoryContext from './CategoryContext'

import firebase from '../../firebase/firebase'

export default class CategoryProvider extends React.Component { 

    state = { 
        idArrayForDelete: [],
        categories: [],
        logo: {
            image: '', 
            mainText: '', 
            subText: ''
        },
        modalHeader: {
            isModal: false, 
            color: '',  
            text: '' 
        },
        settings: {}, 
        themeDark: {},
        themeLight: {},
        themeMode: localStorage.getItem('siteBuilderThemeMode'),
        
        // imageList: [], 
    }
    
 
    


    async componentDidMount() {
        const categoryRef = firebase.db.collection("site1category").doc('categoryList')
        const doc = await categoryRef.get();
         

        if (!doc.exists) {
            console.log('No such categories!'); 
        } 
        else { 
            this.setState({
                categories: doc.data().list,
                logo: doc.data().logo,
                modalHeader: doc.data().modalHeader,
                settings: doc.data().headerSettings, 
                themeDark: doc.data().themeDark, 
                themeLight: doc.data().themeLight,  
            }) 
        } 
        
        // this.fetchListFromStorage()
    } 
    // fetchListFromStorage() {
    //     const listRef = firebase.storage.ref(); 
        
    //     let imagesArray = []

    //     listRef.listAll()
    //     .then( 
    //         function(res) {
    //             res.items.forEach(function(itemRef) { 
    //                 imagesArray.push(itemRef.fullPath)
    //             }) 
    //         }
    //     )
    //     .then( () => {
    //         this.setState({
    //             imageList: imagesArray
    //         })
    //     })
    //     .catch(function(error) {
    //         console.log(error) 
    //     });


        

    //     setTimeout(() => {
    //         console.log(this.state.imageList, imagesArray)
    //     }, 700);
        
    // }

    async updateCategories(data) { 
        await firebase.db.collection("site1category").doc('categoryList').update({
            list: data
        })
    }

    async deletePage(slug) {    
        // const pageRef = firebase.db.collection("site1").doc(slug)
        // const doc = await pageRef.get();
        
        // let idArray = []

        // if (!doc.exists) {
        //     console.log('No such page!');  
        // } else { 
        //     const items = doc.data().items
        //     items.forEach(item => {
        //         if(item.type === 'container') { 
        //             item.children.forEach( child => {
        //                 if(child.type === 'paragraphImage') {
        //                     idArray.push(child.id)
        //                 }
        //             })
        //         }
        //         else {  
        //             idArray.push(item.id)
        //         }
        //     });
        // }
        // this.setState({
        //     idArrayForDelete: idArray
        // })

        // await pageRef.delete()
        // // .then( () => {
        // //     setTimeout(() => {
        // //         this.setState({
        // //             idArrayForDelete: []
        // //         })
        // //     }, 1000);
        // // })
        // .then( () => {
        //     this.state.imageList.forEach( imageName => {
        //         idArray.forEach(id => {
        //             if(imageName.includes(id)) this.removeImage(imageName)
        //         })
        //     })
        // })
        await firebase.db.collection('site1').doc(slug).delete()
    }
    // async removeImage(name) { 
    //     if(name !== '') {
    //         const storageRef = firebase.storage.ref();
 
    //         const imageRef = storageRef.child(name)
        
    //         try {
    //             await imageRef.delete().then(function() {
    //                 console.log('File deleted successfully')
    //             }).catch(function(error) {
    //                 console.log(error) 
    //             }); 
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // }

    deleteCategory(array) {
        array.map( item => {
            this.deletePage(item)
            return 0
        })
    }

    async updateLogo(logo, modal) {   
        await firebase.db.collection('site1category').doc('categoryList').update({
            logo: logo,
            modalHeader: modal
        })
    }
    async updateSettings(settings) {   
        await firebase.db.collection('site1category').doc('categoryList').update({
            headerSettings: settings
        })
    }
    async updateTheme(dark, light) {     
      
        await firebase.db.collection('site1category').doc('categoryList').update({
            themeDark: dark, 
            themeLight: light, 
        })   
        
    }

    render() {
        return(
            <CategoryContext.Provider
                value={{
                    idArrayForDelete: this.state.idArrayForDelete, 
                    categories: this.state.categories,
                    logo: this.state.logo,
                    modal: this.state.modalHeader,
                    settings: this.state.settings,
                    themeMode: this.state.themeMode,
                    themeDark: this.state.themeDark,
                    themeLight: this.state.themeLight,
                    clearArrayForDelete: () => {
                        this.setState({
                            idArrayForDelete: []
                        })
                    }, 
                    setThemeMode: (mode) => { 
                        localStorage.setItem('siteBuilderThemeMode', mode)
                        this.setState({
                            themeMode: mode
                        })
                    },
                    updateTheme: (dark, light) => {
                        this.setState({
                            themeDark: dark,
                            themeLight: light 
                        })
                         
                        this.updateTheme(dark, light)
                    },
                    updateLogo: (logo, modal) => { 
                        this.setState({
                            logo: logo,
                            modalHeader: modal
                        })
                        this.updateLogo(logo, modal) 
                    }, 
                    updateSettings: (data) => { 
                        this.setState({
                            settings: data
                        })
                        this.updateSettings(data) 
                    }, 
                    setCategories: (data) => {
                        this.setState({
                            categories: data
                        })
                        this.updateCategories(data) 
                    }, 
                    deletePageFromFirebase: (slug) => {
                        this.deletePage(slug)
                    },
                    deleteCategoryFromFirebase: (array) => {
                        this.deleteCategory(array)
                    }
                }}
            >
                {this.props.children}
            </CategoryContext.Provider>
        )
    }
}