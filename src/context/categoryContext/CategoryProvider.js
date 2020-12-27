import React from 'react';

import CategoryContext from './CategoryContext'

import firebase from '../../firebase/firebase'

export default class CategoryProvider extends React.Component { 

    state = { 
        categories: [] 
    }

    async componentDidMount() {
        const categoryRef = firebase.db.collection("site1category").doc('categoryList')
        const doc = await categoryRef.get();
        if (!doc.exists) {
            console.log('No such categories!'); 
          } else { 
            this.setState({
                categories: doc.data().list
            })
          } 
    }

    async updateCategories(data) {
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

    render() {
        return(
            <CategoryContext.Provider
                value={{
                    categories: this.state.categories,
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