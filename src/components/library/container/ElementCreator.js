import React from 'react' 

import StyledComponent from "./StyledComponent"
import DumbComponent from "./DumbComponent"
 
import ModeContext from '../../../context/modeContext/ModeContext'
 
function ElementCreator(props) {

    const {modeDev} = React.useContext(ModeContext)  
    
    const propsSettings = {
        maxWidth: props.data.maxWidth,
        disableGutters: props.data.disableGutters,
        fixed: props.data.fixed, 
        innerContainer: props.data.innerContainer, 
    } 

    return (    
        <React.Fragment>  
            {
                modeDev ? 
                <StyledComponent 
                    data={props.data} 
                    reSaveContainer={props.reSaveContainer}
                    reSaveContainerStyleSettings={props.reSaveContainerStyleSettings}  
                    swapContainer={props.swapContainer}
                    removeContainer={props.removeContainer}
                    reSaveItem={props.reSaveItem}
                    isFirst={props.isFirst}
                    isLast={props.isLast}
                />
                :
                <DumbComponent 
                    data={props.data}  
                    classes={props.data.classes}
                    reSaveContainer={props.reSaveContainer} 
                    settings={propsSettings}
                />
            } 
        </React.Fragment> 
    )
}

export default ElementCreator
