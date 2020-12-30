
import React from 'react' 

import { Button, Typography, Box, Switch, FormControlLabel } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import ModeContext from '../../context/modeContext/ModeContext'
import ThemeContext from '../../context/themeContext/ThemeContext'  

import firebase from '../../firebase/firebase'

function AdminHeader() {

    const { user } = React.useContext(ModeContext)

    const {themeMode, setThemeMode} = React.useContext(ThemeContext) 
 
    const [isOpen, setIsOpen] = React.useState(false)
    
    const handleSignOut = () => {
        firebase.logout()
    }
    
    if(user) {
        return (
            <Box px={3} py={1}  position="relative" minHeight={54}>
                <Box style={{
                    position: 'absolute', 
                    top: 0,
                    left: 0,
                    display:"flex",
                    alignItems: 'center', 
                    width: 22,
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.33)'
                }}
                    onClick={() => { setIsOpen(!isOpen)}}
                >
                    {
                        isOpen ? <VisibilityOffIcon fontSize={'small'} /> : <VisibilityIcon  fontSize={'small'}  /> 
                    }
                </Box>
                { isOpen && <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography component='span' >
                        hello, { user.providerData[0].email } 
                    </Typography>
                    <span>
                        (theme setting , css for body, ....)
                    </span>
                    
                    
                    <Box>
                        <FormControlLabel
                            control={
                                <Switch 
                                    color="primary" 
                                    checked={themeMode === 'dark' ?  true : false}  
                                    onChange={() => { setThemeMode()}}  
                                /> 
                            }
                            label="Dark Mode"
                        /> 
                        <Button 
                            size='small'
                            color='secondary' 
                            variant={'contained'} 
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                    </Box>
                </Box>}
            </Box>
        )
    }
    else { 
        return null
    }
    
}

export default AdminHeader
