import React from 'react' 
import firebase from '../../../firebase/firebase'

import CategoryContext from '../../../context/headerContext/CategoryContext' 
import LoadingContext from '../../../context/loadingContext/LoadingContext'  

import StylesChangers from '../../../styles/changers'  
 
import ColorSelecter from '../../functions/colorChanger/ColorSelecter'
import {isNoThemeColor} from '../../functions/colorChanger/ColorCalculation'

import { 
    Tooltip,
    Button, 
    Modal, 
    DialogContent , 
    Typography, 
    TextField,  
    Box,
    makeStyles,   
    Grid,  
    Divider,
    FormControlLabel, 
    Switch, 
} from '@material-ui/core' 
  
import SettingsIcon from '@material-ui/icons/Settings';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import ImageIcon from '@material-ui/icons/Image'; 
import {DeleteOutline} from '@material-ui/icons'; 
 
import Draggable from 'react-draggable';  

import {RemoveImage} from '../../functions/RemoveImage' 

import Confirm from '../../utilits/Confirm'

function LogoChanger() { 
    
    
    const { setIsLoading } = React.useContext(LoadingContext)
    const { logo, modal, updateLogo } = React.useContext(CategoryContext)     
    
    const [isVisibleConfirm, setIsVisibleConfirm] = React.useState(false)    

    const [open, setOpen] = React.useState(false)
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 

    const [mainText, setMainText] = React.useState(logo.mainText)
    const [subText, setSubText] = React.useState(logo.subText)
    const [imageUrl, setImageUrl] = React.useState(logo.imageUrl || '')
    const [imageName, setImageName] = React.useState(logo.imageName || '')

    
    const [isModal, setIsModal] = React.useState(modal.isModal)  
    const [modalText, setModalText] = React.useState(modal.text) 
    const [modalTarget, setModalTarget] = React.useState(modal.target || 'buy') 

    const [colorSelect,  setColorSelect] = React.useState(modal.color)
    const [colorCustom, setColorCustom] = React.useState(modal.color)

    
    const colorTheme = isNoThemeColor(modal.color) 

    React.useEffect(() => {
        if(colorTheme) {  
            setColorSelect('custom')
        }
        // eslint-disable-next-line
    }, [modal])

    const handleOpen = () => {  
      setOpen(true);
    }
    const handleClose = () => {
        if(!isDisableBtn) handleSave()
        setOpen(false);
    }; 

    const useStyles = makeStyles((theme) => {
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)
        
        const { menu, menuTitle, btnSetting, btnSave, btnWithLabel, dialogContentUnstyle } = commonClasses

        return ({  
            dialogContentUnstyle: dialogContentUnstyle, 
            menu: {...menu, ...{
                left: "calc(50% - 250px)",
                maxWidth: 500,   
            }},
            menuTitle: {...menuTitle, ...{ 
                borderColor: isDisableBtn ? '#0000' : theme.palette.secondary.main
            }},
            btnSetting: btnSetting, 
            btnSave: btnSave,  
            btnWithLabel: {...btnWithLabel, ...{
                '& label': {
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: theme.spacing(1, 2)
                }
            }},
        })
    })
    
    const classes = useStyles();
 
    const handleSave = () => {  
        const newLogo = { 
            imageUrl: imageUrl, 
            imageName: imageName, 
            mainText: mainText,
            subText: subText
        }
        const newModal = { 
            isModal: isModal, 
            text: modalText, 
            target: modalTarget
        }
        if (colorSelect === 'custom') {
            newModal.color = colorCustom
        } else {
            newModal.color = colorSelect
        }
        
        updateLogo(newLogo, newModal)
        setIsDisableBtn(true) 
    }  
    const handleImageSetting = (event) => {    
        uploadHandler(event.target.files[0])
        RemoveImage(logo.imageName) 

        setIsLoading(true)
    }
    
    const uploadHandler = (imageData) => { 
        const storageRef = firebase.storage.ref(`${imageData.name}`).put(imageData)
        storageRef.on('state-changed', 
          snapshot => { 
          }, 
          error => {
            console.log(error.message )
          },
          () => { 
            setIsLoading(false)
            storageRef.snapshot.ref.getDownloadURL()
              .then( url => {
                setImageUrl(url) 
                setImageName(imageData.name)
                
                setIsDisableBtn(false)
              })
          }
        ) 
    }
    const handleChange = () => {
        setIsModal(!isModal)
        setIsDisableBtn(false)
    }
    const handleRemoveImage = () => {
        setIsVisibleConfirm(true)  
    }
    const handleConfirmClick = () => {
        RemoveImage(imageName)

        setImageUrl('')
        setImageName('')
        setIsDisableBtn(false)
    } 
    
     
    return (
        <div className={classes.dumbWrapper}>
            <Confirm
                isVariable={false}
                show={isVisibleConfirm}
                setShow={setIsVisibleConfirm} 
                title={'Remove icon?'}
                text={"You can't cancel this action."}
                removeText={"remove"}
                handleRemoveClick={handleConfirmClick}
            />
            <Tooltip title='Logo/Modal Settings' placement='bottom'>
                <Button  
                    onClick={handleOpen} 
                    size='medium'
                    variant='contained'
                    color='primary' 
                    className={classes.btnSetting}
                >   
                    <span>Logo/Modal</span>
                    <SettingsIcon style={{ color: '#fff' }} fontSize='small'/>
                </Button>
            </Tooltip>

            <Modal 
                open={open}  
                aria-labelledby="draggable-dialog-title"
                onClose={handleClose} 
            > 
                <DialogContent classes={{root: classes.dialogContentUnstyle}}> 
                    <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                        <div className={classes.menu}>
                            <Typography 
                                component='p' 
                                className={classes.menuTitle}
                                id="draggable-dialog-title"
                            >
                                { !isDisableBtn && "Close to save - " } Logo/Modal Settings  <OpenWithIcon/>
                            </Typography>
                             
                            <Typography variant='h6' gutterBottom>
                                Set logo 
                            </Typography>
                            <Grid container>
                                <Grid item xs={5}>
                                    <Box display='flex'>
                                        <Button 
                                            color='primary'
                                            variant='contained' 
                                            className={classes.btnWithLabel}
                                        >  
                                            <label htmlFor='image-input-label' style={{whiteSpace: 'nowrap'}}> <ImageIcon color="action" /> Set Logo </label>
                                            <input 
                                                id="image-input-label"
                                                type="file" 
                                                onChange={handleImageSetting} 
                                                style={{ display: "none" }}
                                            />
                                        </Button>
                                        {
                                            imageUrl.length > 0 && 
                                            <Box mx={1}>
                                                <Tooltip title='Remove logo' placement='top' >
                                                    <Button
                                                        size='small'
                                                        color='secondary'
                                                        variant='contained'
                                                        onClick={handleRemoveImage}
                                                    >
                                                        <DeleteOutline/>
                                                    </Button>
                                                </Tooltip>
                                            </Box>
                                        }
                                    </Box>
                                   

                                    {
                                        imageUrl.length > 0 &&
                                        <Box mt={1}>
                                            <img
                                                width={60}
                                                src={imageUrl}
                                                alt='logo'
                                            /> 
                                        </Box>
                                    }
                                </Grid>
                                <Grid item xs={7}> 
                                    <TextField
                                        type='text' 
                                        label="Text input"
                                        fullWidth
                                        value={mainText}  
                                        variant="filled"
                                        onChange={(e) => { setIsDisableBtn(false); setMainText(e.target.value) }}
                                    /> 
                                    <TextField
                                        type='text' 
                                        label="Text input"
                                        fullWidth
                                        value={subText}  
                                        variant="filled"
                                        onChange={(e) => { setIsDisableBtn(false); setSubText(e.target.value) }}
                                    />
                                </Grid>

                            </Grid>
                            <Divider style={{margin: '10px 0'}}/>
                            
                            <Typography variant='h6' gutterBottom>
                                Set Modal Button 
                            </Typography>
                            <Box  mt={3} mb={3}>
                                <FormControlLabel
                                    control={
                                        < Switch checked = { isModal }
                                                onChange = { handleChange }
                                                name = "checkedB" 
                                                color = "primary" />
                                    }
                                    label="Add Modal Button"
                                /> 
                                {
                                    isModal && 
                                    <Box mt={1} >
                                        <Box mb={1}> 
                                                <Box mr={1} display='inline'>
                                                    <TextField
                                                        type='text'
                                                        label="Text for Button"
                                                        variant="outlined"
                                                        value={modalText}
                                                        onChange={(e) => {
                                                        setIsDisableBtn(false);
                                                        setModalText(e.target.value)
                                                    }}/>  
                                                </Box> 
                                                <TextField
                                                    type='text'
                                                    label="Target for Button"
                                                    variant="outlined"
                                                    value={modalTarget}
                                                    onChange={(e) => {
                                                    setIsDisableBtn(false);
                                                    setModalTarget(e.target.value)
                                                }}/>   
                                        </Box>
                                        <Box mt={2} display="flex" flexDirection='column'>
                                            <ColorSelecter
                                                label={'Color for Button'}
                                                colorSelect={colorSelect} 
                                                setColorSelect={setColorSelect}
                                                colorCustom={colorCustom}
                                                setColorCustom={setColorCustom}
                                                setIsDisableBtn={setIsDisableBtn} 
                                                position = {'right'}
                                                noInherit={true}
                                            /> 
                                        </Box>
                                    </Box>
                                }
                            </Box>


                            <Box mt={5} /> 
                        </div>
                    </Draggable>
                </DialogContent> 
            </Modal> 
        </div>
    )
}

export default LogoChanger 