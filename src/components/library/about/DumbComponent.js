import React from 'react'
import { Container, Grid, makeStyles, Box } from '@material-ui/core'
import '../../../assets/about.scss'

function DumbComponent(props) {

    const heading = props.data.heading
    const paragraph = props.data.paragraph
    const imageUrl = props.data.image

    const useStyles = makeStyles((theme) => {   
        return ({
             
        })
    });

    const classes  = useStyles();

    return (
        <div className="container-fluid position-relative"> 
            <Container maxWidth="lg" >
                <div className="electro-about heading">
                    <Grid container> 
                        <Grid item md={6} >
                            <div className="electro-about_item">
                                <h3>
                                    { heading }
                                </h3>
                                <p> 
                                    { paragraph }
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Box clone='true'>
                                <div className="electro-about_image" style={{backgroundImage: `url(${imageUrl})`}} />
                            </Box> 
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>

    )
}

export default DumbComponent
