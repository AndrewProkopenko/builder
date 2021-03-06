import React, { useEffect, useState, useContext } from 'react'  

import StylesChangers from '../../../styles/changers'  
  
import ColorSelecter from '../../functions/colorChanger/ColorSelecter'
import {isNoThemeColor} from '../../functions/colorChanger/ColorCalculation'

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
} from '@material-ui/core' 

import { amber } from '@material-ui/core/colors' 
import SettingsIcon from '@material-ui/icons/Settings';
import OpenWithIcon from '@material-ui/icons/OpenWith'; 
 
import Draggable from 'react-draggable';  

import InputChange from '../../functions/InputChange'

function RequestsChanger() {
    
    const { setIsLoading } = useContext(LoadingContext)     
    const { modalSettings, updateModalSettings } = useContext(SendFormContext)       

    const [open, setOpen] = useState(false) 
    const [isDisableBtn, setIsDisableBtn] = useState(true) 

    const [heading, setHeading] = useState(modalSettings.heading)
    const [subHeading, setSubHeading] = useState(modalSettings.subHeading)
    const [targetText, setTargetText] = useState(modalSettings.targetText)
    const [buttonText, setButtonText] = useState(modalSettings.buttonText)
    const [policy, setPolicy] = useState(modalSettings.policy)
    
    const [colorSelect,  setColorSelect] = useState(modalSettings.colorButton)
    const [colorCustom, setColorCustom] = useState(modalSettings.colorButton)

    const [inputName, setInputName] = useState(modalSettings.inputName || '')
    const [inputPhone, setInputPhone] = useState(modalSettings.inputPhone || '')

    
    const handleOpen = () => {  
        setOpen(true);
    }
    const handleClose = () => {
        if(!isDisableBtn) handleSave()
        setOpen(false);
    }; 
     
    const colorTheme = isNoThemeColor(modalSettings.colorButton)
    useEffect(() => {
        if(colorTheme) {  
            setColorSelect('custom')
        }  
        // eslint-disable-next-line
    }, [modalSettings.colorButton])
    

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
            menuTitle: {...menuTitle, ...{ 
                borderColor: isDisableBtn ? '#0000' : theme.palette.secondary.main
            }},
            btnSetting: {...btnSetting, ...{
                backgroundColor: amber[500], 
                '&>span' :{
                    flexDirection: 'row',
                    fontSize: 10
                },
                '&:hover': {
                    backgroundColor: amber[700],  
                }
            }},  
        })
    })
    
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

        updateModalSettings(newData)
        setIsLoading(false)
    }  
      
    return (
        <div className={classes.dumbWrapper}>
            <Tooltip title='Modal Settings' placement='bottom'>
                <Button  
                    onClick={handleOpen} 
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
                <DialogContent classes={{root: classes.dialogContentUnstyle}} > 
                    <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                        <div className={classes.menu}>
                            <Typography 
                                component='p' 
                                className={classes.menuTitle}
                                id="draggable-dialog-title"
                            >
                                { !isDisableBtn && "Close to save - " } Modal Settings <OpenWithIcon/>
                            </Typography>
                             
                            <Box my={2}> 
                                <InputChange
                                    id={null}
                                    fullWidth={true}
                                    type='text'
                                    size="small" 
                                    label="Heading" 
                                    variant='outlined'
                                    value={heading}
                                    setValue={setHeading}
                                    setIsDisableBtn={setIsDisableBtn} 
                                /> 
                            </Box>
                            <Box my={2}>
                                <InputChange
                                    id={null}
                                    fullWidth={true}
                                    type='text'
                                    size="small" 
                                    label="Sub Heading"
                                    variant='outlined'
                                    value={subHeading}
                                    setValue={setSubHeading}
                                    setIsDisableBtn={setIsDisableBtn} 
                                /> 
                            </Box>
                            <Box my={2}>
                                <InputChange
                                    id={null}
                                    fullWidth={true}
                                    type='text'
                                    size="small" 
                                    label="Target text" 
                                    variant='outlined'
                                    value={targetText}
                                    setValue={setTargetText}
                                    setIsDisableBtn={setIsDisableBtn} 
                                /> 
                            </Box>
                            <Box my={2}>
                                <InputChange
                                    id={null}
                                    fullWidth={true}
                                    type='text'
                                    size="small" 
                                    label="Input Name text" 
                                    variant='outlined'
                                    value={inputName}
                                    setValue={setInputName}
                                    setIsDisableBtn={setIsDisableBtn} 
                                />
                            </Box>
                            <Box my={2}>
                                <InputChange
                                    id={null}
                                    fullWidth={true}
                                    type='text'
                                    size="small" 
                                    label="Input Phone text" 
                                    variant='outlined'
                                    value={inputPhone}
                                    setValue={setInputPhone}
                                    setIsDisableBtn={setIsDisableBtn} 
                                /> 
                            </Box>
                            <Box my={2}>
                                <InputChange
                                    id={null}
                                    fullWidth={true}
                                    type='text'
                                    size="small" 
                                    label="Button text" 
                                    variant='outlined'
                                    value={buttonText}
                                    setValue={setButtonText}
                                    setIsDisableBtn={setIsDisableBtn} 
                                />  
                            </Box>
                            <Box my={2}>
                                <InputChange
                                    id={null}
                                    fullWidth={true}
                                    type='text'
                                    size="small" 
                                    label="Policy text" 
                                    variant='outlined'
                                    value={policy}
                                    setValue={setPolicy}
                                    setIsDisableBtn={setIsDisableBtn} 
                                />  
                            </Box>
                            <Box display="flex" >
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
                             
                            <Box mt={5} /> 

                        </div>
                    </Draggable>
                </DialogContent> 
            </Modal> 
        </div>
    )
}

export default RequestsChanger 