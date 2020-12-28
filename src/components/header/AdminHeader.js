import { Button, Typography, Box } from '@material-ui/core'
import React from 'react' 

import ModeContext from '../../context/modeContext/ModeContext'

import firebase from '../../firebase/firebase'

function AdminHeader() {

    const { user } = React.useContext(ModeContext)
 
    const handleSignOut = () => {
        firebase.logout()
    }
    
    if(user) {
        return (
            <Box px={3} py={1} display='flex' justifyContent='space-between' alignItems='center' >
                <Typography component='span' >
                    hello, { user.providerData[0].email } 
                </Typography>
                <span>
                    (theme setting , css for body, ....)
                </span>
                <Button 
                    size='small'
                    color='secondary' 
                    variant='outlined' 
                    onClick={handleSignOut}
                >
                    Sign Out
                </Button>
            </Box>
        )
    }
    else { 
        return null
    }
    
}

export default AdminHeader
