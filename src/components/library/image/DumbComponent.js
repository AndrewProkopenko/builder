import React from 'react' 
 
import { makeStyles } from '@material-ui/core/styles'; 
import { Tooltip } from '@material-ui/core';

function DumbComponent(props) {
  
    const useStyles = makeStyles((theme) => ({ 
        imageStyle: props.image.classes
      }));
    const classes = useStyles(); 

    const titleImg = props.image.title ? props.image.title : '' 
 
    return (
        <React.Fragment> 
            <Tooltip title={titleImg} placement={props.image.placement}>
                <img 
                    src={props.image.url} 
                    className={classes.imageStyle}   
                    alt={titleImg}
                />  
            </Tooltip>
          
        </React.Fragment>
    )
}

export default DumbComponent
