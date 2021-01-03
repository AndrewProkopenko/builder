
import React from 'react'

import CategoriesChanger from './headerHelpers/CategoriesChanger'
import LogoChanger from './headerHelpers/LogoChanger'
import StyleChanger from './headerHelpers/StyleChanger'
import ThemeChanger from './headerHelpers/ThemeChanger'

import DumbComponent from './dumb/DumbComponent'
import AdminHeader from './AdminHeader'
import { Box, Button, makeStyles } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
 

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
            position: 'absolute', 
            zIndex: 1020, 
            left: 105,
            top: -5,  
        },
        btnSettings: { 
            opacity: 0,
            position: 'absolute', 
            zIndex: 1020, 
            left: 35, 
            top: 5, 
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
        <React.Fragment>

            <AdminHeader/>

            <div className={classes.headerContainer} >   
                <Button 
                    className={classes.btnSettings}
                    onClick={() => { setOpen(!open) }}
                >
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
                    </div>
                }
                 
            </div>
            
            <DumbComponent/>
        </React.Fragment>
    )
}

export default StyledComponent
