import React from 'react' 
import firebase from '../../firebase/firebase'
import CategoryContext from '../../context/headerContext/CategoryContext' 
import LoadingContext from '../../context/loadingContext/LoadingContext' 
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
} from '@material-ui/core' 

import { orange } from '@material-ui/core/colors'
import SaveIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import ImageIcon from '@material-ui/icons/Image'; 
 
import Draggable from 'react-draggable';  

function LogoChanger() {
    
    const { setIsLoading } = React.useContext(LoadingContext)
    const { logo, updateLogo } = React.useContext(CategoryContext)     
  
    const [open, setOpen] = React.useState(false)
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 

    const [mainText, setMainText] = React.useState(logo.mainText)
    const [subText, setSubText] = React.useState(logo.subText)
    const [image, setImage] = React.useState(logo.image)
     
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
            backgroundColor: '#fff',
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
            // opacity: 0,
            // position: 'absolute', 
            // zIndex: 10, 
            // top: 2, 
            // right: 2,
            backgroundColor: orange[700], 
            minWidth: 80, 
            minHeight: 60, 
            transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms opacity`, 
            '&:hover': {
                backgroundColor: orange[900], 
            }, 
            '&>span': {
                display: 'flex', 
                flexDirection: 'column', 
                fontSize: 10
            }
        },
        dumbWrapper: {
            // position: 'absolute', 
            // zIndex: 10, 
            // top: 0, 
            // left: 0,  
            // height: 64,
            // width: 150, 
            '&:hover $btnSetting': {
                opacity: 1
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
            backgroundColor: '#fff'
        },
        accordionContainer: {
            position: 'relative', 
            '&:hover $deleteBtn': {
                opacity: 1
            },
            '&:hover $movingBtn': {
                opacity: 1
            }, 
        }, 
    
    }))
    
    const classes = useStyles();
 
    const handleSave = () => {  
        const newLogo = { 
            image: image, 
            mainText: mainText,
            subText: subText
        }
        updateLogo(newLogo)
        setIsDisableBtn(true)
        handleClose()
    }  
    const handleImageSetting = (event) => {    
        uploadHandler(event.target.files[0])
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
            console.log(error.message)
          },
          () => {
            setIsLoading(false)
            storageRef.snapshot.ref.getDownloadURL()
              .then( url => {
                setImage(url) 
              })
          }
        )
    }
     
    return (
        <div className={classes.dumbWrapper}>
            <Tooltip title='Logo Settings' placement='bottom'>
                <Button  
                    onClick={handleInputFocus} 
                    size='medium'
                    variant='contained'
                    color='primary' 
                    className={classes.btnSetting}
                >   
                    <span>Logo</span>
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
                                Создать/отредактировать логотип  <OpenWithIcon/>
                            </Typography>
                             
                            <Grid container>
                                <Grid item xs={5}>
                                    <Button 
                                        color='primary'
                                        variant='outlined'
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
                                    <img
                                        width={100}
                                        src={logo.image}
                                        alt='logo'
                                    /> 
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