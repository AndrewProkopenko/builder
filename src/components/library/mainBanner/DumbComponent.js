import React from 'react'

import { Container, Grid, makeStyles } from '@material-ui/core'

import '../../../assets/main-banner.scss'


function DumbComponent(props) {

    const titleMain = props.data.heading
    const titleSubText = props.data.headingIcon.title
    const titleSubIcon = props.data.headingIcon.icon
    const paragraph = props.data.paragraph
    const inputLabel = props.data.form.inputLabel
    const buttonLabel = props.data.form.buttonLabel
    const policy = props.data.form.policy
    const imageUrl = props.data.image
    let color = props.data.color 
  
    
    const useStyles = makeStyles( (theme) => {

        if(color === 'primary')  color = theme.palette.primary.main
        if(color === 'secondary') color = theme.palette.secondary.main 
 
        return( {
            subHeading: {  
                color: `${color}` ,
                '&>svg' : {
                    fill: theme.palette.primary.main
                }
            },
            input: { 
                border: `2px solid ${color}`,
                backgroundColor: theme.palette.background.default, 
                color:  theme.palette.text.primary
            },
            button: {
                border: `2px solid ${color} !important`, 
                backgroundColor: color, 
                transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms`, 
                '&:hover' : {
                    background: 'none', 
                    color: theme.palette.text.primary
                }
            }
        } )
    })

    const classes = useStyles()
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
                                <svg fill='#fff'>       
                                    <image fill='#fff' xlinkHref={titleSubIcon} src={titleSubIcon} width={'100%'} height={'100%'}   />    
                                </svg>
 
                                <span>
                                    { titleSubText }
                                </span>
                            </h5>
                            <p>
                                { paragraph }
                            </p>
                            <div className="mac-main-banner_content-form">
                                <form onSubmit={(e) => { e.preventDefault() }}>
                                    <div className="mac-main-banner_content-form__group">
                                        <span>
                                            <input 
                                                type="tel" 
                                                name="phone" 
                                                required 
                                                placeholder={`${inputLabel}`} 
                                                className={classes.input}
                                            />
                                        </span>
                                        <div className="btn-form">
                                            <button 
                                                className={classes.button}
                                                type="submit"
                                            >
                                                { buttonLabel }
                                            </button>
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
