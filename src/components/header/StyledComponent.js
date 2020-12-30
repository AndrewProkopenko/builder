
import React from 'react'

import CategoriesChanger from './headerHelpers/CategoriesChanger'
import LogoChanger from './headerHelpers/LogoChanger'

import DumbComponent from './DumbComponent'
import { Box, Button, makeStyles } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';

import { deepOrange } from '@material-ui/core/colors'

function StyledComponent() {

    const [open, setOpen] = React.useState(false)
    
    const useStyles = makeStyles((theme) => ({ 
        headerContainer: {
            position: 'relative', 
            '&:hover $btnSettings': { 
                opacity: 1
            }
        },
        hiddenButtonGroup: {
            transform: open ? 'scaleY(1)' : 'scaleY(0)',
            height: open ? 'auto' : 0, 
            // transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms height`, 
        },
        btnSettings: { 
            opacity: 0,
            position: 'absolute', 
            zIndex: 100, 
            left: 5, 
            bottom: open ? 10 : 'calc( 50% - 20px )', 
            width: 60, 
            height: 40,
            backgroundColor: theme.palette.error.dark,   
            color: '#fff', 
            '&>span': {
                display: 'flex', 
                flexDirection: 'column', 
                fontSize: 10
            },
            '&:hover': {
                backgroundColor: theme.palette.secondary.dark, 
            },
        }
    }))
    
    const classes = useStyles();
    return (
        <div className={classes.headerContainer} >   
            <Button 
                className={classes.btnSettings}
                onClick={() => { setOpen(!open) }}
            >
                settings
                <SettingsIcon style={{ color: '#fff' }} fontSize='small'/>
            </Button>
            <div className={classes.hiddenButtonGroup}>
                <Box ml={2} my={1} display='inline-block'>
                    <CategoriesChanger/> 
                </Box>
                <Box ml={2} my={1} display='inline-block'>
                    <LogoChanger/>
                </Box>
            </div>
            
            <DumbComponent logo={'logo'}/>
        </div>
    )
}

export default StyledComponent
