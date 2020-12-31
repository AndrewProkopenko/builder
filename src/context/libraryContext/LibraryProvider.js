import React from 'react';

import LibraryContext from './LibraryContext'

import firebase from '../../firebase/firebase'

import library from '../../data/library.json'

export default class LibraryProvider extends React.Component { 

    state = { 
        layouts: library
    }

    // async componentDidMount() {
    //     await firebase.auth.onAuthStateChanged( async (user) => {
    //         if(user) {  
    //             const layoutsRef = firebase.db.collection("library").doc('layouts')
    //             const doc = await layoutsRef.get();
                
    //             if (!doc.exists) {
    //                 console.log('No such document!'); 
    //             } 
    //             else {
    //                 console.log('Layouts:', doc.data());
                    
    //                 this.setState({
    //                     layouts: doc.data()
    //                 })
    //             }
    //         }
    //         else { 
    //             console.log('no user') 
    //         }
    //     })
    // }

    render() {  
        return(
            <LibraryContext.Provider
                value={{ 
                    layouts: this.state.layouts 
                }}
            >
                {this.props.children}
            </LibraryContext.Provider>
        )
    }
}