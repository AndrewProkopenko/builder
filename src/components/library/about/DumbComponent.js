import React from 'react'

import { Container, Grid, makeStyles, Box, Button } from '@material-ui/core'

import '../../../assets/about.scss'

import ModalContext from '../../../context/modalContext/ModalContext'

function DumbComponent(props) {

    const { handleOpen  } = React.useContext(ModalContext)

    const heading = props.data.heading
    const paragraph = props.data.paragraph
    const imageUrl = props.data.image
    const isButton = props.data.isButton
    const textButton = props.data.textButton
    const targetButton = props.data.targetButton  
    let colorButton = props.data.colorButton || '#f00'

    const useStyles = makeStyles((theme) => {   
        if(colorButton === 'primary')  colorButton = theme.palette.primary.main
        if(colorButton === 'secondary') colorButton = theme.palette.secondary.main  
        return ({
            button: {
                textTransform: 'inherit', 
                marginTop: theme.spacing(3), 
                paddingLeft: theme.spacing(5),
                paddingRight: theme.spacing(5),
                backgroundColor: colorButton,
                border: `1px solid ${colorButton}`, 
                color: theme.palette.getContrastText(colorButton), 
                transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`, 
                '&:hover' : { 
                    background: 'none',
                    color: theme.palette.text.primary
                },
                [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                    width: "100%", 
                    maxWidth: 400
                }, 
            }
        })
    });

    const classes  = useStyles();

    const openModal = () => {
        handleOpen(targetButton)
    }

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
                                {
                                    isButton && 
                                    <Button 
                                        className={classes.button}  
                                        onClick={openModal}
                                        variant="contained"
                                        size='large'
                                    >
                                        { textButton }
                                    </Button> 
                                }
                                
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Box clone={true}>
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