import React from 'react'   
import CategoryContext from '../../../context/headerContext/CategoryContext' 
import LoadingContext from '../../../context/loadingContext/LoadingContext' 
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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormGroup
} from '@material-ui/core' 

import { deepOrange } from '@material-ui/core/colors'
import SaveIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import OpenWithIcon from '@material-ui/icons/OpenWith'; 
 
import Draggable from 'react-draggable';  

function ThemeChanger() {
    
    const { setIsLoading } = React.useContext(LoadingContext)
    const { themeMode, themeDark,  themeLight, updateTheme } = React.useContext(CategoryContext)     
  
    const [open, setOpen] = React.useState(false)
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 

    const [mode, setMode] = React.useState(themeMode)

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

        updateTheme(newDarkTheme, newLightTheme,  mode)
        setIsDisableBtn(true)
        handleClose()
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
                               
                            <FormGroup row>
                                <FormControl 
                                    variant='filled' 
                                    size='small'   
                                    // className={classes.settingsItem}
                                >
                                    <InputLabel id="fixed-style-label">Mode</InputLabel>
                                    <Select
                                        labelId="fixed-label"
                                        id="fixed-style"
                                        value={mode}
                                        onChange={(e) => {setIsDisableBtn(false); setMode(e.target.value) }}
                                    >
                                        <MenuItem value={'dark'}>Dark</MenuItem>
                                        <MenuItem value={'light'}>Light</MenuItem> 
                                    </Select>
                                </FormControl>    
                            </FormGroup>  
                            
                            <Box display='flex' flexWrap='nowrap'  mt={2}>
                                <Box mr={1}> 
                                    <TextField 
                                        required
                                        type='text'
                                        variant='outlined'
                                        value={lightBackgroundDefault}
                                        label='Light Background Default'
                                        onChange={(e) => {
                                            setIsDisableBtn(false);
                                            setLightBackgroundDefault(e.target.value) 
                                        }} 
                                    /> 
                                    <Box className={classes.colorPreview} style={{ backgroundColor: lightBackgroundDefault}}></Box>
                                </Box> 
                                <Box mr={1}> 
                                    <TextField 
                                        required
                                        type='text'
                                        variant='outlined'
                                        value={lightBackgroundPaper}
                                        label='Light Background Paper'
                                        onChange={(e) => {
                                            setIsDisableBtn(false);
                                            setLightBackgroundPaper(e.target.value) 
                                        }} 
                                    /> 
                                    <Box className={classes.colorPreview} style={{ backgroundColor: lightBackgroundPaper}}></Box>
                                </Box>  
                                <Box mr={1}> 
                                    <TextField 
                                        required
                                        type='text'
                                        variant='outlined'
                                        value={lightPrimary}
                                        label='Light Primary'
                                        onChange={(e) => {
                                            setIsDisableBtn(false);
                                            setLightPrimary(e.target.value) 
                                        }} 
                                    /> 
                                    <Box className={classes.colorPreview} style={{ backgroundColor: lightPrimary}}></Box>
                                </Box>  
                                <Box> 
                                    <TextField 
                                        required
                                        type='text'
                                        variant='outlined'
                                        value={lightSecondary}
                                        label='Light Secondary'
                                        onChange={(e) => {
                                            setIsDisableBtn(false);
                                            setLightSecondary(e.target.value) 
                                        }} 
                                    /> 
                                    <Box className={classes.colorPreview} style={{ backgroundColor: lightSecondary}}></Box>
                                </Box>  
                            </Box>
                            <Box display='flex' flexWrap='nowrap'  mt={3}>
                                <Box mr={1}> 
                                    <TextField 
                                        required
                                        type='text'
                                        variant='outlined'
                                        value={darkBackgroundDefault}
                                        label='Dark Background Default'
                                        onChange={(e) => {
                                            setIsDisableBtn(false);
                                            setDarkBackgroundDefault(e.target.value) 
                                        }} 
                                    /> 
                                    <Box className={classes.colorPreview} style={{ backgroundColor: darkBackgroundDefault}}></Box>
                                </Box> 
                                <Box mr={1}> 
                                    <TextField 
                                        required
                                        type='text'
                                        variant='outlined'
                                        value={darkBackgroundPaper}
                                        label='Dark Background Paper'
                                        onChange={(e) => {
                                            setIsDisableBtn(false);
                                            setDarkBackgroundPaper(e.target.value) 
                                        }} 
                                    /> 
                                    <Box className={classes.colorPreview} style={{ backgroundColor: darkBackgroundPaper}}></Box>
                                </Box>  
                                <Box mr={1}> 
                                    <TextField 
                                        required
                                        type='text'
                                        variant='outlined'
                                        value={darkPrimary}
                                        label='Dark Primary'
                                        onChange={(e) => {
                                            setIsDisableBtn(false);
                                            setDarkPrimary(e.target.value) 
                                        }} 
                                    /> 
                                    <Box className={classes.colorPreview} style={{ backgroundColor: darkPrimary}}></Box>
                                </Box>  
                                <Box> 
                                    <TextField 
                                        required
                                        type='text'
                                        variant='outlined'
                                        value={darkSecondary}
                                        label='Dark Secondary'
                                        onChange={(e) => {
                                            setIsDisableBtn(false);
                                            setDarkSecondary(e.target.value) 
                                        }} 
                                    /> 
                                    <Box className={classes.colorPreview} style={{ backgroundColor: darkSecondary}}></Box>
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