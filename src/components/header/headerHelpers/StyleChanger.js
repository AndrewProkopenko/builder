
import React, { useEffect, useState, useContext } from 'react'  

import StylesChangers from '../../../styles/changers'  
 
import {isNoThemeColor} from '../../functions/colorChanger/ColorCalculation'
import ColorSelecter from '../../functions/colorChanger/ColorSelecter'
import SelectShadow from '../../functions/SelectShadow'

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
    IconButton
} from '@material-ui/core' 

import {InfoOutlined} from '@material-ui/icons'; 
  
import SettingsIcon from '@material-ui/icons/Settings';
import OpenWithIcon from '@material-ui/icons/OpenWith'; 
 
import Draggable from 'react-draggable';  

function StyleChanger() {
     
    const { settings, updateSettings } = useContext(CategoryContext)     
  
    const [open, setOpen] = useState(false)
    const [isDisableBtn, setIsDisableBtn] = useState(true) 

    const [settingGutter, setSettingGutter] = useState(settings.disableGutters)
    const [settingFixed, setSettingFixed] = useState(settings.fixed)
    const [settingMaxWidth, setSettingMaxWidth] = useState(settings.maxWidth)
    const [settingBreakpoint, setSettingBreakpoint] = useState(settings.breakpoint || 'md')

    const [settingBoxShadow, setSettingBoxShadow] = useState(settings.classes.boxShadow)
    const [settingPadding, setSettingPadding] = useState(settings.classes.paddingY)
    const [settingPosition, setSettingPosition] = useState(settings.classes.position)
    const [settingBackgroundSelect, setSettingBackgroundSelect] = useState(settings.classes.backgroundColor ||  'transparent')
    const [settingBackgroundCustom, setSettingBackgroundCustom] = useState(settings.classes.backgroundColor ||  'transparent')

    
    const colorTheme = isNoThemeColor(settings.classes.backgroundColor) 
    useEffect(() => {
        if(colorTheme) {  
            setSettingBackgroundSelect('custom')
        }
        // eslint-disable-next-line
    }, [settings])
     
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

        const { menu, menuTitle, btnSetting, dialogContentUnstyle, infoBtn, infoBlock } = commonClasses
        
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
            settingsItem: {
                width: '100%',
                marginRight: 5, 
                marginBottom: 10, 
                flexGrow: 1, 
            },
            infoBlock: infoBlock,
            infoBtn: infoBtn,
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
    }  
     
     
    return (
        <div className={classes.dumbWrapper}>
            <Tooltip title='Style Settings' placement='bottom'>
                <Button  
                    onClick={handleOpen} 
                    size='medium'
                    variant='contained'
                    color='primary' 
                    className={classes.btnSetting}
                >   
                    <span>Style Header</span>
                    <SettingsIcon style={{ color: '#fff' }} fontSize='small'/>
                </Button>
            </Tooltip>

            <Modal 
                open={open}  
                aria-labelledby="draggable-dialog-title"
                onClose={handleClose} 
            > 
                <DialogContent classes={{root: classes.dialogContentUnstyle}} > 
                    <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                        <div className={classes.menu}>
                            <Typography 
                                component='p' 
                                className={classes.menuTitle}
                                id="draggable-dialog-title"
                            >
                               { !isDisableBtn && "Close to save - " }  Header Style Settings <OpenWithIcon/>
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
                                    <SelectShadow
                                        variant='filled' 
                                        size='small'   
                                        className={classes.settingsItem}
                                        label='Header shadow'
                                        value={settingBoxShadow}
                                        setValue={setSettingBoxShadow}
                                        setIsDisableBtn={setIsDisableBtn}
                                    />
                                    
                                    
                                    <Box mt={2} display="flex" flexDirection='column'>
                                        <ColorSelecter
                                            label={'Background for Header'}
                                            colorSelect={settingBackgroundSelect} 
                                            setColorSelect={setSettingBackgroundSelect}
                                            colorCustom={settingBackgroundCustom}
                                            setColorCustom={setSettingBackgroundCustom}
                                            setIsDisableBtn={setIsDisableBtn} 
                                            position = {'right'}
                                            noInherit={true}
                                        />
                                             
                                        </Box>
                                        <Box className={classes.infoBlock} mt={2}> 
                                            <Box mr={1}>  
                                                <IconButton className={classes.infoBtn} >
                                                    <InfoOutlined/>
                                                </IconButton> 
                                            </Box>
                                            <Box>
                                                <Typography variant='h6'>
                                                    Max Width , Fixed  and Disable Gutters settings also share for footer 
                                                </Typography>   
                                            </Box>
                                        </Box>
                                </FormGroup>
                                   
     
                          
                            <Box mt={5} /> 
                        </div>
                    </Draggable>
                </DialogContent> 
            </Modal> 
        </div>
    )
}

export default StyleChanger 