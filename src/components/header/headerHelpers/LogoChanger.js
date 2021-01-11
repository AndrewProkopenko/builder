import React from 'react' 
import firebase from '../../../firebase/firebase'

import CategoryContext from '../../../context/headerContext/CategoryContext' 
import LoadingContext from '../../../context/loadingContext/LoadingContext' 
import ImageContext from '../../../context/imageContext/ImageContext' 

import { ColorPicker } from '../../library/colorPicker/ColorPicker'

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
    FormControl,
    InputLabel, 
    Select, 
    MenuItem
} from '@material-ui/core' 

import { amber } from '@material-ui/core/colors'
import SaveIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import ImageIcon from '@material-ui/icons/Image'; 
 
import Draggable from 'react-draggable';  

function LogoChanger() { 
    
    
    const { setIsLoading } = React.useContext(LoadingContext)
    const { logo, modal, updateLogo } = React.useContext(CategoryContext)     

    const { removeImage  } = React.useContext(ImageContext)     
  
    const [open, setOpen] = React.useState(false)
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 

    const [mainText, setMainText] = React.useState(logo.mainText)
    const [subText, setSubText] = React.useState(logo.subText)
    const [image, setImage] = React.useState(logo.image)
    const [imageName, setImageName] = React.useState(logo.imageName || '')

    
    const [isModal, setIsModal] = React.useState(modal.isModal)  
    const [modalText, setModalText] = React.useState(modal.text) 

    const [colorSelect,  setColorSelect] = React.useState(modal.color)
    const [colorCustom, setColorCustom] = React.useState(modal.color)

    React.useEffect(() => {
        if(modal.color !== 'primary' && modal.color !== 'secondary' ) {  
            setColorSelect('custom')
        }
    }, [modal])

    const handleInputFocus = () => {  
      setOpen(true);
    }
    const handleClose = () => {
      setOpen(false);
    }; 

    const useStyles = makeStyles((theme) => ({ 
        
        menu: {    
            position: "absolute", 
            left: "calc(50% - 200px)",
            top: 50, 
            backgroundColor: theme.palette.background.paper, 
            padding: 10 , 
            paddingBottom: 0, 
            maxWidth: 400,  
            width: 400,
            maxHeight: 'calc(100vh - 100px)', 
            minHeight: 500,
            overflowY: 'scroll',  
        },
        menuTitle: {
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            fontSize: 14, 
            borderBottom: '1px solid #eaeaea',
            paddingBottom: 6,
            marginBottom: 10, 
            cursor: 'move'
        },
        btnSetting: { 
            backgroundColor: amber[500], 
            minWidth: 80, 
            maxHeight: 50, 
            transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms `, 
            '&:hover': {
                backgroundColor: amber[700], 
            }, 
            '&>span': {
                display: 'flex', 
                flexDirection: 'column', 
                fontSize: 10
            }
        }, 
        btnSave: {
            position: 'sticky', 
            zIndex: 15,
            bottom: 0, 
            left: 0, 
            right: 0,
            height: 70, 
            paddingTop: 10, 
            backgroundColor: theme.palette.background.paper, 
        },
         
    
    }))
    
    const classes = useStyles();
 
    const handleSave = () => {  
        const newLogo = { 
            image: image, 
            imageName: imageName, 
            mainText: mainText,
            subText: subText
        }
        const newModal = { 
            isModal: isModal, 
            text: modalText
        }
        if (colorSelect === 'custom') {
            newModal.color = colorCustom
        } else {
            newModal.color = colorSelect
        }
        
        updateLogo(newLogo, newModal)
        setIsDisableBtn(true)
        handleClose()
    }  
    const handleImageSetting = (event) => {    
        uploadHandler(event.target.files[0])
        removeImage(logo.imageName) 

        setIsDisableBtn(false)
        setIsLoading(true)
    }
    
    const uploadHandler = (imageData) => { 
        const storageRef = firebase.storage.ref(`${imageData.name}`).put(imageData)
        storageRef.on('state-changed', 
          snapshot => {
            console.log( snapshot )
          }, 
          error => {
            console.log(error.message )
          },
          () => { 
            setIsLoading(false)
            storageRef.snapshot.ref.getDownloadURL()
              .then( url => {
                setImage(url) 
                setImageName(imageData.name)
              })
          }
        ) 
    }
    const handleChange = () => {
        setIsModal(!isModal)
        setIsDisableBtn(false)
    }
    
     
    return (
        <div className={classes.dumbWrapper}>
            <Tooltip title='Logo/Modal Settings' placement='bottom'>
                <Button  
                    onClick={handleInputFocus} 
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
                <DialogContent> 
                    <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                        <div className={classes.menu}>
                            <Typography 
                                component='p' 
                                className={classes.menuTitle}
                                id="draggable-dialog-title"
                            >
                                Редактировать логотип/модальное окно   <OpenWithIcon/>
                            </Typography>
                             
                            <Typography variant='h6' gutterBottom>
                                Set logo 
                            </Typography>
                            <Grid container>
                                <Grid item xs={5}>
                                    <Button 
                                        color='primary'
                                        variant='contained'
                                        startIcon={<ImageIcon color="action" />}
                                    >  
                                        <label htmlFor='image-input-label'> Set Logo </label>
                                        <input 
                                            id="image-input-label"
                                            type="file" 
                                            onChange={handleImageSetting} 
                                            style={{ display: "none" }}
                                        />
                                    </Button>

                                    <Box mt={1}>
                                        <img
                                            width={60}
                                            src={image}
                                            alt='logo'
                                        /> 
                                    </Box>
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
                                        <Box mt={2} display="flex" flexDirection='column'>
                                            <FormControl variant='filled' style={{minWidth: '250px' }}>
                                                <InputLabel id="color-select-label">Color for Button</InputLabel>
                                                <Select
                                                    labelId="color-select-label"
                                                    id="color-select"
                                                    value={colorSelect}
                                                    onChange={(e) => {setIsDisableBtn(false); setColorSelect(e.target.value)   }}
                                                >
                                                    <MenuItem value={'primary'}>Primary</MenuItem>
                                                    <MenuItem value={'secondary'}>Secondary</MenuItem>
                                                    <MenuItem value={'custom'}>Custom</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Box mt={2} >
                                                {
                                                    colorSelect === 'custom' &&
                                                    <ColorPicker
                                                        initialColor = {colorCustom}
                                                        changeColor = {setColorCustom}
                                                        setIsDisableBtn = {setIsDisableBtn}
                                                        position = {'right'}
                                                    /> 
                                                }
                                                
                                            </Box>
                                        </Box>
                                    </Box>
                                }
                            </Box>


                            <Box className={classes.btnSave} mt={2}>
                                <Button 
                                    color={'primary'} 
                                    variant="contained"
                                    onClick={handleSave}
                                    startIcon={<SaveIcon/>}
                                    disabled={isDisableBtn}
                                >
                                    Save
                                </Button>
                            </Box>
                        </div>
                    </Draggable>
                </DialogContent> 
            </Modal> 
        </div>
    )
}

export default LogoChanger 