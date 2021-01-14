import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
// import { Typography } from '@material-ui/core';

function DumbComponent(props) {
  
    const useStyles = makeStyles((theme) => ({
        myClassName: props.className ,
        resposiveFontSize: { 
            [`@media (max-width: 960px)`]: {
                fontSize: props.className.fontSize*0.8, 
                marginTop: props.className.marginTop*0.8,
                marginBottom: props.className.marginBottom*0.8
            },
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                fontSize: props.className.fontSize*0.6,
                lineHeight : 1.2, 
                marginTop: props.className.marginTop*0.5, 
                marginBottom: props.className.marginBottom*0.5, 
                textAlign: 'center'
            },
        }
      }
    ));
    const classes = useStyles();
 
    
    const classeForResp = props.data.responseFont ? classes.resposiveFontSize : '' 

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
