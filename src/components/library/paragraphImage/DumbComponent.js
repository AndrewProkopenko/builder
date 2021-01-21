import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Tooltip } from '@material-ui/core';  

function DumbComponent(props) { 
  
    const useStyles = makeStyles((theme) => ({
        myClassName: props.className , 
        imageStyle: props.imageClassName ? props.imageClassName : {},
        imageStabilization: {
            maxWidth: '100%', 
            maxHeight: '100%',  
            [`@media (max-width: ${props.imageClassName.width}px)`]: {
                height: 'auto'
            }, 
            // [theme.breakpoints.down('md')]: { 
            // }
        },
        mobileClass: {
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                display: "flex !important",
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center', 
                marginTop: props.className.marginTop*0.5, 
                marginBottom: props.className.marginBottom*0.5,
                '& span': {
                    marginTop: theme.spacing(1)
                }
            }, 
            [`@media (max-width: ${props.imageClassName.width}px)`]: {
                display: "flex !important",
                flexDirection: 'column', 
                '& span': {
                    marginTop: theme.spacing(1)
                }
            }, 
        }
      })); 
    const classes = useStyles();
 
    const title = props.data.image.title ? props.data.image.title : ''
 
    return (
        <React.Fragment>
            
            <Typography component={props.data.variant} className={`${classes.myClassName} ${classes.mobileClass}`} >
                {
                    props.imageUrl &&
                    <Tooltip title={title} placement={props.data.image.placement}>
                         <img src={props.imageUrl} className={`${classes.imageStyle} ${classes.imageStabilization}`}  alt={title} /> 
                    </Tooltip> 
                } 
                
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
