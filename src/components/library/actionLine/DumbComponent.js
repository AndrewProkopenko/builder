import React from 'react'

import { Container, Grid, makeStyles, Box, Button, Typography } from '@material-ui/core' 
import { darken, fade } from '@material-ui/core/styles/colorManipulator';
 
import ModalContext from '../../../context/modalContext/ModalContext'

function DumbComponent(props) {

    const { handleOpen } = React.useContext(ModalContext) 

    const heading = props.data.heading 
    const headingSize = props.data.headingSize 

    const isButton = props.data.isButton
    const textButton = props.data.textButton
    const targetButton = props.data.targetButton   
    let colorMain = props.data.colorMain || '#f00'
    let colorTheme

    const useStyles = makeStyles((theme) => {   
        if(colorMain === 'primary')  colorMain = theme.palette.primary.main
        if(colorMain === 'secondary') colorMain = theme.palette.secondary.main  
        colorTheme = theme.palette.type === 'dark' ? fade(colorMain, 0.65) : fade(colorMain, 0.2) 
        return ({
            button: {
                textTransform: 'inherit',  
                fontSize: headingSize > 50 ? headingSize/3 : 18, 
                paddingLeft: "2.5em",
                paddingRight: "2.5em",
                paddingTop: ".8em",
                paddingBottom: ".8em",
                backgroundColor: colorMain,
                border: `1px solid ${colorMain}`, 
                color: theme.palette.getContrastText(colorMain), 
                transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`, 
                whiteSpace: 'nowrap', 

                  
                '&:active' : {
                    backgroundColor: darken(colorMain, 0.4) , 
                },
                [theme.breakpoints.down('sm')]: {
                    width: "100%", 
                    maxWidth: 400,
                    '&:hover' : {
                        backgroundColor: colorMain , 
                    },
                },
                [theme.breakpoints.up('sm')]: {
                    '&:hover' : {
                        background: 'none',
                        color: theme.palette.text.primary
                    }
                }, 
            },
            heading: { 
                fontSize: headingSize, 
                marginRight: theme.spacing(3),
                color: theme.palette.text.primary,
                textAlign: 'center', 
                [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {   
                    fontSize: headingSize*0.8,  
                },
                [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {  
                    marginRight: 0, 
                    marginBottom: theme.spacing(1),
                    fontSize: headingSize*0.65, 
                    textAlign: 'center'
                },
            },
            containerColored: { 
                backgroundColor: colorTheme, 
                padding: theme.spacing(2, 0), 
                margin: theme.spacing(6, 0), 
                [`@media (max-width: ${theme.breakpoints.values.md}px)`]: { 
                    padding: theme.spacing(2, 0), 
                    margin: theme.spacing(3, 0),
                },
            }, 
            containerFlexed: { 
                width: '100%', 
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'space-between',
                [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: { 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start'
                },
            }
        })
    });

    const classes  = useStyles();

    const openModal = () => {
        handleOpen(targetButton)
    }

    return (
        <Box className={classes.containerColored}> 
            <Container maxWidth="lg" > 
                    <Grid container> 
                        <Box className={classes.containerFlexed}> 
                            <Typography variant={'h3'} className={classes.heading}>
                                { heading }
                            </Typography>
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
                        </Box>
                        
                    </Grid>
                
            </Container>
        </Box>

    )
}

export default DumbComponent
