import React, { useContext } from 'react'

import { Container, Grid, makeStyles, Box, Button, darken, fade, Typography } from '@material-ui/core'

import {getColorByPalette} from '../../functions/colorChanger/ColorCalculation'

import '../../../assets/style/about.scss'

import ModalContext from '../../../context/modalContext/ModalContext' 

function DumbComponent(props) {

    const { handleOpen  } = useContext(ModalContext) 
      
    const imageUrl = props.data.image

    const variant = props.data.variantHeading
    const heading = props.data.heading
    const paragraph = props.data.paragraph
    const isButton = props.data.isButton
    const textButton = props.data.textButton
    const targetButton = props.data.targetButton  
    const marginTop = props.data.marginTop  
    const marginBottom = props.data.marginBottom  
    const maxWidthContainer = props.data.maxWidthContainer  
    
    const backgroundSize = props.data.backgroundSize
    const backgroundPosition = props.data.backgroundPosition
    const imageHeight = props.data.imageHeight
    const isHalfWidth = props.data.isHalfWidth

    const imageOrderMobile = props.data.imagePositionMobile === 'bottom' ? 2 : 0
    const imageOrderDesktop = props.data.imagePositionDesktop === 'right' ? 2 : 0
  

    let colorButton = props.data.colorButton || '#f00'
   
    const useStyles = makeStyles((theme) => {   

        colorButton = getColorByPalette(theme, colorButton)  

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
                        background: fade(colorButton, 0.15), 
                        color: theme.palette.text.primary
                    }
                }, 
            }, 
            styleClass: {
                marginTop: `${marginTop}px`,
                marginBottom: `${marginBottom}px`,
                [theme.breakpoints.down('sm')]: { 
                    marginTop: marginTop === 0 ? 0 : (marginTop > 50 ? marginTop*0.6 : 30),
                    marginBottom: marginBottom === 0 ? 0 : (marginBottom > 50 ? marginBottom*0.6 : 30),
                }
            }, 
            blockText: {
                height: 'auto',  
                marginTop: props.data.imagePositionMobile === 'bottom' ? 0 : 20,
                [theme.breakpoints.up('md')]: {
                    height: imageHeight, 
                    marginTop: 0,
                    paddingLeft: props.data.imagePositionDesktop === 'left' ? 20 : 0
                },
            },
            blockImage: {
                backgroundSize: backgroundSize, 
                backgroundPosition: backgroundPosition, 
                height: imageHeight*0.5,
                // eslint-disable-next-line
                ['@media screen and (min-width: 400px)']: {
                    height: imageHeight*0.7
                },
                [theme.breakpoints.up('sm')]: {
                    height: imageHeight*0.9
                },
                [theme.breakpoints.up('md')]: {
                    height: imageHeight, 

                    position: isHalfWidth ? 'absolute' : 'static', 
                    width: isHalfWidth ? '49vw' : '100%', 
                    right: props.data.imagePositionDesktop === 'right' ? '0' : 'auto',
                    left: props.data.imagePositionDesktop === 'left' ? '0' : 'auto',

                }, 
            }, 
            orderClass: {
                order: imageOrderMobile, 
                [theme.breakpoints.up('md')]: {
                    order: imageOrderDesktop
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
            <Container maxWidth={maxWidthContainer} >
                <div className={`${classes.styleClass} bulder-about`}>
                    <Grid container> 
                        <Grid item xs={12} md={imageUrl.length > 0 ? 6 : 12} style={{order: 1}}  >
                            <div className={`bulder-about_item ${classes.blockText} `}>
                                {
                                   heading.length > 0 && 
                                   <Typography variant={variant} className={'heading'}>
                                       { heading }
                                   </Typography>
                                }
                                {
                                   paragraph.length > 0 && 
                                   <p>
                                       { paragraph }
                                   </p>
                                } 
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
                        {
                            imageUrl.length > 0 && 
                            <Grid item xs={12} md={6} className={classes.orderClass} >
                                <Box clone={true}>
                                    <div className={`bulder-about_image ${classes.blockImage} `} style={{backgroundImage: `url(${imageUrl})`}} />
                                </Box> 
                            </Grid>
                        }
                        
                    </Grid>
                </div>
            </Container>
        </div>

    )
}

export default DumbComponent
