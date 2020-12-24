import React from 'react';

import LoadingContext from './LoadingContext'
 

export default class LoadingProvider extends React.Component { 

    state = { 
        isLoading: true 
    }
  
    render() {
        return(
            <LoadingContext.Provider
                value={{
                    isLoading: this.state.isLoading,
                    setIsLoading: (value) => { 
                        this.setState({
                            isLoading: value
                        })
                    } 
                }}
            >
                {this.props.children}
            </LoadingContext.Provider>
        )
    }
}