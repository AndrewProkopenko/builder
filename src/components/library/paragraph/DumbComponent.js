import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
 
import {getColorByPalette} from '../../functions/colorChanger/ColorCalculation'
 
function DumbComponent(props) {

    console.log('dumb paragraph')
  
    const useStyles = makeStyles((theme) => {
        let  color = getColorByPalette(theme, props.className.color)
        let  backgroundColor = getColorByPalette(theme, props.className.backgroundColor)
        let  borderColor = getColorByPalette(theme, props.className.borderColor) 
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
            }}   
        })
    });
    const classes = useStyles();
 
 
    return (
        <React.Fragment>
            
            <Typography component={props.data.variant} className={classes.myClassName} > 
                { 
                    props.textChildren.length !== 0 ? props.textChildren : '(No text - paragraph)'
                } 
            </Typography> 
        </React.Fragment>
    )
}

export default DumbComponent
