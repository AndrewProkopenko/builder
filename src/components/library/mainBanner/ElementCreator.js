import React from 'react' 

import StyledComponent from "./StyledComponent"
import DumbComponent from "./DumbComponent"
 
import ModeContext from '../../../context/modeContext/ModeContext'
 
function ElementCreator(props) {

    const {modeDev} = React.useContext(ModeContext)  
   
    return (    
        <React.Fragment>  
            {
                modeDev && 
                <StyledComponent 
                    data={props.data}
                />
            }
 
            {
                !modeDev && 
                <DumbComponent 
                    data={props.data}
                />
            } 
        </React.Fragment> 
    )
}

export default ElementCreator
