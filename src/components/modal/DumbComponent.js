import React from 'react';
import { 
    makeStyles, 
    Modal, 
    Backdrop, 
    Fade, 
    Button, 
    Typography,  
    Box,
    IconButton
} from '@material-ui/core'; 
import { darken } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import '../../assets/style/modal.scss'

import SendFormContext from '../../context/sendFormContext/SendFormContext'
import ModalContext from '../../context/modalContext/ModalContext'



export default function TransitionsModal() {
  
  const { sendRequests , modalSettings } = React.useContext(SendFormContext)
  const { target, open, 
    // handleOpen, 
    handleClose } = React.useContext(ModalContext)
 
  const [formPhone, setFormPhone] = React.useState('')
  const [formName, setFormName] = React.useState('') 

  const heading = modalSettings.heading
  const subHeading = modalSettings.subHeading
  const targetText = modalSettings.targetText
  const buttonText = modalSettings.buttonText
  const policy = modalSettings.policy
  const inputName = modalSettings.inputName
  const inputPhone = modalSettings.inputPhone
  const colorButton = modalSettings.colorButton 
  let colorGradient1, colorGradient2  
 
  const useStyles = makeStyles((theme) => {

    if(colorButton === 'primary') {
        colorGradient1 = theme.palette.primary.main
        colorGradient2 = theme.palette.primary.dark
    }
    if(colorButton === 'secondary') {
        colorGradient1 = theme.palette.secondary.main
        colorGradient2 = theme.palette.secondary.dark
    }
    if(colorButton !== 'primary' && colorButton !== 'secondary' ) {
      if(modalSettings.colorButton) {
        colorGradient1 = modalSettings.colorButton
        colorGradient2 = darken(modalSettings.colorButton, 0.4)
      } 
    } 

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
          borderColor: colorGradient1
        }
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
  } 

  // const openModal = () => {
  //   handleOpen('')
  // }
  const closeModal = () => {
    handleClose()
  }

  return (
    <React.Fragment>
      {/* <button type="button" onClick={ openModal }>
        react-transition-group
      </button> */}
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
                      <input  
                          type="text" 
                          placeholder={inputName} 
                          required 
                          variant='outlined' 
                          className={classes.input}
                          value={formPhone}
                          onChange={ e => setFormPhone(e.target.value)}
                      />
                    </Box>
                    <Box my={1}>
                      <input  
                          type="tel" 
                          placeholder={`${inputPhone}`} 
                          required
                          variant='outlined'  
                          className={classes.input}
                          value={formName}
                          onChange={ e => setFormName(e.target.value)}
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