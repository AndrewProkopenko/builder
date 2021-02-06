import React, { useEffect, useState } from 'react'

import { Box, makeStyles, CircularProgress, Typography } from '@material-ui/core'
   
function PreloaderThumbnail({status}) {

 

    const useStyles = makeStyles((theme) => {
        return({
            preloaderContainer: {
                position: 'fixed', 
                zIndex: 10000, 
                top: 0, 
                left: 0, 
                bottom: 0, 
                right: 0, 
  
                opacity: status === 'delete' ? 0 : 1,   
                // backgroundColor: status === 'loading' ? '#fdfdfd' : '#d1cfe6',  
                backgroundColor: theme.palette.background.default,  

                transition: `400ms ease-in-out`,
            },  
            centeredFlexed: { 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
            },
            progressCircle: {
                color: "#08bb35bf"
            },    
            title: {
                marginTop: 4, 
                fontSize: 16, 
                color: theme.palette.text.disabled, 
                fontWeight: 300 
            }, 
            loadContainer: { 
                transform: status === 'loading' ? 'translateY(0)' : 'translateY(-40px)', 
                transition: `300ms ease-in-out`,
                opacity: status === 'loading' ? 1 : 0
            },
            enterTitle: {
                fontSize: 24, 
                color: theme.palette.text.disabled, 
                fontWeight: 300 , 
                transition: `300ms ease-in-out`,
                transform: status === 'loading' ? 'translateY(30px)' : 'translateY(-30px)', 
                opacity: status === 'loading' ? 0 : 1
            }
        })
    })
    const classes = useStyles()


    return ( 
        status !== 'hide' ? 
        
        <Box className={`${classes.preloaderContainer} ${classes.centeredFlexed}`}>
            <Box className={`${classes.loadContainer} ${classes.centeredFlexed}`}>   
                <CircularProgress 
                    size={34}
                    thickness={2}  
                    classes={{ circle: classes.progressCircle }} 
                /> 
                <Typography className={classes.title} variant='h3'>
                    Loading
                </Typography>  
            </Box>
            
            <Typography className={classes.enterTitle} variant='h3'>
                Site builder
            </Typography>  
        </Box> 
        :
        null
    )
}

export default PreloaderThumbnail
