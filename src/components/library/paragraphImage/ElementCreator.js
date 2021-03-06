import React, {useContext} from 'react' 

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
                    data={props.item} 
                    reSaveChildren={props.reSaveChildren}
                    removeItem={props.removeItem}  
                    swapChildrens={props.swapChildrens}
                    isFirst={props.isFirst}
                    isLast={props.isLast}
                />
            }
 
            {
                !modeDev && 
                <DumbComponent 
                    data={props.item} 
                    className={props.item.classes} 
                    imageClassName={props.item.image.classes}
                    imageUrl={props.item.image.url}
                    prop={props.item.prop} 
                    textChildren={props.item.text} 
                />
            } 
        </React.Fragment> 
    )
}

export default ElementCreator
