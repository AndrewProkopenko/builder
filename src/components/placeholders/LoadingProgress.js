import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


function LoadingProgress() {

    const useStyles = makeStyles( () => ({
        root: {
            position: 'fixed', 
            zIndex: 1500, 
            top: 0, 
            left: 0, 
            right: 0,
            width: '100%',  
            height: 2
        },
        lineStyle: {  
            backgroundColor: "rgba(0,0,0,0)"
        },
        barStyle: { 
            backgroundColor: "rgb(214,0,166)",
            backgroundImage: 'linear-gradient(90deg, rgba(214,0,166,0.5) 0%, rgba(0,255,158,0.7) 100%)'
        }
    }));
    
    const classes = useStyles();

    return ( 
        <div className={classes.root}>
            <LinearProgress classes={{
                colorPrimary: classes.lineStyle,
                bar: classes.barStyle
            }} /> 
        </div> 
    )
}

export default LoadingProgress
