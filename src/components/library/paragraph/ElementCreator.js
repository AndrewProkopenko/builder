import React from 'react' 

import StyledComponent from "./StyledComponent"
import DumbComponent from "./DumbComponent"
 
import ModeContext from '../../../context/modeContext/ModeContext'
 
function ElementCreator(props) {

    const {modeDev} = React.useContext(ModeContext)   
   
    return (   
        // !!data.classes &&
        <React.Fragment>  
            {
                modeDev && 
                <StyledComponent  
                    data={props.item} 
                    reSaveChildren={props.reSaveChildren}
                    removeItem={props.removeItem}  
                />
            }
 
            {
                !modeDev && 
                <DumbComponent 
                    data={props.item} 
                    className={props.item.classes} 
                    prop={props.item.prop} 
                    textChildren={props.item.text} 
                />
            } 
        </React.Fragment> 
    )
}

export default ElementCreator
