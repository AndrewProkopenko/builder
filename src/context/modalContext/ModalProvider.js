import React from 'react';

import ModalContext from './ModalContext'
 

export default class ModalProvider extends React.Component { 

    state = {  
        target: '',
        open: false
    }
 
    render() {
        return(
            <ModalContext.Provider
                value={{
                    target: this.state.target,
                    open: this.state.open,
                    handleOpen: (newTarget) => { 
                        this.setState({
                            open: true, 
                            target: newTarget
                        })
                    }, 
                    handleClose: () => {
                        this.setState({
                            open: false, 
                            target: ''
                        })
                    }
                }}
            >
                {this.props.children}
            </ModalContext.Provider>
        )
    }
}