
import React, { useState } from 'react'

import CategoriesChanger from './headerHelpers/CategoriesChanger'
import LogoChanger from './headerHelpers/LogoChanger'
import StyleChanger from './headerHelpers/StyleChanger'
import ThemeChanger from './headerHelpers/ThemeChanger'
import ModalChanger from './headerHelpers/ModalChanger'
import RequestsChanger from './headerHelpers/RequestsChanger'
import ValidationChanger from './headerHelpers/ValidationChanger'

import DumbComponent from './dumb/DumbComponent'

import { Box, Button, makeStyles } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
 

function StyledComponent() {

    const [open, setOpen] = useState(false)
    
    const useStyles = makeStyles((theme) => ({ 
        headerContainer: {
            position: 'relative', 
            '&:hover $btnSettings': { 
                opacity: 1
            }
        },
        hiddenButtonGroup: {
            position: 'absolute', 
            zIndex: 1020, 
            left: 105,
            top: -5,  
        },
        btnSettings: { 
            opacity: open ? 1 : 0,
            position: 'absolute', 
            zIndex: 1020, 
            left: 10, 
            top: 5, 
            width: 60, 
            height: 60,
            backgroundColor: theme.palette.error.dark,   
            color: '#fff', 
            textAlign: 'center' ,
            '&>span': {
                display: 'flex', 
                flexDirection: 'column', 
                fontSize: 10
            },
            '&:hover': {
                backgroundColor: theme.palette.secondary.dark, 
            },
        },
        btnSettingsItem: {
            marginLeft: theme.spacing(2),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1), 
            display:'inline-block'
        }
    }))
    
    const classes = useStyles();
    return (
        <Box className={classes.headerContainer}>
  
            <div>   
                <Button 
                    className={classes.btnSettings}
                    onClick={() => { setOpen(!open) }}
                >   
                    {open ? 'close' : 'open' }
                    <br/>
                    settings
                    <SettingsIcon style={{ color: '#fff' }} fontSize='small'/>
                </Button>
                {
                    open && 
                    <div className={classes.hiddenButtonGroup}>
                        <Box className={classes.btnSettingsItem}>
                            <CategoriesChanger/> 
                        </Box>
                        <Box className={classes.btnSettingsItem}>
                            <LogoChanger/>
                        </Box>
                        <Box className={classes.btnSettingsItem}>
                            <StyleChanger/>
                        </Box>
                        <Box className={classes.btnSettingsItem}>
                            <ThemeChanger/>
                        </Box>
                        <Box className={classes.btnSettingsItem}>
                            <RequestsChanger/>
                        </Box>
                        <Box className={classes.btnSettingsItem}>
                            <ModalChanger/>
                        </Box>
                        <Box className={classes.btnSettingsItem}>
                            <ValidationChanger/>
                        </Box>
                    </div>
                }
                 
            </div>
            
            <DumbComponent/>

        </Box>
    )
}

export default StyledComponent
