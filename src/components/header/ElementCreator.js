import React from 'react' 

import StyledComponent from "./StyledComponent"
import DumbComponent from "./dumb/DumbComponent"
 
import ModeContext from '../../context/modeContext/ModeContext' 
 
function ElementCreator() {

    const {modeDev} = React.useContext(ModeContext) 
    
    return (    
        <React.Fragment>   
            {
                modeDev && 
                <StyledComponent />
            }
 
            {
                !modeDev && 
                <DumbComponent/>
            } 
        </React.Fragment> 
    )
}

export default ElementCreator
