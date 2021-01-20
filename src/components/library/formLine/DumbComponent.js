import React from 'react'

import SendFormContext from '../../../context/sendFormContext/SendFormContext'

import { Container, makeStyles, Button, Box, Grid, fade, darken } from '@material-ui/core'

import '../../../assets/style/lineForm.scss' 

function DumbComponent(props) { 
    const { sendRequests } = React.useContext(SendFormContext)
    const [formPhone, setFormPhone] = React.useState('')
    const [formName, setFormName] = React.useState('') 
   
    const heading = props.data.heading
    const paragraph = props.data.paragraph
    const inputName = props.data.inputName
    const inputPhone = props.data.inputPhone 
    const buttonText = props.data.buttonText
    const policy = props.data.policy
     
    let color = props.data.color
    let colorFocusInput

    const useStyles = makeStyles((theme) => {  
        if(color === 'primary') { 
            color = theme.palette.primary.main
            colorFocusInput = theme.palette.secondary.main
        }
        if(color === 'secondary') {
            color = theme.palette.secondary.main 
            colorFocusInput = theme.palette.primary.main
        }
        if(color === 'custom') { 
            colorFocusInput = theme.palette.primary.main
        }

        return ({ 
            itemBackground: {  
                backgroundColor: theme.palette.background.paper,  
            },
            lineDecor: {
                position: "absolute",
                top: 8,
                left: 8,
                right: 8,
                bottom: 8,
                border: `1px solid ${fade(color, 0.25)}`,
                borderRadius: 4,
            },
            input: {
                width: '100%',
                fontFamily: 'inherit', 
                border: `1px solid ${color}`, 
                backgroundColor: 'inherit',
                color: theme.palette.text.primary,
                boxShadow: 'none', 
                height: 50,
                paddingLeft: 45,
                paddingRight: 25, 
                '&::-webkit-input-placeholder':  {  
                    color: theme.palette.text.primary,
                },
                '&::-moz-placeholder' : { 
                    color: theme.palette.text.primary,
                },
                '&:-ms-input-placeholder': {  
                    color: theme.palette.text.primary,
                },
                '&:-moz-placeholder': { 
                    color: theme.palette.text.primary,
                }, 
                '&:focus': {
                    borderColor: colorFocusInput
                },
                [theme.breakpoints.down('sm')]: {
                    textAlign: 'center' ,
                    paddingLeft: 20,
                    paddingRight: 20, 
                }
            },
            button: {
                width: '100%',
                backgroundColor: color ,
                border: `2px solid ${color}`, 
                height: 50,
                textTransform: 'inherit', 
                
                color: theme.palette.getContrastText(color),
                '&:active' : {
                    backgroundColor: darken(color, 0.4) , 
                },
                [theme.breakpoints.down('sm')]: {
                    marginTop: 0,  
                    '&:hover' : {
                        backgroundColor: color , 
                    },
                },
                [theme.breakpoints.up('sm')]: {
                    '&:hover' : {
                        background: 'none',
                        color: theme.palette.getContrastText(theme.palette.background.paper),
                    }
                }, 
            }, 
            gridItem: {
                paddingRight: theme.spacing(1),
                [theme.breakpoints.down('sm')]: {
                    marginBottom: 10,  
                }
            },
            policy: {
                height: "100%", 
                display: "flex", 
                alignItems: "center", 
                fontSize: 12,
                lineHeight: 1.2,
                fontWeight: 300, 
                [theme.breakpoints.down('md')]: {
                    marginTop: 10, 
                    textAlign: 'center', 
                    justifyContent: 'center'
                }
            }
            
        })
    });

    const classes  = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault()  

        const sendForm = {
            phone: formPhone,
            name: formName,  
            place: 'line Form',  
            isCheck: false
        }

        sendRequests(sendForm)
        
        setFormPhone('')
        setFormName('') 

    }
    return ( 
        <div className={classes.itemBackground}> 
            <Container maxWidth='lg'>
                <div className="line-form"> 
                    <Box className={classes.lineDecor} ></Box>
                    {
                        heading.length > 0 &&
                        <h5>
                            {heading}
                        </h5>
                    }
                    {
                        paragraph.length > 0 &&
                        <p>
                            {paragraph}
                        </p>
                    } 

                    <form onSubmit={handleSubmit} style={{position: 'relative', zIndex: 5}}>
                        <Grid container >
                            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
                                <input 
                                    type="text" 
                                    name={`name-${props.data.id}`} 
                                    required 
                                    placeholder={inputName} 
                                    value={formName}
                                    onChange={(e) => {setFormName(e.target.value)}}
                                    className={classes.input}
                                /> 
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
                                <input 
                                    type="tel" 
                                    name={`phone-${props.data.id}`} 
                                    required 
                                    placeholder={inputPhone} 
                                    value={formPhone}
                                    onChange={(e) => {setFormPhone(e.target.value)}}
                                    className={classes.input}
                                /> 
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={3} className={classes.gridItem}>
                                <Button 
                                    type="submit"
                                    className={classes.button} 
                                >
                                    <span>
                                       { buttonText}
                                    </span>
                                </Button>
                            </Grid>
                            <Grid item xs={12} lg={3} >
                                <span className={classes.policy}>
                                    { policy }
                                </span> 
                            </Grid>

                        </Grid>
                        {/* <div className="line-form_content form-styled"> 
                            <span className="input-container">
                                <input 
                                    type="text" 
                                    name={`name-${props.data.id}`} 
                                    required 
                                    placeholder={inputName} 
                                    value={formName}
                                    onChange={(e) => {setFormName(e.target.value)}}
                                    className={classes.input}
                                /> 
                            </span>
                            <span className="input-container">
                                <input 
                                    type="tel" 
                                    name={`phone-${props.data.id}`} 
                                    required 
                                    placeholder={inputPhone} 
                                    value={formPhone}
                                    onChange={(e) => {setFormPhone(e.target.value)}}
                                    className={classes.input}
                                />  
                            </span> 
                            <div className="bt-main_content__btn">
                                
                            </div>
                            <span className="info">
                                { policy }
                            </span> 
                        </div> */}
                    </form>
                </div> 
            </Container>
        </div> 
    )
}

export default DumbComponent
