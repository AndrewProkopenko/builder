import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

function DumbComponent(props) {
  
    const useStyles = makeStyles((theme) => ({
        myClassName: props.className 
      }));
    const classes = useStyles();
 
    
    const classeForResp = props.isResponsiveFont ? 'resposive-font-size' : '' 

    // const renderText = () => {
    //     if(props.textChildren) return props.textChildren.map((item) => { 
    //         return item
    //     }) 
    // }
    
    return (
        <React.Fragment>
            <Typography variant={props.data.variant} className={[classes.myClassName, classeForResp]} >
                { 
                    props.textChildren
                }
            </Typography>
            {/* {  
                React.createElement(`${props.data.variant}`, { className: classes.myClassName }, renderText()  ) 
            } */}
        </React.Fragment>
    )
}

export default DumbComponent
