import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Tooltip } from '@material-ui/core';
 

function DumbComponent(props) {
  
    const useStyles = makeStyles((theme) => ({
        myClassName: props.className , 
        imageStyle: props.imageClassName ? props.imageClassName : {}
      })); 
    const classes = useStyles();
 
    const title = props.data.image.title ? props.data.image.title : ''
 
    return (
        <React.Fragment>
            
            <Typography component={props.data.variant} className={classes.myClassName} >
                {
                    props.data.image.url &&
                    <Tooltip title={title} placement={props.data.image.placement}>
                         <img src={props.data.image.url} className={classes.imageStyle} alt={title} /> 
                    </Tooltip> 
                }
                {/* <div dangerouslySetInnerHTML={{__html: props.textChildren}}></div> */}
               <span style={{ display: 'inherit' }}>
                { 
                    props.textChildren
                } 
               </span>
            </Typography> 
        </React.Fragment>
    )
}

export default DumbComponent
