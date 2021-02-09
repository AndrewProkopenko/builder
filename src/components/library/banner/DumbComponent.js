import React, {useContext} from 'react'

import { makeStyles, Container, Grid, Box, Button, darken , Typography } from '@material-ui/core'  
import ModalContext from '../../../context/modalContext/ModalContext'
import {getColorByPalette} from '../../functions/colorChanger/ColorCalculation'

function DumbComponent(props) { 

    const { handleOpen } = useContext(ModalContext) 
  
    const variant = props.data.variantHeading
    const heading = props.data.heading  
    const paragraph = props.data.paragraph   
     
    const minHeight =  props.data.minHeight 
    const imageUrl =  props.data.imageUrl  
 
    const isButton = props.data.isButton
    const textButton = props.data.textButton
    const targetButton = props.data.targetButton   
    let colorBackground = props.data.background || 'paper'
    let colorButton = props.data.colorButton || '#f00'
    let colorText = props.data.colorText || 'inherit'

    const paddingVertical = props.data.paddingVertical  
    const marginTop = props.data.marginTop  
    const marginBottom = props.data.marginBottom  
    const maxWidthContainer = props.data.maxWidthContainer 
 
    const useStyles = makeStyles((theme) => {   

        

        colorButton = getColorByPalette(theme, colorButton) 
        colorText = getColorByPalette(theme, colorText) 
        colorBackground = getColorByPalette(theme, colorBackground) 

        function computedContrastColor() {
            if(colorText !== 'contrast') return colorText
            if(colorBackground !== 'inherit') return theme.palette.getContrastText(colorBackground)
            return colorText
        }
             
        return ({ 
            bannerBackground: {
                backgroundColor: colorBackground, 
                backgroundImage: `url(${imageUrl})`, 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover',
                marginTop: marginTop, 
                marginBottom: marginBottom, 
                [theme.breakpoints.down('sm')]: { 
                    marginTop: marginTop === 0 ? 0 : (marginTop > 50 ? marginTop*0.6 : 30), 
                    marginBottom: marginBottom === 0 ? 0 : (marginBottom > 50 ? marginBottom*0.6 : 30),
                }
            }, 
            bannerContent: {
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center', 
                paddingTop: paddingVertical,
                paddingBottom: paddingVertical,
                minHeight: minHeight, 
                maxHeight: "100vh", 
                [theme.breakpoints.down('sm')]: { 
                    paddingTop: paddingVertical === 0 ? 0 : (paddingVertical > 50 ? paddingVertical*0.6 : 20), 
                    paddingBottom: paddingVertical === 0 ? 0 : (paddingVertical > 50 ? paddingVertical*0.6 : 20),
                }
            },
            heading: {  
                marginTop: 0, 
                marginBottom: theme.spacing(3), 
                textAlign: 'center',  
                fontWeight: 500, 
                color: computedContrastColor(),
                [theme.breakpoints.down('sm')]: { 
                    marginBottom: theme.spacing(1.5),  
                }
            },
            paragraph: {  
                marginTop: heading.length ? 0 : 10, 
                marginBottom: 20,  
                lineHeight: 1.5, 
                fontWeight: 400, 
                textAlign: 'center',  
                fontSize: 15 , 
                color: computedContrastColor(),
                [theme.breakpoints.down('sm')]: { 
                    marginTop: 0, 
                    lineHeight: 1.1
                }
            },
            button: {
                textTransform: 'inherit',  
                fontSize: 14,  
                paddingLeft: "2.5em",
                paddingRight: "2.5em",
                paddingTop: ".8em",
                paddingBottom: ".8em",
                backgroundColor: colorButton, 
                color: theme.palette.getContrastText(colorButton), 
                transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`, 
                whiteSpace: 'nowrap', 

                  
                '&:active' : {
                    backgroundColor: darken(colorButton, 0.4) , 
                },
                [theme.breakpoints.down('sm')]: {
                    width: "100%", 
                    maxWidth: 400,
                    '&:hover' : {
                        backgroundColor: colorButton , 
                    },
                },
                [theme.breakpoints.up('sm')]: {
                    '&:hover' : {
                        backgroundColor: darken(colorButton, 0.2) , 
                    }
                }, 
            },
             
        })
    });

    const classes  = useStyles();

    const openModal = () => {
        handleOpen(targetButton)
    }

    return (  
        <div className={classes.bannerBackground}>
            <Container maxWidth={maxWidthContainer}>
                <Box className={classes.bannerContent} > 
                    <Grid item xs={12} sm={6} className="info">
                        { 
                            heading.length > 0 && 
                            <Typography variant={variant} className={`${classes.heading} heading` }>
                                { heading }
                            </Typography> 
                        }
                        { paragraph.length > 0 && <p className={classes.paragraph} > {paragraph} </p> } 
                        {
                                isButton && 
                                <Box display={'flex'} justifyContent='center'>
                                    <Button 
                                        className={classes.button}  
                                        onClick={openModal}
                                        variant="contained"
                                        size='large'
                                    >
                                        { textButton }
                                    </Button>
                                </Box> 
                            }
                    </Grid> 
                </Box> 
            </Container>
        </div>  
    )
}

export default DumbComponent
