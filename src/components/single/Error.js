
import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Box, Typography} from '@material-ui/core'

import LoadingContext from '../../context/loadingContext/LoadingContext'

function Error() {

    const { setIsLoading } = useContext(LoadingContext)

    useEffect( () => {
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
            <NavLink to='/' style={{color: 'inherit'}}>
                Home
            </NavLink>
        </Box>
    )
}

export default Error
