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
            console.log('cat data:', doc.data());
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
                        console.log(data)
                    } 
                }}
            >
                {this.props.children}
            </CategoryContext.Provider>
        )
    }
}