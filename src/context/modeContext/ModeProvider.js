import React from 'react';

import ModeContext from './ModeContext'

import firebase from '../../firebase/firebase'

export default class ModeProvider extends React.Component { 

    state = {  
        isLogin: false,
        user: null
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged( (user) => {
            if(user) {  
                if(window.innerWidth > 959) { 
                    this.setState({
                        isLogin: true,
                        user: user
                    })
                } 
                else this.setState({
                    isLogin: false,
                    user: user
                })
            }
            else { 
                console.log('no user')
                this.setState({
                    isLogin: false,
                    user: null
                })
            }
        })
    }

    render() {
        return(
            <ModeContext.Provider
                value={{
                    modeDev: this.state.isLogin,
                    user: this.state.user
                }}
            >
                {this.props.children}
            </ModeContext.Provider>
        )
    }
}