import React from 'react'  

import StylesChangers from '../../../styles/changers'   

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
    IconButton,
    MenuItem, 
    FormControl,
    Select, 
    InputLabel
} from '@material-ui/core' 
import {InfoOutlined} from '@material-ui/icons'; 

import { amber } from '@material-ui/core/colors' 
import SettingsIcon from '@material-ui/icons/Settings';
import OpenWithIcon from '@material-ui/icons/OpenWith'; 
 
import Draggable from 'react-draggable';  

import {isNoThemeColor} from '../../functions/colorChanger/ColorCalculation'
import ColorSelecter from '../../functions/colorChanger/ColorSelecter'

import InputChange from '../../functions/InputChange'
import ValidationChip from '../../placeholders/ValidationChip'


function RequestsChanger() {
    
    const { setIsLoading } = React.useContext(LoadingContext)     
    const { validationSettings, updateValidationSettings } = React.useContext(SendFormContext)       

    const [open, setOpen] = React.useState(false) 
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 

    const [mask, setMask] = React.useState(validationSettings.mask || '')  
    const [name, setName] = React.useState(validationSettings.name || '')
    const [phone, setPhone] = React.useState(validationSettings.phone || '')
    const [variant, setVariant] = React.useState(validationSettings.variant || 'filled')
    const [colorSelect,  setColorSelect] = React.useState(validationSettings.color || 'error')
    const [colorCustom, setColorCustom] = React.useState(validationSettings.color || 'error')

    const colorTheme = isNoThemeColor(validationSettings.color) 
    React.useEffect(() => {
        if(colorTheme) {  
            setColorSelect('custom')
        }  
        // eslint-disable-next-line
    }, [validationSettings.color])  

    const handleOpen = () => {  
        setOpen(true);
    }
    const handleClose = () => {
        if(!isDisableBtn) handleSave()
        setOpen(false);
    }; 
    const handleChangeVariant = (value) => {
        setVariant(value)
    }
         
    const useStyles = makeStyles((theme) => {
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)
        const { menu, menuTitle, btnSetting, dialogContentUnstyle } = commonClasses
 
        return ({  
            dialogContentUnstyle: dialogContentUnstyle, 
            menu: {...menu, ...{
                left: "calc(50% - 300px)",
                maxWidth: 600,   
            }},
            menuTitle: menuTitle,
            btnSetting: {...btnSetting, ...{
                backgroundColor: amber[500], 
                '&>span' :{
                    flexDirection: 'row',
                    fontSize: 10
                }
            }},  
            infoBlock: {
                display: "flex", 
                alignItems: 'center', 
                padding: theme.spacing(1), 
                border: `1px solid ${theme.palette.divider}`, 
                '&:hover': {
                    borderColor: theme.palette.warning.light,  
                    '& $infoBtn': {
                        backgroundColor: theme.palette.warning.main,   
                        '& svg': {
                            fill: theme.palette.getContrastText(theme.palette.warning.main)
                        }
                    }
                }
                 
            },
            infoBtn: {
                backgroundColor: theme.palette.divider, 
                '&:hover': {
                    backgroundColor: theme.palette.warning.light,
                }
            },  
        })
    })
    
    const classes = useStyles();
 
    const handleSave = () => {  
        const newData = Object.assign({}, validationSettings) 
         
        newData.mask = mask 
        newData.name = name 
        newData.phone = phone 
        newData.variant = variant 
        if (colorSelect === 'custom') {
            newData.color = colorCustom
        } else {
            newData.color = colorSelect
        }
  
        setIsDisableBtn(true)
        setIsLoading(true) 

        updateValidationSettings(newData)
        setIsLoading(false)
    }  
      
    return (
        <div className={classes.dumbWrapper}>
            <Tooltip title='Validation Settings' placement='bottom'>
                <Button  
                    onClick={handleOpen} 
                    size='medium'
                    variant='contained'
                    color='primary' 
                    className={classes.btnSetting}
                >   
                    <span>Validation</span>
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
                                { !isDisableBtn && "Close to save - " } Validation Settings <OpenWithIcon/>
                            </Typography>
                             
                            <Box my={2}>
                                <InputChange
                                    id={null}
                                    fullWidth={true}
                                    type='text'
                                    size="small" 
                                    label='Error text for Name input'
                                    variant='outlined'
                                    value={name}
                                    setValue={setName}
                                    setIsDisableBtn={setIsDisableBtn} 
                                />  
                            </Box>
                            <Box my={2}>
                                <InputChange
                                    id={null}
                                    fullWidth={true}
                                    type='text'
                                    size="small" 
                                    label='Error text for Phone input'
                                    variant='outlined'
                                    value={phone}
                                    setValue={setPhone}
                                    setIsDisableBtn={setIsDisableBtn} 
                                /> 
                            </Box> 
                            <Box my={2}>
                                <InputChange
                                    id={null}
                                    fullWidth={true}
                                    type='text'
                                    size="small" 
                                    label='Mask Phone input'
                                    variant='outlined'
                                    value={mask}
                                    setValue={setMask}
                                    setIsDisableBtn={setIsDisableBtn} 
                                /> 
                                
                            </Box> 
                            <Box my={2}>
                                <ColorSelecter
                                    label={'Background'}
                                    colorSelect={colorSelect} 
                                    setColorSelect={setColorSelect}
                                    colorCustom={colorCustom}
                                    setColorCustom={setColorCustom}
                                    setIsDisableBtn={setIsDisableBtn} 
                                    position = {'top'}
                                    noInherit={true}
                                />
                            </Box> 
                            <Box my={2}>
                                <FormControl 
                                    variant='filled' 
                                    size='small'    
                                >
                                    <InputLabel id="variant-style-label">Variant</InputLabel>
                                    <Select
                                        labelId="variant-label"
                                        id="variant-style"
                                        value={variant}
                                        style={{minWidth: 180}}
                                        onChange={(e) => {setIsDisableBtn(false); handleChangeVariant(e.target.value) }}
                                    > 
                                        <MenuItem value={'filled'}>Filled</MenuItem> 
                                        <MenuItem value={'outlined'}>Outlined</MenuItem>  
                                    </Select>
                                </FormControl>
                            </Box> 
                            <Box className={classes.infoBlock}> 
                                <Box mr={1}>  
                                    <IconButton className={classes.infoBtn} >
                                        <InfoOutlined/>
                                    </IconButton> 
                                </Box>
                                <Box>
                                    <Typography>
                                        Validation Setting is common for all fields on site
                                    </Typography>
                                    <Typography>
                                        Enter the mask in the format "+7 (999) 999-99-99", where 9 is any number  
                                    </Typography> 
                                    <ValidationChip 
                                        textForView={name} 
                                        variantView={variant} 
                                        colorView={colorSelect === 'custom' ? colorCustom : colorSelect} 
                                        isValid={false} 
                                        handleClose={() => {}} 
                                        absolute={false} 
                                        closeOnFirstClick={false}
                                    />
                                    <ValidationChip 
                                        textForView={phone} 
                                        variantView={variant} 
                                        colorView={colorSelect === 'custom' ? colorCustom : colorSelect} 
                                        isValid={false} 
                                        handleClose={() => {}} 
                                        absolute={false} 
                                        closeOnFirstClick={false}
                                    />
                                </Box>
                            </Box>
                             
                            <Box mt={5} /> 

                        </div>
                    </Draggable>
                </DialogContent> 
            </Modal> 
        </div>
    )
}

export default RequestsChanger 