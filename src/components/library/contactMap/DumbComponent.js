import React, {useState, useContext} from 'react'

import { Container, Grid, makeStyles, Button, Box, darken, fade, lighten } from '@material-ui/core'

import {getColorByPalette, getColorByPaletteReverse} from '../../functions/colorChanger/ColorCalculation' 
import { NameValidation, PhoneValidation} from '../../functions/formValidation'
import InputMaskPhone from '../../functions/InputMaskPhone' 
import ValidationChip from '../../utilits/ValidationChip'

import SendFormContext from '../../../context/sendFormContext/SendFormContext'

import '../../../assets/style/contactMap.scss' 

import {Location} from '../../../assets/icons/location.js'
import {Phone} from '../../../assets/icons/phone.js'

function DumbComponent(props) {
    const { sendRequests, validationSettings } = useContext(SendFormContext)

    const [formPhone, setFormPhone] = useState('')
    const [formName, setFormName] = useState('')
    const [formComment, setFormComment] = useState('')

    const [isValidPhone, setIsValidPhone] = useState({isValid: true})
    const [isValidName, setIsValidName] = useState({isValid: true})
 
    const mapHtml = props.data.mapFrame
    const location = props.data.location 
    const phone = props.data.phone
    const paragraph = props.data.paragraph
    const inputName = props.data.inputName
    const inputPhone = props.data.inputPhone
    const inputComment = props.data.inputComment
    const buttonText = props.data.buttonText
    const policy = props.data.policy
     
    let colorMapOnload  
    let color = props.data.color || 'primary'
    let colorFocusInput, inValidColor

    const marginTop = props.data.marginTop  
    const marginBottom = props.data.marginBottom  
    const maxWidthContainer = props.data.maxWidthContainer 

    const useStyles = makeStyles((theme) => {  
        colorMapOnload = theme.palette.primary.dark

        color = getColorByPalette(theme, color)
        colorFocusInput = getColorByPaletteReverse(theme, props.data.color) 
        inValidColor = getColorByPalette(theme, validationSettings.color) 
 
        return ({
            svg: {
                fill: colorFocusInput, 
                marginRight: 15,
                maxWidth: 25,
                minWidth: 25,
                height: 25,
                transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms`, 
                '& svg': {
                    width: "100%",
                    height: "100%",
                }
            }, 
            itemBackground: {  
                backgroundColor: theme.palette.background.paper, 
                position: 'relative', 
                zIndex: 10, 
                [`@media (max-width: 960px)`]: {
                    marginBottom: mapHtml !== null ? 380 : 0
                }, 
                [`@media (max-width: 600px)`]: {
                    marginBottom: mapHtml !== null ? 280 : 0
                }, 
            },
            input: {
                fontFamily: 'inherit', 
                border: `1px solid ${color}`,  
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow: 'none', 
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
                backgroundColor: color ,
                border: `2px solid ${color}`, 
                color: '#fff',
                 
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
            link: { 
                '&:hover': { 
                    color: `${color} !important`,
                }
            },
            boxForFlex: { 
                [`@media (min-width: ${theme.breakpoints.values.md}px)`]: { 
                    display: mapHtml !== null ? 'block' : 'flex', 
                    flexDirection: 'row-reverse', 
                    justifyContent: 'space-between'
                }, 
            }, 
            heightRegular: {
                height: mapHtml === null ? 'auto' : 430,
                [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
                    height: 'auto', 
                }
            }, 
            linksContainer : {
                width: '100%',
                display: mapHtml !== null ? 'block' : 'flex', 
                
                justifyContent: 'center',
                flexDirection: 'column', 
                alignItems: 'center'
            }, 
            styleClass: {
                marginTop: marginTop, 
                marginBottom: marginBottom, 
                [theme.breakpoints.down('sm')]: { 
                    marginTop: marginTop === 0 ? 0 : (marginTop > 50 ? marginTop*0.6 : 30),  
                    marginBottom: marginBottom === 0 ? 0 : (marginBottom > 50 ? marginBottom*0.6 : 30),  
                }
            }, 
            validationChipsContainer: {
                display: 'flex', 
                [theme.breakpoints.down('sm')]: {
                    flexDirection: 'column',
                    '& >*' : {
                        marginLeft: 0, 
                        marginTop: `0px !important`
                    }
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
                comment: formComment,
                place: 'contact',  
                isCheck: false
            }
    
            sendRequests(sendForm)
            
            setFormPhone('')
            setFormName('')
            setFormComment('')
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
        <div style={{position: 'relative'}}> 
            <Container maxWidth={maxWidthContainer}>
                <div className={`bulder-contact ${classes.styleClass}`}> 
                    <Grid container>  
                        <Grid item xs={12} md={ mapHtml !== null ? 6 : 12 } className={classes.itemBackground} >  
                            <div className={`bulder-contact_item ${classes.heightRegular}`} >
                                <Box className={classes.boxForFlex}>
                                    <Box className={classes.linksContainer}>
                                        <div className="loc">
                                            <div className={classes.svg} > 
                                                <Location/>
                                            </div>
                                            <span>
                                                {location}
                                            </span>
                                        </div>
                                        <div className="tel" >
                                            <div className={classes.svg}> 
                                                 <Phone/>
                                            </div>

                                            <a className={classes.link} href={`tel:${phone}`}> {phone} </a>
                                        </div>
                                    </Box>
                                    <form onSubmit={handleSubmit}>
                                        <p> 
                                            { paragraph }
                                        </p>
                                        <Box className={classes.validationChipsContainer}> 
                                            {
                                                !isValidName.isValid &&
                                                <Box flexGrow={1}  >
                                                    <ValidationChip  
                                                        isValid={isValidName.isValid} 
                                                        handleClose={handleCloseValidationChip}
                                                        place={'name'}
                                                        absolute={false}
                                                        style={{marginTop: 0}}
                                                        closeOnFirstClick={true}
                                                    />
                                                </Box>
                                            } 
                                            { !isValidName.isValid && !isValidPhone.isValid && <Box mr={1} /> }
                                            {
                                                !isValidPhone.isValid &&
                                                <Box flexGrow={1} >
                                                    <ValidationChip  
                                                        isValid={isValidPhone.isValid}  
                                                        handleClose={handleCloseValidationChip}
                                                        place={'phone'}
                                                        absolute={false}
                                                        style={{ marginTop: 0 }}
                                                        closeOnFirstClick={true}
                                                    />
                                                </Box>
                                            } 
                                        </Box>
                                        <div className="kr-form">
                                            <div className="kr-form-inputs">
                                            <span>
                                                <input 
                                                    name="name" 
                                                    type="text" 
                                                    placeholder={inputName}  
                                                    className={`${classes.input} ${!isValidName.isValid && classes.inValidInput}`} 
                                                    value={formName}
                                                    onChange={e => {handleChangeName(e.target.value)}}
                                                />
                                            </span>
                                            <span>
                                                <InputMaskPhone 
                                                    placeholder={`${inputPhone}`}  
                                                    className={`${classes.input} ${!isValidPhone.isValid && classes.inValidInput}`} 
                                                    value={formPhone}
                                                    setValue={handleChangePhone}
                                                /> 
                                            </span>
                                            </div>
                                            <textarea   
                                                cols={30} 
                                                rows={10} 
                                                placeholder={inputComment}  
                                                className={classes.input}
                                                value={formComment}
                                                onChange={e => {setFormComment(e.target.value)}}
                                            />
                                        </div>
                                        <div className="bulder-contact_item-btn">
                                            <div className="btn-custom">
                                                <Button type="submit" className={classes.button}>
                                                    <span> { buttonText } </span>
                                                </Button>
                                            </div>
                                            <span>
                                                { policy }
                                            </span>
                                        </div>
                                    </form>
                                </Box>
                            </div> 
                        </Grid>
                        {   
                            mapHtml  && 
                            <Grid item lg={6} className={`position-static`} > 
                                <div className="map" style={{ backgroundColor: colorMapOnload }} > 
                                    <div style={{height: '100%'}} dangerouslySetInnerHTML={{__html: mapHtml}}></div> 
                                </div>
                            </Grid>
                        } 
                    </Grid> 
                </div>
            </Container>
        </div> 
    )
}

export default DumbComponent
