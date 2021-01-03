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
        themeMode: '',
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
                themeMode: doc.data().themeMode, 
            }) 
        } 
        
      
    }
    createThemeMode(theme) {  
        console.log(theme)
        // const newTheme = {
        //     palette: {
        //         type: '',
        //         background: { 
        //             default: '',
        //             paper: ''
        //         },
        //         primary: {
        //             main: ''
        //         },
        //         secondary: {
        //             main: ''
        //         }
        //     }
        // }
        // if(theme.palette.type === 'dark' ) { 
        //     newTheme.palette.type = theme.palette.type
        //     newTheme.palette.background.default = theme.palette.backgroundDark.default
        //     newTheme.palette.background.paper = theme.palette.backgroundDark.paper
        //     newTheme.palette.primary.main = theme.palette.primaryDark.main
        //     newTheme.palette.secondary.main = theme.palette.secondaryDark.main
        // }
        // if(theme.palette.type === 'light' ) { 
        //     newTheme.palette.type = theme.palette.type
        //     newTheme.palette.background.default = theme.palette.backgroundLight.default
        //     newTheme.palette.background.paper = theme.palette.backgroundLight.paper
        //     newTheme.palette.primary.main = theme.palette.primaryLight.main
        //     newTheme.palette.secondary.main = theme.palette.secondaryLight.main
        // }
        this.setState({
           theme: theme 
        })
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
    async updateTheme(dark, light, mode) {     
        // const exampleTheme = { 
        //     palette: {
        //         type: 'dark',
        //         backgroundLight: {
        //             paper: '#fff',
        //             default: '#f2f2f2', 
        //         },
        //         backgroundDark: {
        //             paper: '#424242',
        //             default: '#363636', 
        //         }, 
        //         primaryLight: {
        //             main: '#1fa67a',
        //         },
        //         primaryDark: {
        //             main: '#142E6F' ,
        //         },
        //         secondaryLight: {
        //             main:  '#db4453' ,
        //         }, 
        //         secondaryDark: {
        //             main:  '#db4453' ,
        //         }, 
        //     }
            
        // } 
        await firebase.db.collection('site1category').doc('categoryList').update({
            themeDark: dark, 
            themeLight: light,
            themeMode: mode
        })  
        await firebase.db.collection('site1category').doc('categoryList').update({
            themeMode: mode
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
                    updateTheme: (dark, light, mode) => {
                        this.setState({
                            themeDark: dark,
                            themeLight: light,
                            themeMode: mode
                        })
                         
                        this.updateTheme(dark, light, mode)
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