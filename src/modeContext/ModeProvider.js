import React from 'react';

import ModeContext from './ModeContext'

export default class ModeProvider extends React.Component { 

    state = {
        modeDev: true
        // modeDev: false
    }

    render() {
        return(
            <ModeContext.Provider
                value={{
                    modeDev: this.state.modeDev
                }}
            >
                {this.props.children}
            </ModeContext.Provider>
        )
    }
}