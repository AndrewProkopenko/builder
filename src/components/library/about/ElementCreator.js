import React, { useContext } from 'react' 

import StyledComponent from "./StyledComponent"
import DumbComponent from "./DumbComponent"
 
import ModeContext from '../../../context/modeContext/ModeContext'
 
function ElementCreator(props) {

    const {modeDev} = useContext(ModeContext)  
   
    return (    
        <React.Fragment>  
            {
                modeDev && 
                <StyledComponent 
                    data={props.data}
                    swapContainer={props.swapContainer}
                    removeContainer={props.removeContainer}
                    reSaveItem={props.reSaveItem}
                    isFirst={props.isFirst}
                    isLast={props.isLast}
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
