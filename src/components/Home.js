
import React from 'react' 
import { NavLink } from 'react-router-dom'
import { Box, Button, Container, Typography } from '@material-ui/core'
 
import LoadingContext from '../context/loadingContext/LoadingContext'  

import MainBannerCreator from './library/mainBanner/ElementCreator'

// import firebase from '../firebase/firebase'
// import layout from '../data/library.json'

function Home() {

    const { setIsLoading } = React.useContext(LoadingContext)

    React.useEffect( () => {
        setIsLoading(false)
        document.title = 'Site Builder'
    }, [])

    const handleClick = () => {
        // firebase.db.collection("library").doc('layouts').set(layout)
    }

    return (
        <React.Fragment>
            
        <MainBannerCreator/>

        <Container>
            <Box mt={5}>
                <Typography variant='h3'>
                    Home
                </Typography>

                <Box mt={3}>
                    <NavLink to='/login'> 
                            Login 
                    </NavLink> 
                </Box>
                

                <Box mt={3}>
                    <Button onClick={handleClick}>
                        Click
                    </Button>
                </Box>
                
            </Box>
        </Container>
    
        </React.Fragment>
    )
}

export default Home
