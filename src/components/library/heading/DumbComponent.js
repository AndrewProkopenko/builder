import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
// import { Typography } from '@material-ui/core';

function DumbComponent(props) {
  
    const useStyles = makeStyles((theme) => ({
        myClassName: props.className 
      }));
    const classes = useStyles();
 
    
    const classeForResp = props.isResponsiveFont ? 'resposive-font-size' : '' 

    const renderText = () => {
        if(props.textChildren) { 
            return  <span dangerouslySetInnerHTML={{__html: props.textChildren}}></span>
        }
    }
    
    return (
        <React.Fragment>
             <Box 
                component={props.data.variant} 
                className={`${classes.myClassName} ${classeForResp}`} 
            >
                { renderText() } 
            </Box>


            {/* <Typography variant={props.data.variant} className={[classes.myClassName, classeForResp]} >
                { 
                    props.textChildren
                }
            </Typography> */} 
            

            {/* {  
                React.createElement(`${props.data.variant}`, { className: `${classes.myClassName} ${classeForResp}` }, renderText() ) 
            } */}
        </React.Fragment>
    )
} 

export default DumbComponent
