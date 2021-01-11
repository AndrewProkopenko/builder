
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Box, Typography} from '@material-ui/core'

import LoadingContext from '../context/loadingContext/LoadingContext'

function Error() {

    const { setIsLoading } = React.useContext(LoadingContext)

    React.useEffect( () => {
        setIsLoading(false)
    }, [setIsLoading])
    
    return ( 
        <Box 
            display='flex' 
            flexDirection="column" 
            alignItems='center'
            mt={5}
        >
            <Typography variant='h5' gutterBottom>
                This page isn`t available
            </Typography>
            <NavLink to='/'>
                Home
            </NavLink>
        </Box>
    )
}

export default Error
