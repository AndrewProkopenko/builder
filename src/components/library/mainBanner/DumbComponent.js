import React from 'react'

import SendFormContext from '../../../context/sendFormContext/SendFormContext'

import { Container, Grid, makeStyles, Button } from '@material-ui/core'

import '../../../assets/style/main-banner.scss'


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
  
    
    const useStyles = makeStyles( (theme) => {

        if(color === 'primary') { 
            color = theme.palette.primary.main
            colorFocusInput = theme.palette.secondary.main
        }
        if(color === 'secondary') {
            color = theme.palette.secondary.main 
            colorFocusInput = theme.palette.primary.main
        }
        if(color === 'custom') { 
            colorFocusInput = theme.palette.secondary.main
        }
 
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
                "&:focus": {
                    borderColor: colorFocusInput
                }
            },
            button: {
                border: `1px solid ${color} !important`, 
                backgroundColor: color, 
                transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms`, 
                textTransform: 'inherit', 
                '&:hover' : {
                    background: 'none', 
                    color: theme.palette.text.primary
                }
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
        <div className="mac-main-banner">
            <Container maxWidth='lg'>
                <Grid container spacing={2}>
                    <Grid item md={7} className="col-12 col-lg-7">
                        <div className="mac-main-banner_content">
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
                            <div className="mac-main-banner_content-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="mac-main-banner_content-form__group">
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
                    <Grid item md={5} className="col-lg-5"> 
                        <div className="mac-main-banner-image d-none d-lg-block">
                        <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
                        </div>
                    </Grid>
                </Grid> 
            </Container>
        </div>
    )
}

export default DumbComponent
