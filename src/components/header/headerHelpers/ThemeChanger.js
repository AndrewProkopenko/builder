import React from 'react'   

import StylesChangers from '../../../styles/changers'  

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

    const [lightError, setLightError] = React.useState(themeLight.palette.error.main) 
    const [darkError, setDarkError] = React.useState(themeDark.palette.error.main) 

    const [lightWarning, setLightWarning] = React.useState(themeLight.palette.warning.main) 
    const [darkWarning, setDarkWarning] = React.useState(themeDark.palette.warning.main) 

    const [lightInfo, setLightInfo] = React.useState(themeLight.palette.info.main) 
    const [darkInfo, setDarkInfo] = React.useState(themeDark.palette.info.main) 

    const [lightSuccess, setLightSuccess] = React.useState(themeLight.palette.success.main) 
    const [darkSuccess, setDarkSuccess] = React.useState(themeDark.palette.success.main) 
 
    // text.primary
    // text.secondary
    // text.disabled
 
    const handleInputFocus = () => {  
      setOpen(true);
    }
    const handleClose = () => {
      setOpen(false);
    }; 

    const useStyles = makeStyles((theme) => {
        console.log(theme.palette.success)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle, btnSetting, btnSave } = commonClasses
        return ({  
            menu: {...menu, ...{
                left: "calc(50% - 450px)",
                maxWidth: 900,   
            }},
            menuTitle: menuTitle,
            btnSetting: btnSetting, 
            btnSave: btnSave,   
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
        
        })
    })
    
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
                },
                error: {
                    main: lightError
                },
                warning: {
                    main: lightWarning
                },
                info: {
                    main: lightInfo
                },
                success: {
                    main: lightSuccess
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
                },
                error: {
                    main: darkError
                },
                warning: {
                    main: darkWarning
                },
                info: {
                    main: darkInfo
                },
                success: {
                    main: darkSuccess
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
                                Theme Changer  <OpenWithIcon/>
                            </Typography>

                            <Typography 
                                variant='h6'  
                            >
                                Light Theme
                            </Typography>

                            <Box display='flex' flexWrap='nowrap'  mt={1} mb={2}>
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
                            <Box display='flex' flexWrap='nowrap'  mt={1} mb={3}>
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Light Warning - { lightWarning }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {lightWarning}
                                        changeColor = {setLightWarning}
                                        setIsDisableBtn = {setIsDisableBtn}
                                        position = {'top'}
                                        noInherit={true}
                                    /> 
                                </Box> 
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Light Error - { lightError }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {lightError}
                                        changeColor = {setLightError}
                                        setIsDisableBtn = {setIsDisableBtn}
                                        position = {'top'}
                                        noInherit={true}
                                    /> 
                                </Box> 
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Light Info - { lightInfo }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {lightInfo}
                                        changeColor = {setLightInfo}
                                        setIsDisableBtn = {setIsDisableBtn}
                                        position = {'top'}
                                        noInherit={true}
                                    /> 
                                </Box>  
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Light Success - { lightSuccess }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {lightSuccess}
                                        changeColor = {setLightSuccess}
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
                            <Box display='flex' flexWrap='nowrap'  mt={1}>
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Dark Warning- { darkWarning }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {darkWarning}
                                        changeColor = {setDarkWarning}
                                        setIsDisableBtn = {setIsDisableBtn}
                                        position = {'left'}
                                        noInherit={true}
                                    /> 
                                </Box>
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Dark Error - { darkError }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {darkError}
                                        changeColor = {setDarkError}
                                        setIsDisableBtn = {setIsDisableBtn}
                                        position = {'left'}
                                        noInherit={true}
                                    /> 
                                </Box>
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Dark Info - { darkInfo}
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {darkInfo}
                                        changeColor = {setDarkInfo}
                                        setIsDisableBtn = {setIsDisableBtn}
                                        position = {'left'}
                                        noInherit={true}
                                    /> 
                                </Box>
                                <Box className={classes.colorItem}> 
                                    <Typography variant='caption' >
                                        Dark Succwss - { darkSuccess }
                                    </Typography>
                                    <ColorPicker
                                        initialColor = {darkSuccess}
                                        changeColor = {setDarkSuccess}
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