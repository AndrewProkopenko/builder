import React from 'react';

import CategoryContext from './CategoryContext'

import firebase from '../../firebase/firebase'

export default class CategoryProvider extends React.Component { 

    state = { 
        categories: [],
        logo: {
            image: '', 
            mainText: '', 
            subText: ''
        },
        settings: {}, 
        themeDark: {},
        themeLight: {},
        themeMode: localStorage.getItem('siteBuilderThemeMode'),
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
                settings: doc.data().headerSettings, 
                themeDark: doc.data().themeDark, 
                themeLight: doc.data().themeLight,  
            }) 
        } 
        
      
    } 

    async updateCategories(data) {
        console.log('firebase update')
        await firebase.db.collection("site1category").doc('categoryList').update({
            list: data
        })
    }

    async deletePage(slug) {   
        await firebase.db.collection('site1').doc(slug).delete()
    }

    deleteCategory(array) {
        array.map( item => {
            this.deletePage(item)
            return 0
        })
    }

    async updateLogo(logo) {   
        await firebase.db.collection('site1category').doc('categoryList').update({
            logo: logo
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
                    categories: this.state.categories,
                    logo: this.state.logo,
                    settings: this.state.settings,
                    themeMode: this.state.themeMode,
                    themeDark: this.state.themeDark,
                    themeLight: this.state.themeLight,
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
                    updateLogo: (data) => { 
                        this.setState({
                            logo: data
                        })
                        this.updateLogo(data) 
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