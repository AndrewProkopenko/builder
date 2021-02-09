import React, {useContext} from 'react'

import ModeContext from '../../context/modeContext/ModeContext'


import StyledComponent from "./StyledComponent"
import DumbComponent from "./DumbComponent"


const  SinglePageCreator = (props) => {

    const {modeDev} = useContext(ModeContext)  
    
    return (    
        <React.Fragment>  
            {
                modeDev ?
                <StyledComponent {...props} />
                :
                <DumbComponent {...props} />
            } 
        </React.Fragment> 
    )
} 

export default SinglePageCreator
