import React, {useContext, useState} from 'react';
import { 
    makeStyles, 
    Modal, 
    Backdrop, 
    Fade, 
    Button, 
    Typography,  
    Box,
    IconButton,   
} from '@material-ui/core';  
import CloseIcon from '@material-ui/icons/Close'; 

import '../../assets/style/modal.scss'

import SendFormContext from '../../context/sendFormContext/SendFormContext'
import ModalContext from '../../context/modalContext/ModalContext'

import InputMaskPhone from '../functions/InputMaskPhone'
import ValidationChip from '../utilits/ValidationChip'

import { getColorByPalette, getColorByPaletteForGradient} from '../functions/colorChanger/ColorCalculation'

import { NameValidation, PhoneValidation} from '../functions/formValidation'

export default function TransitionsModal() {
  
  const { sendRequests , modalSettings, validationSettings } = useContext(SendFormContext)
  const { target, open, handleClose } = useContext(ModalContext)
 
  const [formPhone, setFormPhone] = useState('')
  const [formName, setFormName] = useState('') 
  const [isValidPhone, setIsValidPhone] = useState({isValid: true})
  const [isValidName, setIsValidName] = useState({isValid: true})

  const heading = modalSettings.heading
  const subHeading = modalSettings.subHeading
  const targetText = modalSettings.targetText
  const buttonText = modalSettings.buttonText
  const policy = modalSettings.policy
  const inputName = modalSettings.inputName
  const inputPhone = modalSettings.inputPhone 

  let colorGradient1, colorGradient2, inValidColorFade
  let inValidColor = validationSettings.color 
 
  const useStyles = makeStyles((theme) => {
     
    colorGradient1 = getColorByPaletteForGradient(theme, modalSettings.colorButton)[0]
    colorGradient2 = getColorByPaletteForGradient(theme, modalSettings.colorButton)[1]
    inValidColor = getColorByPalette(theme, validationSettings.color)   
      
    return ({
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        position: 'relative', 
        backgroundColor: theme.palette.background.paper,  
        padding: theme.spacing(2, 6, 4),
        margin: theme.spacing(2),
        [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
          padding: theme.spacing(2, 2, 3),
        }, 
        '&:focus': {
          outline: 0
        }
      },
      closeBtn: {
        position: 'absolute', 
        top: 15, 
        right: 10
      }, 
      input: {
        fontFamily: 'inherit', 
        border: `1px solid ${theme.palette.divider}`, 
        outline: 0, 
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 'none', 
        width: "100%",
        height: 50,
        textAlign: 'center', 
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
          borderColor: colorGradient1, 
          // background: fade(colorGradient1, 0.05), 
          "&:hover": {
              // background: fade(colorGradient1, 0.05), 
          },
        },
        '&:hover': {
          backgroundColor: "#7979792b", 
        },
         
      },
      inValidInput: {
          borderColor: inValidColor, 
          background: inValidColorFade,  
      },
      button: {
        backgroundImage: `linear-gradient(180deg, ${colorGradient1} 0%, ${colorGradient2} 100%)`,  
        color: colorGradient2 ?  theme.palette.getContrastText(colorGradient2) : theme.palette.primary.main ,
        textTransform: 'inherit', 
        width: "100%",
        height: 50,
        '&:hover': {  
            backgroundImage: `linear-gradient(200deg, ${colorGradient1} 0%, ${colorGradient2} 100%)`, 
        }
      },
      targetContainer: {  
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: theme.spacing(2), 
        border: `1px solid ${colorGradient1}`, 
        padding: theme.spacing(1, 2), 
        minHeight: 50, 
        maxWidth: 250, 
        width: '100%', 
        textAlign: 'center', 
        fontSize: ".875rem"
      }, 
      targetLabel: {
        display: 'block', 
        textAlign: 'center', 
        fontSize: ".9em",  
        fontWeight: 500, 
        color: theme.palette.text.secondary
      } 
    })
  });
  
  const classes = useStyles();
  
  const handleSubmit = (e) => {
    e.preventDefault()

      
    const valphone = PhoneValidation(formPhone) 
    const valname = NameValidation(formName) 

    if(valphone.isValid && valname.isValid) {
      const sendForm = {
        phone: formPhone,
        name: formName,  
        target: target,
        place: 'modal',  
        isCheck: false
      }

      sendRequests(sendForm)
      
      setFormPhone('')
      setFormName('')
      closeModal()
    } else {
      setIsValidName(valname)
      setIsValidPhone(valphone)
    }
      
  } 
    
  const closeModal = () => { 
    setIsValidName({isValid: true})
    setIsValidPhone({isValid: true})
    handleClose()
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
    <React.Fragment> 
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 250,
        }}
      >
        <Fade in={open}>
            <div className={classes.paper}>
                <IconButton 
                  aria-label="close" 
                  onClick={closeModal} 
                  size={'small'}
                  className={classes.closeBtn}
                >
                  <CloseIcon />
                </IconButton>
                <div className="modal-item">
                     
                  <Typography component='h3'>
                    { heading }
                  </Typography>

                  <Typography component='h6'>
                    { subHeading }
                  </Typography> 

                  {
                    target.length > 0 && 
                    <Box className={classes.targetContainer}>
                      <span className={classes.targetLabel}>{ targetText } &nbsp; </span> { target }
                    </Box>  
                  }
                     
                  <form onSubmit={handleSubmit}>   
                    <Box my={1}>  
                      {
                        !isValidName.isValid &&
                        <ValidationChip  
                          isValid={isValidName.isValid} 
                          handleClose={handleCloseValidationChip}
                          place={'name'}
                          absolute={false}
                          style={{textAlign: 'center'}}
                        />
                      }
                      {
                        !isValidPhone.isValid &&
                        <ValidationChip  
                          isValid={isValidPhone.isValid}  
                          handleClose={handleCloseValidationChip}
                          place={'phone'}
                          absolute={false}
                          style={{textAlign: 'center'}}
                        />
                      }
                      <input  
                          type="text" 
                          placeholder={inputName}  
                          variant='outlined' 
                          className={`${classes.input} ${!isValidName.isValid && classes.inValidInput}`} 
                          value={formName}
                          onChange={ e => handleChangeName(e.target.value)}
                      />
                    </Box>
                    <Box my={1}>
                      
                      <InputMaskPhone 
                          placeholder={`${inputPhone}`}   
                          className={`${classes.input} ${!isValidPhone.isValid && classes.inValidInput}`} 
                          value={formPhone}
                          setValue={handleChangePhone}
                      /> 
                    </Box> 
                    <div className="btn-custom ">
                      <Button
                        type="submit" 
                        variant='contained'
                        className={classes.button}
                      >
                        { buttonText } 
                      </Button>
                    </div>
                  </form>
                  <span className='policy'> { policy } </span>
                </div>
            </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}