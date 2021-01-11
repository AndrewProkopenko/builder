import React from 'react'   
import Draggable from 'react-draggable';   
import { ColorPicker } from '../../library/colorPicker/ColorPicker'

import { 
    Tooltip,
    Button, 
    Modal, 
    DialogContent , 
    Typography,  
    Box,
    makeStyles,    
    Divider
} from '@material-ui/core' 

import { deepOrange } from '@material-ui/core/colors'
import SaveIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import OpenWithIcon from '@material-ui/icons/OpenWith'; 
 
import CategoryContext from '../../../context/headerContext/CategoryContext'  

function ThemeChanger() {
     
    const { themeDark,  themeLight, updateTheme } = React.useContext(CategoryContext)     
  
    const [open, setOpen] = React.useState(false)
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 
  
    const [lightBackgroundDefault, setLightBackgroundDefault] = React.useState(themeLight.palette.background.default)
    const [lightBackgroundPaper, setLightBackgroundPaper] = React.useState(themeLight.palette.background.paper)
    const [darkBackgroundDefault, setDarkBackgroundDefault] = React.useState(themeDark.palette.background.default)
    const [darkBackgroundPaper, setDarkBackgroundPaper] = React.useState(themeDark.palette.background.paper)

    const [lightPrimary, setLightPrimary] = React.useState(themeLight.palette.primary.main) 
    const [darkPrimary, setDarkPrimary] = React.useState(themeDark.palette.primary.main) 

    const [lightSecondary, setLightSecondary] = React.useState(themeLight.palette.secondary.main) 
    const [darkSecondary, setDarkSecondary] = React.useState(themeDark.palette.secondary.main) 


 
    const handleInputFocus = () => {  
      setOpen(true);
    }
    const handleClose = () => {
      setOpen(false);
    }; 

    const useStyles = makeStyles((theme) => ({ 
        
        menu: {    
            position: "absolute", 
            left: "calc(50% - 450px)",
            top: 50, 
            backgroundColor: theme.palette.background.paper, 
            padding: 10 , 
            paddingBottom: 0, 
            maxWidth: 900,  
            width: 900,
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
            backgroundColor: deepOrange[800], 
            minWidth: 80, 
            maxHeight: 50, 
            transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms `, 
            '&:hover': {
                backgroundColor: deepOrange[700], 
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
        colorPreview: { 
            width: '100%',
            height: 8,  
            borderRadius: 3, 
        }, 
        colorItem: {
            display: "flex",
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            maxWidth: '25%',

            flexGrow: 1, 
            marginRight: theme.spacing(1)
        }
    
    }))
    
    const classes = useStyles();
 
    const handleSave = () => {  
        const newLightTheme = {   
            palette: {
                type: "light",
                background: {
                    default: lightBackgroundDefault,
                    paper: lightBackgroundPaper
                },
                secondary: {
                    main: lightSecondary
                },
                primary: {
                    main: lightPrimary
                }
            } 
        }
        const newDarkTheme = {   
            palette: {
                type: "dark",
                background: {
                    default: darkBackgroundDefault,
                    paper: darkBackgroundPaper
                },
                secondary: {
                    main: darkSecondary
                },
                primary: {
                    main: darkPrimary
                }
            } 
        }

        updateTheme(newDarkTheme, newLightTheme )
        setIsDisableBtn(true)
        handleClose()
    }  
    
     
    return (
        <div className={classes.dumbWrapper}>
            <Tooltip title='Theme Settings' placement='bottom'>
                <Button  
                    onClick={handleInputFocus} 
                    size='medium'
                    variant='contained'
                    color='primary' 
                    className={classes.btnSetting}
                >   
                    <span>Theme</span>
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
                                Отредактировать тему  <OpenWithIcon/>
                            </Typography>

                            <Typography 
                                variant='h6'  
                            >
                                Light Theme
                            </Typography>
                            <Box display='flex' flexWrap='nowrap'  mt={1} mb={3}>
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Light Background Default - { lightBackgroundDefault }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {lightBackgroundDefault}
                                        changeColor = {setLightBackgroundDefault}
                                        setIsDisableBtn = {setIsDisableBtn}
                                        position = {'top'}
                                        noInherit={true}
                                    /> 
                                </Box> 
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Light Background Paper - { lightBackgroundPaper }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {lightBackgroundPaper}
                                        changeColor = {setLightBackgroundPaper}
                                        setIsDisableBtn = {setIsDisableBtn}
                                        position = {'top'}
                                        noInherit={true}
                                    /> 
                                </Box> 
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Light Primary - { lightPrimary }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {lightPrimary}
                                        changeColor = {setLightPrimary}
                                        setIsDisableBtn = {setIsDisableBtn}
                                        position = {'top'}
                                        noInherit={true}
                                    /> 
                                </Box>  
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Light Secondary - { lightSecondary }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {lightSecondary}
                                        changeColor = {setLightSecondary}
                                        setIsDisableBtn = {setIsDisableBtn}
                                        position = {'top'}
                                        noInherit={true}
                                    /> 
                                </Box>  
                                 
                            </Box>

                            <Box mt={3} mb={4} >
                               <Divider />
                            </Box>

                            <Typography 
                                variant='h6'  
                            >
                                Dark Theme
                            </Typography>
                            <Box display='flex' flexWrap='nowrap'  mt={1}>
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Dark Background Default - { darkBackgroundDefault }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {darkBackgroundDefault}
                                        changeColor = {setDarkBackgroundDefault}
                                        setIsDisableBtn = {setIsDisableBtn}
                                        position = {'left'}
                                        noInherit={true}
                                    /> 
                                </Box>
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Dark Background Paper - { darkBackgroundPaper }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {darkBackgroundPaper}
                                        changeColor = {setDarkBackgroundPaper}
                                        setIsDisableBtn = {setIsDisableBtn}
                                        position = {'left'}
                                        noInherit={true}
                                    /> 
                                </Box>
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Dark Primary - { darkPrimary }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {darkPrimary}
                                        changeColor = {setDarkPrimary}
                                        setIsDisableBtn = {setIsDisableBtn}
                                        position = {'left'}
                                        noInherit={true}
                                    /> 
                                </Box>
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Dark Secondary - { darkSecondary }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {darkSecondary}
                                        changeColor = {setDarkSecondary}
                                        setIsDisableBtn = {setIsDisableBtn}
                                        position = {'right'}
                                        noInherit={true}
                                    /> 
                                </Box> 
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

export default ThemeChanger 