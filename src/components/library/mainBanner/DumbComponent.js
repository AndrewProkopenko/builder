import React from 'react'

import SendFormContext from '../../../context/sendFormContext/SendFormContext'

import { Container, Grid, makeStyles, Button, darken, fade } from '@material-ui/core'

import '../../../assets/style/main-banner.scss'

import {getColorByPalette, getColorByPaletteReverse} from '../../functions/colorChanger/ColorCalculation'

function DumbComponent(props) {

    const { sendRequests } = React.useContext(SendFormContext)

    const [formPhone, setFormPhone] = React.useState('')
    const [isDisableBtn, setIsDisableBtn] = React.useState(false)

    const titleMain = props.data.heading
    const titleSubText = props.data.headingIcon.title
    const titleSubIcon = props.data.headingIcon.icon
    const paragraph = props.data.paragraph
    const inputLabel = props.data.form.inputLabel
    const buttonLabel = props.data.form.buttonLabel
    const policy = props.data.form.policy
    const imageUrl = props.data.image
    let color = props.data.color 
    let colorFocusInput
  
    
    const marginTop = props.data.marginTop  
    const marginBottom = props.data.marginBottom  
    const maxWidthContainer = props.data.maxWidthContainer  
    
    const useStyles = makeStyles( (theme) => { 

        color = getColorByPalette(theme, color)
        colorFocusInput = getColorByPaletteReverse(theme, props.data.color) 
          
        return( {
            subHeading: {  
                color: `${color}` ,
                '&>svg' : {
                    fill: theme.palette.primary.main
                }
            },
            input: { 
                border: `1px solid ${color}`,
                backgroundColor: theme.palette.background.default, 
                color:  theme.palette.text.primary, 
                transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms`, 
                "&:focus": {
                    borderColor: colorFocusInput, 
                    background: fade(colorFocusInput, 0.07), 
                }, 
                "&:hover": {
                    background: fade(color, 0.07), 
                }
            },
            button: {
                border: `1px solid ${color} !important`, 
                backgroundColor: color, 
                transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms`, 
                textTransform: 'inherit', 
                  
                '&:active' : {
                    backgroundColor: darken(color, 0.4) , 
                },
                [theme.breakpoints.down('sm')]: { 
                    '&:hover' : {
                        backgroundColor: color , 
                    },
                },
                [theme.breakpoints.up('sm')]: {
                    '&:hover' : {
                        background: fade(color, 0.15), 
                        color: theme.palette.text.primary
                    }
                }, 
            },
            icon: {
                width: 512, 
                height: 512, 
                backgroundColor: '#fff',
                webkitMaskImage: `url(${titleSubIcon})`,
                maskImage: `url(${titleSubIcon})`,
                webkitMask: `url(${titleSubIcon}) no-repeat 100% 100% ` ,
                mask: `url(${titleSubIcon}) no-repeat 100% 100% `,
                webkitMaskSize: 'cover',
                maskSize: 'cover'
            } ,
            styleClass: {
                marginTop: `${marginTop}px`,
                marginBottom: `${marginBottom}px`,
                [theme.breakpoints.down('md')]: { 
                    marginTop: marginTop === 0 ? 0 : (marginTop > 80 ? marginTop*0.8 : 50),
                    marginBottom: marginBottom === 0 ? 0 : (marginBottom > 80 ? marginBottom*0.8 : 50)
                },
                [theme.breakpoints.down('sm')]: { 
                    marginTop: marginTop === 0 ? 0 : (marginTop > 120 ? marginTop*0.25 : 40),
                    marginBottom: marginBottom === 0 ? 0 : (marginBottom > 120 ? marginBottom*0.25 : 30),
                }
            }
        } )
    })
 
    
    const classes = useStyles()

    const handleSubmit = (event) => {
        event.preventDefault() 
        setIsDisableBtn(true)

        const sendForm = {
            phone: formPhone,
            place: 'main page',  
            isCheck: false
        }

        sendRequests(sendForm)
        
        setIsDisableBtn(false) 
        setFormPhone('')
    }

    return (
        <div className={`bulder-main-banner ${classes.styleClass}`}>
            <Container maxWidth={maxWidthContainer}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7} >
                        <div className="bulder-main-banner_content">
                            <h1>
                                {
                                    titleMain
                                }
                            </h1>
                            <h5 className={classes.subHeading}>  
                                {
                                    titleSubIcon &&
                                    <svg style={{fill: '#fff'}}>       
                                        <image style={{fill: '#fff'}} xlinkHref={titleSubIcon} src={titleSubIcon} width={'100%'} height={'100%'}   />    
                                    </svg>
                                }
                                
 
                                <span>
                                    { titleSubText }
                                </span>
                            </h5>
                            <p>
                                { paragraph }
                            </p>
                            <div className="bulder-main-banner_content-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="bulder-main-banner_content-form__group">
                                        <span>
                                            <input 
                                                type="tel" 
                                                name="phone" 
                                                required 
                                                placeholder={`${inputLabel}`} 
                                                className={classes.input}
                                                value={formPhone}
                                                onChange={(e) => { setFormPhone(e.target.value) }}
                                            />
                                        </span>
                                        <div className="btn-form">
                                            <Button 
                                                className={classes.button}
                                                type="submit"
                                                disabled={isDisableBtn}
                                            >
                                                { buttonLabel }
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                                <span>
                                    { policy }
                                </span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={5} > 
                        <div className="bulder-main-banner-image d-none d-lg-block">
                        <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
                        </div>
                    </Grid>
                </Grid> 
            </Container>
        </div>
    )
}

export default DumbComponent
