import React from 'react' 
 
import { makeStyles } from '@material-ui/core/styles'; 
import { Tooltip } from '@material-ui/core';

function DumbComponent(props) {
  
    const useStyles = makeStyles(() => ({ 
        imageStyle: props.image.classes
      }));
    const classes = useStyles(); 

    const titleImg = props.image.title ? props.image.title : '' 
 
    return ( 
        <Tooltip title={titleImg} placement={props.image.placement}>
            <img 
                src={props.imageUrl} 
                className={classes.imageStyle}   
                alt={titleImg}
            />  
        </Tooltip>  
    )
}

export default DumbComponent
