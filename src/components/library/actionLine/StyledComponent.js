import React, { useEffect, useState } from 'react' 
import StylesChangers from '../../../styles/changers'  
import StyledInputs from '../../../styles/inputs'    

import Draggable from 'react-draggable';
import ColorSelecter from '../../functions/colorChanger/ColorSelecter'
import {isNoThemeColor} from '../../functions/colorChanger/ColorCalculation'

import {
    Select, 
    FormControl,  
    MenuItem, 
    InputLabel, 
    Button,
    Box,
    Tooltip, 
    FormControlLabel,
    Switch,
    Typography,
    ButtonGroup,
    makeStyles,
    Modal,
    DialogContent
} from '@material-ui/core'

import OpenWithIcon from '@material-ui/icons/OpenWith';

import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import {DeleteOutline} from '@material-ui/icons';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

import DumbComponent from "./DumbComponent"

import InputChange from '../../functions/InputChange';
import Confirm from '../../utilits/Confirm' 

function StyledComponent(props) {

    const [isDisableBtn, setIsDisableBtn] = useState(true)
    const [open, setOpen] = useState(false)
    const [isVisibleConfirm, setIsVisibleConfirm] = useState(false) 

    const [heading, setHeading] = useState(props.data.heading) 
    const [headingSize, setHeadingSize] = useState(props.data.headingSize) 
 
    const [isButton, setIsButton] = useState(props.data.isButton || false)
    const [textButton,  setTextButton] = useState(props.data.textButton || '')
    const [targetButton, setTargetButton] = useState(props.data.targetButton || '')

    const [colorSelect,  setColorSelect] = useState(props.data.colorMain || '')
    const [colorCustom, setColorCustom] = useState(props.data.colorMain || '')
    const [marginTop, setMarginTop] = useState(props.data.marginTop || 51)
    const [marginBottom, setMarginBottom] = useState(props.data.marginBottom || 51)
    const [maxWidthContainer, setMaxWidthContainer] = useState(props.data.maxWidthContainer || 'lg') 

    const mobileMarginTopComputed = marginTop === 0 ? 0 : (marginTop > 50 ? marginTop*0.6 : 30)
    const mobileMarginBottomComputed = marginBottom === 0 ? 0 : (marginBottom > 50 ? marginBottom*0.6 : 30)

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        if(!isDisableBtn) handleSave()
        setOpen(false);
    };
    const handleChange = () => {
        setIsButton(!isButton)
        setIsDisableBtn(false)
    }
    
    const colorTheme = isNoThemeColor(props.data.colorMain)

    useEffect(() => {
        if(colorTheme) {  
            setColorSelect('custom')
        }
        // eslint-disable-next-line
    }, [props.data.colorMain]) 

    const useStyles = makeStyles((theme) => {
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle, btnSetting, btnDrawerStyle, dialogContentUnstyle,
            btnDrawerItem, containerWrapper , responseValues ,responseMobile , mobileTooltip } = commonClasses 
        const { mtView, mbView } = commonStyle 
        
        return ({
            dialogContentUnstyle: dialogContentUnstyle,
            btnDrawerStyle: btnDrawerStyle,
            btnDrawerItem: btnDrawerItem,
            containerWrapper: {
                ...containerWrapper, ...{
               '&:hover' : {
                    zIndex: 25,
                    outlineColor: `${theme.palette.error.main}`,
                    '& $mtView' : { 
                        opacity: 1
                    },
                    '& $mbView' : { 
                        opacity: 1
                    },
                    '& $btnDrawerStyle' : { 
                        opacity: 1
                    }
               }}    
           },
            menu: {...menu, ...{
                left: 'calc( 50% - 350px )',
                maxWidth: 700,
                width: '100%',
            }}, 
            menuTitle: {...menuTitle, ...{ 
                borderColor: isDisableBtn ? '#0000' : theme.palette.secondary.main
            }},
            btnSetting: btnSetting,  
            // btnSave: btnSave,
            responseValues: responseValues,  
            responseMobile: responseMobile,
            mobileTooltip: mobileTooltip,
            mtView: { ...mtView, ...{
                    top: `-${marginTop}px`,  
                    height: `${marginTop}px`,
                    [theme.breakpoints.down('sm')]: {
                        top: `-${mobileMarginTopComputed}px`,  
                        height: `${mobileMarginTopComputed}px`,
                    }
                } 
            },
            mbView: { ...mbView, ...{
                    bottom: `-${marginBottom}px`,
                    height: `${marginBottom}px`, 
                    [theme.breakpoints.down('sm')]: {
                        bottom: `-${mobileMarginBottomComputed}px`,
                        height: `${mobileMarginBottomComputed}px`,
                    }
                } 
            }, 
                  
        })
    })
    
    const classes = useStyles();

  
    const handleSave = () => {
        const newData = Object.assign({}, props.data)
        newData.heading = heading  
        newData.headingSize = Number(headingSize)  
        newData.isButton = isButton
        newData.textButton = textButton
        newData.targetButton = targetButton
        newData.marginTop = marginTop
        newData.marginBottom = marginBottom
        newData.maxWidthContainer = maxWidthContainer

        if (colorSelect === 'custom') {
            newData.colorMain = colorCustom
        } else {
            newData.colorMain = colorSelect
        }

        props.reSaveItem(props.data.id, newData)
        // handleClose()
        setIsDisableBtn(true)
    }
     
    const removeItem = () => {  
        setIsVisibleConfirm(true) 
    };
    
    const handleConfirmClick = () => {
        props.removeContainer(props.data.id)
    } 
    

    return (
        <div className={classes.containerWrapper}>
            <Confirm
                show={isVisibleConfirm}
                setShow={setIsVisibleConfirm} 
                title={'Remove action line?'}
                text={"You can't cancel this action."}
                removeText={"remove"}
                handleRemoveClick={handleConfirmClick}
            />
            <Tooltip  title={`Action Line margin top`}  placement={'top'}>
                <div className={classes.mtView}></div>
            </Tooltip>
            <Tooltip  title={`Action Line margin bottom`}  placement={'top'}>
                <div className={classes.mbView}></div>
            </Tooltip>

            <Box style={{
                position: 'relative'
            }}>
                <Box className={classes.btnDrawerStyle}>
                    <Box display="flex" flexDirection="column">
                        <Box mb={1}>
                            <Tooltip title='Action Line Settings' placement='right'>
                                <Button
                                    onClick={handleOpen}
                                    size='medium'
                                    variant='contained'
                                    className={classes.btnDrawerItem}>
                                    <SettingsIcon
                                        style={{
                                        color: '#fff'
                                    }}
                                        fontSize='small'/>
                                </Button>
                            </Tooltip>
                        </Box>

                        <ButtonGroup
                            orientation="vertical"
                            color="secondary"
                            aria-label="vertical contained primary button group"
                            variant="contained"
                        >   
                            { 
                                !props.isFirst  && 
                                <Tooltip title='Get Up' placement='right'>
                                    <Button
                                        onClick={() => {
                                        props.swapContainer('up', props.data.id)
                                    }}
                                        size='medium'
                                        variant='contained'
                                        className={classes.btnDrawerItem}>
                                        <ExpandLessOutlinedIcon
                                            style={{
                                            color: '#fff'
                                        }}
                                            fontSize='small'/>
                                    </Button>
                                </Tooltip>
                            }
                            {
                                !props.isLast && 
                                <Tooltip title='Get Down' placement='right'>
                                    <Button
                                        onClick={() => {
                                        props.swapContainer('down', props.data.id)
                                    }}
                                        size='medium'
                                        variant='contained'
                                        className={classes.btnDrawerItem}>
                                        <ExpandMoreOutlinedIcon
                                            style={{
                                            color: '#fff'
                                        }}
                                            fontSize='small'/>
                                    </Button>
                                </Tooltip>
                            }
                            
                        </ButtonGroup>

                        <Box mt={1}>
                            <Tooltip title='Remove' placement='right'>
                                <Button
                                    onClick={removeItem}
                                    size='medium'
                                    variant='contained'
                                    className={classes.btnDrawerItem}>
                                    <DeleteOutline
                                        style={{
                                        color: '#fff'
                                    }}
                                        fontSize='small'/>
                                </Button>
                            </Tooltip>
                        </Box>

                    </Box>
                    <Modal
                        open={open}
                        aria-labelledby="draggable-dialog-title"
                        onClose={handleClose}>
                        <DialogContent classes={{root: classes.dialogContentUnstyle}}>
                            <Draggable
                                handle="#draggable-dialog-title"
                                cancel={'[class*="MuiDialogContent-root"]'}>
                                <div className={classes.menu}>
                                    <Typography
                                        component='p'
                                        className={classes.menuTitle}
                                        id="draggable-dialog-title"
                                    >
                                        { !isDisableBtn && "Close to save - " } Settings Action Line 
                                        <OpenWithIcon/>
                                    </Typography>
                                    <Box>
                                        <Typography variant='h6' gutterBottom>
                                            Styles
                                        </Typography>
                                        <Box mr={1} mb={2} display='inline-block' >
                                            <InputChange
                                                id={null}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label='Margin Top'
                                                variant='outlined'
                                                value={marginTop}
                                                setValue={setMarginTop}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            />   
                                        </Box>
                                        <Box mr={1} mb={2} display='inline-block' >
                                            <InputChange
                                                id={null}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label='Margin Bottom'
                                                variant='outlined'
                                                value={marginBottom}
                                                setValue={setMarginBottom}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            />  
                                        </Box>
                                        <Box mr={1} display='inline-block' >
                                            <InputChange
                                                id={null}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label="Heading Size"
                                                variant='outlined'
                                                value={headingSize}
                                                setValue={setHeadingSize}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            />   
                                        </Box>
                                        <FormControl 
                                            variant='filled' 
                                            size='small'    
                                        >
                                            <InputLabel id="maxWidth-style-label">Max-Width for Container</InputLabel>
                                            <Select
                                                labelId="maxWidth-label"
                                                id="maxWidth-style"
                                                value={maxWidthContainer}
                                                style={{minWidth: 180}}
                                                onChange={(e) => {setIsDisableBtn(false); setMaxWidthContainer(e.target.value) }}
                                            >
                                                <MenuItem value={false}>False</MenuItem>
                                                <MenuItem value={'xl'}>xl - 1920 </MenuItem> 
                                                <MenuItem value={'lg'}>lg - 1280 </MenuItem> 
                                                <MenuItem value={'md'}>md - 960 </MenuItem> 
                                                <MenuItem value={'sm'}>sm - 600 </MenuItem> 
                                                <MenuItem value={'xs'}>xs - 0 </MenuItem> 
                                            </Select>
                                        </FormControl>
                                        <Tooltip classes={{tooltip: classes.mobileTooltip}} title='Calculated styles for Mobile (<600px)' placement={'top'}>
                                            <Box className={`${classes.responseValues} ${classes.responseMobile}`}>
                                                <PhoneIphoneIcon/>
                                                <Box>  
                                                    <p> 
                                                        MarginTop: <b>{mobileMarginTopComputed}</b>; 
                                                        MarginBottom: <b>{ mobileMarginBottomComputed}</b> ; 
                                                        FontSize Heading: <b>{ headingSize*0.65 }</b> 
                                                    </p>        
                                                </Box>
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                    <Box mt={2}>
                                        <Typography variant='h6' gutterBottom>
                                            Texts
                                        </Typography>
                                        
                                        <InputChange
                                            id={null}
                                            fullWidth={true}
                                            type='text'
                                            size="medium" 
                                            label='Heading'
                                            variant='outlined'
                                            value={heading}
                                            setValue={setHeading}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        />  
 
                                    </Box>
                                   
                                    <Box mt={2} display="flex" >
                                            <ColorSelecter
                                                label={'Color for Block'}
                                                colorSelect={colorSelect} 
                                                setColorSelect={setColorSelect}
                                                colorCustom={colorCustom}
                                                setColorCustom={setColorCustom}
                                                setIsDisableBtn={setIsDisableBtn} 
                                                position = {'top'}
                                                noInherit={true}
                                            />
                                    </Box>
  
                                    <Box display='flex' mt={3} mb={3}>
                                        <FormControlLabel
                                            control={
                                                < Switch checked = { isButton }
                                                        onChange = { handleChange }
                                                            name = "checkedB" 
                                                            color = "primary" />
                                            }
                                            label="Add Modal Button"/> 
                                            {
                                                isButton && 
                                                <Box display='flex' flexDirection='column' ml={2}>
                                                    <Box mb={1}>
                                                        <Box display='flex'>
                                                            <Box mr={1}>
                                                                <InputChange
                                                                    id={null} 
                                                                    type='text'
                                                                    size="small" 
                                                                    label="Text for Button"
                                                                    variant='outlined'
                                                                    value={textButton}
                                                                    setValue={setTextButton}
                                                                    setIsDisableBtn={setIsDisableBtn} 
                                                                />    
                                                            </Box>
                                                            <InputChange
                                                                id={null} 
                                                                type='text'
                                                                size="small" 
                                                                label="Target for Button"
                                                                variant='outlined'
                                                                value={targetButton}
                                                                setValue={setTargetButton}
                                                                setIsDisableBtn={setIsDisableBtn} 
                                                            />   
                                                        </Box>
                                                    </Box>
                                                    
                                                </Box>
                                            }
                                    </Box> 


                                    <Box mt={5} /> 

                                    {/* <Box className={classes.btnSave}>
                                        <Button
                                            disabled={isDisableBtn}
                                            variant="contained"
                                            color="primary"
                                            size={'medium'}
                                            onClick={handleSave}>
                                            Save
                                        </Button>
                                    </Box> */}
                                </div>
                            </Draggable>
                        </DialogContent>
                    </Modal>
                </Box>
            </Box>
            <DumbComponent data={props.data}/>
        </div>
    )
}

export default StyledComponent
