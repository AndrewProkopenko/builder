import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Tooltip } from '@material-ui/core';  
import {getColorByPalette} from '../../functions/colorChanger/ColorCalculation'

function DumbComponent(props) { 
    
    const useStyles = makeStyles((theme) => {
        let  color = getColorByPalette(theme, props.className.color)
        let  backgroundColor = getColorByPalette(theme, props.className.backgroundColor)
        let  borderColor = getColorByPalette(theme, props.className.borderColor)
        let  imageBorderColor = getColorByPalette(theme, props.imageClassName.borderColor)
        function computedContrastColor() {
            if(color !== 'contrast') return color
            if(backgroundColor !== 'inherit') return theme.palette.getContrastText(backgroundColor)
            return color
        }
        return({
            myClassName: {...props.className, ...{
                color: computedContrastColor(),  
                backgroundColor: backgroundColor, 
                borderColor: borderColor
            }} , 
            imageStyle: props.imageClassName ? {...props.imageClassName, ...{ 
                borderColor: imageBorderColor,
                height: props.imageClassName.height === 0 ? 'auto' : props.imageClassName.height
            }} : {} ,  
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
          })
    }); 
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
