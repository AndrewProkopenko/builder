
import React from 'react' 

import { Button, Typography, Box, makeStyles, Tooltip} from '@material-ui/core'

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import ModeContext from '../../context/modeContext/ModeContext' 

import RequestsChanger from './headerHelpers/RequestsChanger'

import firebase from '../../firebase/firebase'

function AdminHeader() {

    const { user } = React.useContext(ModeContext)  
 
    const [isOpen, setIsOpen] = React.useState(false)

    const useStyles = makeStyles((theme) => ({
        buttonSettings: {
            position: 'absolute', 
            top: 0,
            left: 0,
            zIndex: 1030,
            display:"flex",
            alignItems: 'center', 
            width: 22,
            height: '100%',  
            minHeight: 54, 
            backgroundColor: 'rgba(0, 0, 0, 0.33)',
            cursor: 'pointer'
        },
        settingsContainer: { 
            position: 'relative', 
            zIndex: 1029,
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',    
            padding: 10, 
            backgroundColor: theme.palette.background.default
        },
        wrapper: {
            position:"relative", 
            minHeight: isOpen ? 54 : 0, 
            paddingLeft: 22
        }
    }));

    const classes = useStyles()

 
    
    const handleSignOut = () => {
        firebase.logout()
    }
    
    if(user) {
        return (
            <Box className={classes.wrapper} >
                <Tooltip title='Global Settings' placement='right' >
                    <Box onClick={() => { setIsOpen(!isOpen)}}  className={classes.buttonSettings} >
                        {
                            isOpen ? <VisibilityOffIcon fontSize={'small'} /> : <VisibilityIcon  fontSize={'small'}  /> 
                        }
                    </Box>
                </Tooltip>
                { 
                    isOpen && 
                    <Box className={classes.settingsContainer} >
                        <Typography component='span' >
                            hello, { user.providerData[0].email } 
                        </Typography>

                        <RequestsChanger/>
                    
                        <Box> 
                            <Button 
                                size='small'
                                color='secondary' 
                                variant={'contained'} 
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </Button>
                        </Box>
                    </Box>
                }
            </Box>
        )
    }
    else { 
        return null
    }
    
}

export default AdminHeader
