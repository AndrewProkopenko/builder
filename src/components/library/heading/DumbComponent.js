import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
// import { Typography } from '@material-ui/core';

import {getColorByPalette} from '../../functions/colorChanger/ColorCalculation'

function DumbComponent(props) {
    const useStyles = makeStyles((theme) => {
        let  color = getColorByPalette(theme, props.className.color)
        let  backgroundColor = getColorByPalette(theme, props.className.backgroundColor)
        let  borderColor = getColorByPalette(theme, props.className.borderColor)
        return({
            myClassName: {...props.className, ...{
                color: color,  
                backgroundColor: backgroundColor, 
                borderColor: borderColor
            }} ,
            resposiveFontSize: { 
                [`@media (max-width: 960px)`]: {
                    fontSize: props.className.fontSize > 40 ? props.className.fontSize*0.8 : 20, 
                    marginTop: props.className.marginTop*0.8,
                    marginBottom: props.className.marginBottom*0.8
                },
                [theme.breakpoints.down('sm')]: {
                    fontSize: props.className.fontSize > 40 ? props.className.fontSize*0.6 : 20,
                    lineHeight : 1.2, 
                    marginTop: props.className.marginTop*0.5, 
                    marginBottom: props.className.marginBottom*0.5, 
                    textAlign: 'center'
                },
            },
             
          })
    } );
    const classes = useStyles();
 
    
    const classeForResp = props.data.responseFont ? classes.resposiveFontSize : '' 

    const renderText = () => {
        if(props.textChildren.length > 0) { 
            return  <span dangerouslySetInnerHTML={{__html: props.textChildren}}></span>
        }
        else {
            return `(No text - ${props.data.variant})`
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
