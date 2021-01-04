import React from 'react';

import LibraryContext from './LibraryContext'
  
import library from '../../data/library.json'

export default class LibraryProvider extends React.Component { 

    state = { 
        layouts: library
    }
 
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