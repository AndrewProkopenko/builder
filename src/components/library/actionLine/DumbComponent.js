import React from 'react'

import { Container, Grid, makeStyles, Box, Button, Typography } from '@material-ui/core'
// import { lighten } from '@material-ui/core/styles';
import { darken, fade } from '@material-ui/core/styles/colorManipulator';
 
import ModalContext from '../../../context/modalContext/ModalContext'

function DumbComponent(props) {

    const { handleOpen } = React.useContext(ModalContext)

    const justify = 'space-between'
    const heading = "text heading space-between Sale 30% primary"
    const headingSize = 40
    const isButton = true
    const textButton = "buy now"
    const targetButton = 'Sale 30%'  
    let colorButton = 'primary'
    let colorMain = '#0aa24c'
    // const heading = props.data.heading 
    // const isButton = props.data.isButton
    // const textButton = props.data.textButton
    // const targetButton = props.data.targetButton  
    // let colorButton = props.data.colorButton || '#f00'
    // let colorMain = props.data.colorButton || '#f00'

    const useStyles = makeStyles((theme) => {   
        if(colorButton === 'primary')  colorButton = theme.palette.primary.main
        if(colorButton === 'secondary') colorButton = theme.palette.secondary.main  
        return ({
            button: {
                textTransform: 'inherit',  
                paddingLeft: theme.spacing(5),
                paddingRight: theme.spacing(5),
                backgroundColor: colorMain,
                border: `1px solid ${colorMain}`, 
                color: theme.palette.getContrastText(colorMain), 
                transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`, 
                whiteSpace: 'nowrap', 
                '&:hover' : { 
                    background: 'none',
                    color: theme.palette.text.primary
                },
                [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                    width: "100%", 
                    maxWidth: 400
                }, 
            },
            heading: { 
                fontSize: headingSize, 
                marginRight: theme.spacing(3),
                color: darken(colorMain, 0.5),
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
                backgroundColor: fade(colorMain, 0.35), 
                padding: theme.spacing(3, 0), 
                margin: theme.spacing(6, 0),
                borderTop: `1px solid ${colorMain}`,
                borderBottom: `1px solid ${colorMain}`,
                [`@media (max-width: ${theme.breakpoints.values.md}px)`]: { 
                    padding: theme.spacing(2, 0), 
                    margin: theme.spacing(3, 0),
                },
            }, 
            containerFlexed: { 
                width: '100%', 
                display: 'flex',
                alignItems: 'center', 
                justifyContent: justify,
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
