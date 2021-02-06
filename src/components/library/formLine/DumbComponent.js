import React, { useState, useContext} from 'react'

import SendFormContext from '../../../context/sendFormContext/SendFormContext'

import { Container, makeStyles, Button, Box, Grid, fade, darken, lighten } from '@material-ui/core'

import {getColorByPalette, getColorByPaletteReverse} from '../../functions/colorChanger/ColorCalculation'

import '../../../assets/style/lineForm.scss' 

import ValidationChip from '../../utilits/ValidationChip'
import {NameValidation, PhoneValidation} from '../../functions/formValidation'
import InputMaskPhone from '../../functions/InputMaskPhone'

function DumbComponent(props) {  
    const { sendRequests, validationSettings } = useContext(SendFormContext)

    const [formPhone, setFormPhone] = useState('')
    const [formName, setFormName] = useState('') 
    
    const [isValidPhone, setIsValidPhone] = useState({isValid: true})
    const [isValidName, setIsValidName] = useState({isValid: true})
   
    const heading = props.data.heading
    const paragraph = props.data.paragraph
    const inputName = props.data.inputName
    const inputPhone = props.data.inputPhone 
    const buttonText = props.data.buttonText
    const policy = props.data.policy
      
    const marginTop = props.data.marginTop  
    const marginBottom = props.data.marginBottom  
    const maxWidthContainer = props.data.maxWidthContainer 

    let color = props.data.color
    let colorFocusInput, inValidColor
  
    const useStyles = makeStyles((theme) => {    

        color = getColorByPalette(theme, color)
        colorFocusInput = getColorByPaletteReverse(theme, props.data.color) 
        inValidColor = getColorByPalette(theme, validationSettings.color) 

        return ({ 
            itemBackground: {  
                backgroundColor: theme.palette.background.paper,  
                marginTop: marginTop, 
                marginBottom: marginBottom, 
                [theme.breakpoints.down('sm')]: { 
                    marginTop: marginTop === 0 ? 0 : (marginTop > 50 ? marginTop*0.6 : 30), 
                    marginBottom: marginBottom === 0 ? 0 : (marginBottom > 50 ? marginBottom*0.6 : 30),
                }
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
                transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms`, 
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
                    borderColor: colorFocusInput,
                    background: fade(colorFocusInput, 0.07), 
                    "&:hover": {
                        background: fade(colorFocusInput, 0.07), 
                    },
                },
                "&:hover": {
                    background: fade(color, 0.07), 
                },
                [theme.breakpoints.down('sm')]: {
                    textAlign: 'center' ,
                    paddingLeft: 20,
                    paddingRight: 20, 
                }
            },
            inValidInput: {
                borderColor: lighten(inValidColor, 0.2),
                background: fade(inValidColor, 0.15), 
                '&::-webkit-input-placeholder':  {  
                    color: lighten(inValidColor, 0.2),
                },
                '&::-moz-placeholder' : { 
                    color: lighten(inValidColor, 0.2),
                },
                '&:-ms-input-placeholder': {  
                    color: lighten(inValidColor, 0.2),
                },
                '&:-moz-placeholder': { 
                    color: lighten(inValidColor, 0.2),
                },
            },
            button: {
                width: '100%',
                backgroundColor: color ,
                border: `2px solid ${color}`, 
                height: 50,
                textTransform: 'inherit', 
                transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms`, 
                
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
                        background: fade(color, 0.15), 
                        color: theme.palette.getContrastText(theme.palette.background.paper),
                    }
                }, 
            }, 
            gridItem: {
                position: 'relative',
                paddingRight: theme.spacing(1), 
                [theme.breakpoints.down('sm')]: {
                    marginBottom: 10,  
                }
            },
            gridValidation: {
                position: 'relative', 
                height: 45, 
                [theme.breakpoints.down('sm')]: {
                    height: 35
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

        const valphone = PhoneValidation(formPhone) 
        const valname = NameValidation(formName) 

        if(valphone.isValid && valname.isValid) {
            const sendForm = {
                phone: formPhone,
                name: formName,  
                place: 'line Form',  
                isCheck: false
            }
    
            sendRequests(sendForm)
            
            setFormPhone('')
            setFormName('')
        } else {
          setIsValidName(valname)
          setIsValidPhone(valphone)
        }
         

    }
    const handleChangePhone = (value) => {
        setFormPhone(value) 
        setIsValidPhone({isValid: true})
      }
      const handleChangeName = (value) => {
        setFormName(value) 
        setIsValidName({isValid: true})
      }
    
      const handleCloseValidationChip = (place) => {
        if(place === 'name') setIsValidName({isValid: true})
        if(place === 'phone') setIsValidPhone({isValid: true})
      }
    return ( 
        <div className={classes.itemBackground}> 
            <Container maxWidth={maxWidthContainer}>
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
                            <Grid item xs={12} sm={6} md={4} lg={3}  >
                            {
                                !isValidName.isValid && 
                                <Box className={classes.gridValidation}>
                                    <ValidationChip 
                                        isValid={isValidName.isValid}  
                                        handleClose={handleCloseValidationChip}
                                        place={'name'}
                                        absolute={true} 
                                        closeOnFirstClick={true}
                                        style={{width: 'calc(100% - 10px)', top: 'auto', bottom: 0}}
                                    />
                                </Box>
                            }
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}  >
                            {
                                !isValidPhone.isValid && 
                                <Box className={classes.gridValidation}>
                                    <ValidationChip  
                                        isValid={isValidPhone.isValid}  
                                        handleClose={handleCloseValidationChip}
                                        place={'phone'}
                                        absolute={true} 
                                        closeOnFirstClick={true}
                                        style={{width: 'calc(100% - 10px)', top: 'auto', bottom: 0}}
                                    />
                                </Box>
                                
                            }
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
                                <input 
                                    type="text" 
                                    name={`name-${props.data.id}`}  
                                    placeholder={inputName} 
                                    value={formName}
                                    onChange={(e) => {handleChangeName(e.target.value)}} 
                                    className={`${classes.input} ${!isValidName.isValid && classes.inValidInput}`} 
                                /> 
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
                                 
                                <InputMaskPhone 
                                    placeholder={`${inputPhone}`}   
                                    className={`${classes.input} ${!isValidPhone.isValid && classes.inValidInput}`} 
                                    value={formPhone}
                                    setValue={handleChangePhone}
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
                        
                    </form>
                </div> 
            </Container>
        </div> 
    )
}

export default DumbComponent
