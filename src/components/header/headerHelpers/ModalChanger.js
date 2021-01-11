import React from 'react'  
 
import { ColorPicker } from '../../library/colorPicker/ColorPicker'

import LoadingContext from '../../../context/loadingContext/LoadingContext' 
import SendFormContext from '../../../context/sendFormContext/SendFormContext'  
import { 
    Tooltip,
    Button, 
    Modal, 
    DialogContent , 
    Typography,  
    Box,
    makeStyles,   
    TextField,  
    FormControl, 
    Select,
    MenuItem, 
    InputLabel
} from '@material-ui/core' 

import { amber } from '@material-ui/core/colors'
import SaveIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import OpenWithIcon from '@material-ui/icons/OpenWith'; 
 
import Draggable from 'react-draggable';  

function RequestsChanger() {
    
    const { setIsLoading } = React.useContext(LoadingContext)     
    const { modalSettings, updateModalSettings } = React.useContext(SendFormContext)       

    const [open, setOpen] = React.useState(false) 
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 

    const [heading, setHeading] = React.useState(modalSettings.heading)
    const [subHeading, setSubHeading] = React.useState(modalSettings.subHeading)
    const [targetText, setTargetText] = React.useState(modalSettings.targetText)
    const [buttonText, setButtonText] = React.useState(modalSettings.buttonText)
    const [policy, setPolicy] = React.useState(modalSettings.policy)
    
    const [colorSelect,  setColorSelect] = React.useState(modalSettings.colorButton)
    const [colorCustom, setColorCustom] = React.useState(modalSettings.colorButton)

    const [inputName, setInputName] = React.useState(modalSettings.inputName || '')
    const [inputPhone, setInputPhone] = React.useState(modalSettings.inputPhone || '')

    
    const handleInputFocus = () => {  
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }; 
     

    const useStyles = makeStyles((theme) => ({ 
        
        menu: {    
            position: "absolute", 
            left: "calc(50% - 300px)",
            top: 50, 
            backgroundColor: theme.palette.background.paper, 
            padding: 10 , 
            paddingBottom: 0, 
            maxWidth: 600,  
            width: '100%',
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
            backgroundColor: amber[700], 
            minWidth: 80, 
            maxHeight: 50, 
            transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms `, 
            '&:hover': {
                backgroundColor: amber[900], 
            }, 
            '&>span': {
                display: 'flex',  
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
        const newData = Object.assign({}, modalSettings) 
         
        newData.heading = heading
        newData.subHeading = subHeading
        newData.targetText = targetText
        newData.inputName = inputName
        newData.inputPhone = inputPhone
        newData.buttonText = buttonText
        newData.policy = policy
 
        if (colorSelect === 'custom') {
            newData.colorButton = colorCustom
        } else {
            newData.colorButton = colorSelect
        }
        setIsDisableBtn(true)
        setIsLoading(true)
        handleClose()

        updateModalSettings(newData)
        setIsLoading(false)
    }  
      
    return (
        <div className={classes.dumbWrapper}>
            <Tooltip title='Requests List' placement='bottom'>
                <Button  
                    onClick={handleInputFocus} 
                    size='medium'
                    variant='contained'
                    color='primary' 
                    className={classes.btnSetting}
                >   
                    <span>Modal</span>
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
                                Requests from form  <OpenWithIcon/>
                            </Typography>
                             
                            <Box my={2}>
                                <TextField  
                                    type='text'
                                    label="Heading" 
                                    variant="outlined" 
                                    size='small'  
                                    fullWidth
                                    value={heading}
                                    onChange={ (e) => { setIsDisableBtn(false); setHeading(e.target.value) } }     
                                />
                            </Box>
                            <Box my={2}>
                                <TextField  
                                    type='text'
                                    label="Sub Heading" 
                                    variant="outlined" 
                                    size='small'  
                                    fullWidth
                                    value={subHeading}
                                    onChange={ (e) => { setIsDisableBtn(false); setSubHeading(e.target.value) } }     
                                />
                            </Box>
                            <Box my={2}>
                                <TextField  
                                    type='text'
                                    label="Target text" 
                                    variant="outlined" 
                                    size='small'  
                                    fullWidth
                                    value={targetText}
                                    onChange={ (e) => { setIsDisableBtn(false); setTargetText(e.target.value) } }     
                                />
                            </Box>
                            <Box my={2}>
                                <TextField  
                                    type='text'
                                    label="Input Name text" 
                                    variant="outlined" 
                                    size='small'  
                                    fullWidth
                                    value={inputName}
                                    onChange={ (e) => { setIsDisableBtn(false); setInputName(e.target.value) } }     
                                />
                            </Box>
                            <Box my={2}>
                                <TextField  
                                    type='text'
                                    label="Input Phone text" 
                                    variant="outlined" 
                                    size='small'  
                                    fullWidth
                                    value={inputPhone}
                                    onChange={ (e) => { setIsDisableBtn(false); setInputPhone(e.target.value) } }     
                                />
                            </Box>
                            <Box my={2}>
                                <TextField  
                                    type='text'
                                    label="Button text" 
                                    variant="outlined" 
                                    size='small'  
                                    fullWidth
                                    value={buttonText}
                                    onChange={ (e) => { setIsDisableBtn(false); setButtonText(e.target.value) } }     
                                />
                            </Box>
                            <Box my={2}>
                                <TextField  
                                    type='text'
                                    label="Policy text" 
                                    variant="outlined" 
                                    size='small'  
                                    fullWidth
                                    value={policy}
                                    onChange={ (e) => { setIsDisableBtn(false); setPolicy(e.target.value) } }     
                                />
                            </Box>
                            <Box display="flex" >
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
                                <Box ml={1} >
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

export default RequestsChanger 