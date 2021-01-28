
import React from 'react'  

import StylesChangers from '../../../styles/changers'  

import { ColorPicker } from '../../functions/colorChanger/ColorPicker'
import CategoryContext from '../../../context/headerContext/CategoryContext'  
import { 
    Tooltip,
    Button, 
    Modal, 
    DialogContent , 
    Typography, 
    TextField,  
    Box,
    makeStyles,   
    FormGroup,
    FormControl, 
    InputLabel,
    Select, 
    MenuItem, 

} from '@material-ui/core' 
 
import SaveIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import OpenWithIcon from '@material-ui/icons/OpenWith'; 
 
import Draggable from 'react-draggable';  

function StyleChanger() {
     
    const { settings, updateSettings } = React.useContext(CategoryContext)     
  
    const [open, setOpen] = React.useState(false)
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 

    const [settingGutter, setSettingGutter] = React.useState(settings.disableGutters)
    const [settingFixed, setSettingFixed] = React.useState(settings.fixed)
    const [settingMaxWidth, setSettingMaxWidth] = React.useState(settings.maxWidth)
    const [settingBreakpoint, setSettingBreakpoint] = React.useState(settings.breakpoint || 'md')

    const [settingBoxShadow, setSettingBoxShadow] = React.useState(settings.classes.boxShadow)
    const [settingPadding, setSettingPadding] = React.useState(settings.classes.paddingY)
    const [settingPosition, setSettingPosition] = React.useState(settings.classes.position)
    const [settingBackgroundSelect, setSettingBackgroundSelect] = React.useState(settings.classes.backgroundColor ||  'transparent')
    const [settingBackgroundCustom, setSettingBackgroundCustom] = React.useState(settings.classes.backgroundColor ||  'transparent')

    React.useEffect(() => {
        if( 
            settings.classes.backgroundColor !== 'default' && 
            settings.classes.backgroundColor !== 'paper' && 
            settings.classes.backgroundColor !== 'primary' &&  
            settings.classes.backgroundColor !== 'secondary' &&
            settings.classes.backgroundColor !== 'warning' &&
            settings.classes.backgroundColor !== 'error' &&
            settings.classes.backgroundColor !== 'info' &&
            settings.classes.backgroundColor !== 'success'  
        ) {  
            setSettingBackgroundSelect('custom')
        }
    }, [settings])
     
    const handleInputFocus = () => {  
      setOpen(true);
    }
    const handleClose = () => {
      setOpen(false);
    }; 

    const useStyles = makeStyles((theme) => {
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle, btnSetting, btnSave } = commonClasses
        return ({  
            menu: {...menu, ...{
                left: "calc(50% - 200px)",
                maxWidth: 400,   
            }},
            menuTitle: menuTitle,
            btnSetting: btnSetting, 
            btnSave: btnSave,   
            settingsItem: {
                width: '100%',
                marginRight: 5, 
                marginBottom: 10, 
                flexGrow: 1, 
            },
        })
    })
    
    const classes = useStyles();
 
    const handleSave = () => {  
        const newSettings = { 
            disableGutters: settingGutter,
            fixed: settingFixed,
            maxWidth: settingMaxWidth,
            classes: {
                boxShadow: settingBoxShadow,
                paddingY: settingPadding,
                position: settingPosition, 
            } ,
            breakpoint: settingBreakpoint
        }
        if (settingBackgroundSelect === 'custom') {
            newSettings.classes.backgroundColor = settingBackgroundCustom
        } else {
            newSettings.classes.backgroundColor = settingBackgroundSelect
        }
 
        updateSettings(newSettings)
        setIsDisableBtn(true)
        handleClose()
    }  
     
     
    return (
        <div className={classes.dumbWrapper}>
            <Tooltip title='Style Settings' placement='bottom'>
                <Button  
                    onClick={handleInputFocus} 
                    size='medium'
                    variant='contained'
                    color='primary' 
                    className={classes.btnSetting}
                >   
                    <span>Style</span>
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
                                Style changer <OpenWithIcon/>
                            </Typography>
                             
                            <FormGroup row>
                                    <FormControl 
                                        variant='filled' 
                                        size='small'   
                                        className={classes.settingsItem}
                                    >
                                        <InputLabel id="dis-gutters-style-label">Disable Gutters</InputLabel>
                                        <Select
                                            labelId="dis-gutters-label"
                                            id="dis-gutters-style"
                                            value={settingGutter}
                                            onChange={(e) => {setIsDisableBtn(false); setSettingGutter(e.target.value) }}
                                        >
                                            <MenuItem value={false}>False</MenuItem>
                                            <MenuItem value={true}>True</MenuItem> 
                                        </Select>
                                    </FormControl>

                                    

                                    <FormControl 
                                        variant='filled' 
                                        size='small'   
                                        className={classes.settingsItem}
                                    >
                                        <InputLabel id="fixed-style-label">Fixed</InputLabel>
                                        <Select
                                            labelId="fixed-label"
                                            id="fixed-style"
                                            value={settingFixed}
                                            onChange={(e) => {setIsDisableBtn(false); setSettingFixed(e.target.value) }}
                                        >
                                            <MenuItem value={false}>False</MenuItem>
                                            <MenuItem value={true}>True</MenuItem> 
                                        </Select>
                                    </FormControl>  
                                </FormGroup>
                                
                                <FormGroup row> 
                                    <FormControl 
                                        variant='filled' 
                                        size='small'   
                                        className={classes.settingsItem}
                                    >
                                        <InputLabel id="maxWidth-style-label">Max-Width</InputLabel>
                                        <Select
                                            labelId="maxWidth-label"
                                            id="maxWidth-style"
                                            value={settingMaxWidth}
                                            onChange={(e) => {setIsDisableBtn(false); setSettingMaxWidth(e.target.value) }}
                                        >
                                            <MenuItem value={false}>False</MenuItem>
                                            <MenuItem value={'xl'}>xl - 1920 </MenuItem> 
                                            <MenuItem value={'lg'}>lg - 1280 </MenuItem> 
                                            <MenuItem value={'md'}>md - 960 </MenuItem> 
                                            <MenuItem value={'sm'}>sm - 600 </MenuItem> 
                                            <MenuItem value={'xs'}>xs - 0 </MenuItem> 
                                        </Select>
                                    </FormControl>
                                    <FormControl 
                                        variant='filled' 
                                        size='small'   
                                        className={classes.settingsItem}
                                    >
                                        <InputLabel id="maxWidth-style-label">Breakpoint for Mobile</InputLabel>
                                        <Select
                                            labelId="Breakpoint-label"
                                            id="Breakpoint-style"
                                            value={settingBreakpoint}
                                            onChange={(e) => {setIsDisableBtn(false); setSettingBreakpoint(e.target.value) }}
                                        > 
                                            <MenuItem value={'xl'}>xl - 1920 </MenuItem> 
                                            <MenuItem value={'lg'}>lg - 1280 </MenuItem> 
                                            <MenuItem value={'md'}>md - 960 </MenuItem> 
                                            <MenuItem value={'sm'}>sm - 600 </MenuItem> 
                                            <MenuItem value={'xs'}>xs - 0 </MenuItem> 
                                        </Select>
                                    </FormControl>
                                        
                                    <FormControl 
                                        variant='filled' 
                                        size='small'   
                                        className={classes.settingsItem}
                                    >
                                        <InputLabel id="Position-style-label">Position</InputLabel>
                                        <Select
                                            labelId="Position-label"
                                            id="Position-style"
                                            value={settingPosition}
                                            onChange={(e) => {setIsDisableBtn(false); setSettingPosition(e.target.value) }}
                                        > 
                                            <MenuItem value={'static'}>Static</MenuItem>  
                                            <MenuItem value={'fixed'}>Fixed</MenuItem>  
                                        </Select>
                                    </FormControl>

                                    
                                </FormGroup>
                                <FormGroup row> 
                                     <TextField 
                                        className={classes.settingsItem}
                                        type='number'
                                        label="Padding Top/Bottom" 
                                        variant="filled" 
                                        size='small'  
                                        value={settingPadding}
                                        onChange={ (e) => { setIsDisableBtn(false); setSettingPadding(Number(e.target.value)) } }     
                                    />
                                    <FormControl  
                                        variant='filled' 
                                        size='small'   
                                        className={classes.settingsItem}
                                    >
                                        <InputLabel id="Shadow-style-label">Shadow</InputLabel>
                                        <Select
                                            labelId="Shadow-label"
                                            id="Shadow-style"
                                            value={settingBoxShadow}
                                            onChange={(e) => {setIsDisableBtn(false); setSettingBoxShadow(e.target.value) }}
                                        > 
                                            <MenuItem value={'none'}>None</MenuItem>
                                            <MenuItem value={`0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),
                                            0px 1px 5px 0px rgba(0,0,0,0.12)`}>Small</MenuItem>
                                            <MenuItem value={`0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),
                                            0px 3px 16px 2px rgba(0,0,0,0.12)`}>Medium</MenuItem>
                                            <MenuItem value={`0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),
                                            0px 9px 46px 8px rgba(0,0,0,0.12)`}>Large</MenuItem> 
                                        </Select>
                                    </FormControl>
                                    
                                    <Box mt={2} display="flex" flexDirection='column'>
                                            <FormControl    variant='filled' style={{minWidth: '250px' }}>
                                                <InputLabel id="color-select-label">Background Color for Header</InputLabel>
                                                <Select
                                                    labelId="color-select-label"
                                                    id="color-select"
                                                    value={settingBackgroundSelect}
                                                    onChange={(e) => {setIsDisableBtn(false); setSettingBackgroundSelect(e.target.value)   }}
                                                >
                                                    <MenuItem value={'primary'}>Theme Primary</MenuItem>
                                                    <MenuItem value={'secondary'}>Theme Secondary</MenuItem> 
                                                    <MenuItem value={'warning'}>Theme Warning</MenuItem>
                                                    <MenuItem value={'error'}>Theme Error</MenuItem>
                                                    <MenuItem value={'info'}>Theme Info</MenuItem>
                                                    <MenuItem value={'success'}>Theme Success</MenuItem>
                                                    <MenuItem value={'default'}>Theme BG default</MenuItem>
                                                    <MenuItem value={'paper'}>Theme BG paper</MenuItem>
                                                    <MenuItem value={'custom'}>Custom</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Box mt={2} >
                                                {
                                                    settingBackgroundSelect === 'custom' &&
                                                    <ColorPicker
                                                        initialColor = {settingBackgroundCustom}
                                                        changeColor = {setSettingBackgroundCustom}
                                                        setIsDisableBtn = {setIsDisableBtn}
                                                        position = {'left'}
                                                    /> 
                                                }
                                                
                                            </Box>
                                        </Box>
                                    <Box 
                                        className={classes.settingsItem}
                                    > 
                                        
                                    </Box> 
                                </FormGroup>
                                   
     
                          
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

export default StyleChanger 