import React, {useContext} from 'react' 

import StyledComponent from "./StyledComponent"
import DumbComponent from "./DumbComponent"
 
import ModeContext from '../../../context/modeContext/ModeContext'
 
function ElementCreator(props) {

    const {modeDev} = useContext(ModeContext)   
   
    return (    
        <React.Fragment>  
            {
                modeDev ? 
                <StyledComponent  
                    data={props.item} 
                    reSaveChildren={props.reSaveChildren}
                    removeItem={props.removeItem}  
                    swapChildrens={props.swapChildrens}
                    isFirst={props.isFirst}
                    isLast={props.isLast}
                />
                :
                <DumbComponent 
                    data={props.item} 
                    className={props.item.classes}  
                />
            }
        </React.Fragment> 
    )
}

export default ElementCreator
