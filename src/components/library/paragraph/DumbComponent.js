import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

function DumbComponent(props) {
  
    const useStyles = makeStyles((theme) => ({
        myClassName: props.className , 
        imageStyle: props.data.image ? props.data.image.classes : {}
      }));
    const classes = useStyles();
 
 
    return (
        <React.Fragment>
            
            <Typography component={props.data.variant} className={classes.myClassName} > 
                { 
                    props.textChildren
                } 
            </Typography> 
        </React.Fragment>
    )
}

export default DumbComponent
