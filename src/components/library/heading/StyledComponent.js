import React, { useEffect, useState } from 'react'  
 
import StylesChangers from '../../../styles/changers'   
import StyledInputs from '../../../styles/inputs'   

import Draggable from 'react-draggable'; 

import { makeStyles } from '@material-ui/core/styles';

import { 
    FormControlLabel, 
    Switch,
    Grid,  
    Button, 
    FormControl,
    InputLabel,
    Select, 
    MenuItem,  
    IconButton, 
    Typography,
    Modal,
    Box,
    Tooltip,
    DialogContent,
    ButtonGroup,
    FormGroup,  

} from '@material-ui/core'

import DumbComponent from "./DumbComponent" 

import InputChange from '../../functions/InputChange';
 
import ColorSelecter from '../../functions/colorChanger/ColorSelecter'
import {isNoThemeColor} from '../../functions/colorChanger/ColorCalculation'

import OpenWithIcon from '@material-ui/icons/OpenWith';
import { DeleteOutline, InfoOutlined } from '@material-ui/icons';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import TabletMacIcon from '@material-ui/icons/TabletMac';

import Confirm from '../../utilits/Confirm' 
import TableFontSizeInfo from '../../utilits/TableFontSizeInfo'
import SelectHeadingVariant from '../../functions/SelectHeadingVariant';

const StyledComponent = (props) => {  

    console.log('styled heading work')

    const [isVisibleConfirm, setIsVisibleConfirm] = useState(false) 

    const [padding, setPadding] = useState({ 
        top:  props.data.classes.paddingTop , 
        left:  props.data.classes.paddingLeft ,
        bottom: props.data.classes.paddingBottom , 
        right: props.data.classes.paddingRight 
    })
    const [margin, setMargin] = useState({
        top:  props.data.classes.marginTop , 
        left:  props.data.classes.marginLeft ,
        bottom: props.data.classes.marginBottom , 
        right: props.data.classes.marginRight 
    }) 

    const [borderColorSelect, setBorderColorSelect] = useState(props.data.classes.borderColor ||  'transperent')
    const [borderColorCustom, setBorderColorCustom] = useState(props.data.classes.borderColor ||  'transperent')
    const [borderStyle, setBorderStyle] = useState(props.data.classes.borderStyle ||  'solid')
    const [borderWidth, setBorderWidth] = useState(props.data.classes.borderWidth ||  0 )
    const [borderRadius, setBorderRadius] = useState(props.data.classes.borderRadius || 0)
    
    const [backgroundSelect,  setBackgroundSelect] = useState(props.data.classes.backgroundColor || 'transperent')
    const [backgroundCustom, setBackgroundCustom] = useState(props.data.classes.backgroundColor || 'transperent')
    const [colorSelect,  setColorSelect] = useState(props.data.classes.color || 'inherit')
    const [colorCustom, setColorCustom] = useState(props.data.classes.color || 'inherit')
 
    const [textAlign, setTextAlign] = useState(props.data.classes.textAlign ||  'left')

    const [defaultSize, setDefaultSize] = useState(props.data.defaultSize || false)
    const [variant, setVariant] = useState(props.data.variant ||  'h3')
    const [display, setDisplay] = useState(props.data.classes.display ||  'block')
    const [fontSize, setFontSize] = useState(props.data.classes.fontSize ||  16)
    const [fontWeight, setFontWeight] = useState(props.data.classes.fontWeight ||  400)
    const [lineHeight, setLineHeight] = useState(props.data.classes.lineHeight ||  1.38)

    const [isResponsiveFont, setIsResponsiveFont] = useState(props.data.responseFont || false)

    const [textInDumb, setTextInDumb] = useState(props.data.text)
    const [isDisableBtn, setIsDisableBtn] = useState(true) 
 
    const [open, setOpen] = useState(false);

    const bgTheme = isNoThemeColor(props.data.classes.backgroundColor)
    const colorTheme = isNoThemeColor(props.data.classes.color)
    const borderTheme = isNoThemeColor(props.data.classes.borderColor)

    useEffect(() => {
        if(bgTheme) {  
            setBackgroundSelect('custom')
        }  
        if(colorTheme) {  
            setColorSelect('custom')
        }  
        if(borderTheme) {  
            setBorderColorSelect('custom')
        }  
        // eslint-disable-next-line
    }, [props.data.classes.backgroundColor, props.data.classes.color, props.data.classes.borderColor]) 
          
    const useStyles = makeStyles((theme) => {
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle, responseValues, responseTablets, responseMobile, mobileTooltip, tabletTooltip, dialogContentUnstyle } = commonClasses 
        const { mtView, mbView, ptView, pbView, inputNumber, inputGroup, dumbItemContainer, dumbItem, dumbItemDelete } = commonStyle 
        return ({
            dialogContentUnstyle: dialogContentUnstyle, 
            inputNumber: inputNumber, 
            inputGroup: inputGroup, 
            // btnSave: btnSave,
            dumbItemContainer: {  ...dumbItemContainer, ...{
                '&:hover' : {    
                    boxShadow: theme.shadows[10], 
                    cursor: 'pointer',
                    outlineColor: `${theme.palette.error.light}`,  
                    '& $dumbItemDelete' : { 
                        opacity: 1
                    }  ,
                    '& $mtView' : { 
                        opacity: 1
                    },
                    '& $mbView' : { 
                        opacity: 1
                    }, 
                    '& $ptView' : { 
                        opacity: 1
                    },
                    '& $pbView' : { 
                        opacity: 1
                    },  
                }
            }},
            mtView: { ...mtView, ...{
                    top: `-${margin.top}px`, 
                    height: `${margin.top}px`, 
                    [theme.breakpoints.down('md')]: {
                        top: `-${margin.top * 0.8}px`,  
                        height: `${margin.top * 0.8}px`,
                    },
                    [theme.breakpoints.down('sm')]: {
                        top: `-${margin.top * 0.5}px`,  
                        height: `${margin.top * 0.5}px`,
                    }
                } 
            }, 
            mbView: { ...mbView, ...{
                    bottom: `-${margin.bottom}px`, 
                    height: `${margin.bottom}px`, 
                    [theme.breakpoints.down('md')]: {
                        bottom: `-${margin.bottom * 0.8}px`,
                        height: `${margin.bottom * 0.8 }px`,
                    },
                    [theme.breakpoints.down('sm')]: {
                        bottom: `-${margin.bottom * 0.5}px`,
                        height: `${margin.bottom * 0.5 }px`,
                    }
                } 
            }, 
            ptView: { ...ptView, ...{
                height: `${padding.top}px`,  
                } 
            }, 
            pbView: { ...pbView, ...{
                height: `${padding.bottom}px`,  
                } 
            },  
            dumbItem: dumbItem, 
            dumbItemDelete : dumbItemDelete,  
            menu: {...menu, ...{
                left: "calc(50% - 250px)",
                width: 500, 
            } },    
            menuTitle: {...menuTitle, ...{ 
                borderColor: isDisableBtn ? '#0000' : theme.palette.secondary.main
            }},

            responseValues: responseValues, 
            responseTablets: responseTablets,
            responseMobile: responseMobile,
            mobileTooltip: mobileTooltip,
            tabletTooltip: tabletTooltip, 
            tooltipResponse: {
                fontSize: 14, 
                backgroundColor: theme.palette.success.main
            }, 
            tooltipDefault: {
                fontSize: 14, 
                backgroundColor: theme.palette.info.main
            }, 
            
            defaultSizeCheck: {
                color: theme.palette.info.main, 
            },
            defaultSizeTrack: {
                background: theme.palette.info.light, 
            },
            responseCheck: { 
                color: theme.palette.success.main
            }, 
            responseTrack: {
                background: theme.palette.success.light, 
            }
          })
    });
    
    const myClassName = {  
        display: display,
        paddingTop: padding.top,
        paddingBottom: padding.bottom,
        paddingLeft: padding.left,
        paddingRight: padding.right,
        marginTop: margin.top,
        marginBottom: margin.bottom,
        marginLeft: margin.left,
        marginRight: margin.right,  
        textAlign: textAlign,
        fontSize: fontSize,
        fontWeight: fontWeight, 
        lineHeight: lineHeight,
        borderStyle: borderStyle,
        borderRadius: borderRadius,
        borderWidth: borderWidth
    } 
    const classes = useStyles();
 
    const handlePadding = (value, direction) => {  
        let newPadding = Object.assign({}, padding)
        newPadding[direction] = Number(value)
        setPadding(newPadding)  
 
    }
    const handleMargin= (value, direction) => {  
        let newMargin = Object.assign({}, margin)
        newMargin[direction] = Number(value)
        setMargin(newMargin)  
 
    }

    const handleSave = () => {   
        const sentData = Object.assign({}, props.data)

        sentData.classes = myClassName

        if (backgroundSelect === 'custom') { sentData.classes.backgroundColor = backgroundCustom }
        else { sentData.classes.backgroundColor = backgroundSelect }
        
        if (colorSelect === 'custom') { sentData.classes.color = colorCustom } 
        else { sentData.classes.color = colorSelect }
        
        if (borderColorSelect === 'custom') { sentData.classes.borderColor = borderColorCustom } 
        else { sentData.classes.borderColor = borderColorSelect }
 

        sentData.text = textInDumb
        sentData.responseFont = isResponsiveFont
        sentData.variant = variant
        sentData.defaultSize = defaultSize

        props.reSaveChildren(props.data.id, sentData)
        setIsDisableBtn(true);  
    }
    
    const swapHeading = (direction, id) => {
        props.swapChildrens(direction, id)
    }
    
    const handleInputFocus = (event) => {  
        setOpen(true);
    }
    const handleClose = () => {
        if(!isDisableBtn) handleSave()
        setOpen(false);
    };
    
    const viewCorrect = props.data.classes.display !== 'block' ? `(uncorrect view for ${props.data.classes.display} display)` : ''

    const removeItem = () => {  
        setIsVisibleConfirm(true) 
    };
    
    const handleConfirmClick = () => {
        props.removeItem(props.data.id)
    }

    return ( 
            <Grid container style={{position: 'relative'}}> 
                <Confirm
                    isVariable={false}
                    show={isVisibleConfirm}
                    setShow={setIsVisibleConfirm} 
                    title={'Remove heading?'}
                    text={"You can't cancel this action."}
                    removeText={"remove"}
                    handleRemoveClick={handleConfirmClick}
                />
                <Modal 
                    open={open} 
                    // PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    onClose={handleClose} 
                >
                    <DialogContent classes={{root: classes.dialogContentUnstyle}}>
                        <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                            <div className={classes.menu}  >
                                <Typography 
                                    component='p' 
                                    className={classes.menuTitle}
                                    id="draggable-dialog-title"
                                >
                                    { !isDisableBtn && "Close to save - " } Heading - {props.data.variant} Settings <OpenWithIcon/>
                                </Typography>

                                {/* text input */}
                                <Box mb={2} >
                                    <InputChange
                                        id={null}
                                        fullWidth={true}
                                        multiline={true}
                                        type='text'
                                        size="medium" 
                                        label="Text input"
                                        variant='standard'
                                        value={textInDumb}
                                        setValue={setTextInDumb}
                                        setIsDisableBtn={setIsDisableBtn} 
                                    />      
                                </Box>  

                                {/* Responsive font */}
                                <Box mb={2}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={isResponsiveFont}
                                                    onChange={() => {  setIsDisableBtn(false); setIsResponsiveFont(!isResponsiveFont) }}
                                                    name="checkedB"
                                                    color="default"
                                                    classes={{checked: classes.responseCheck, track: classes.responseTrack }}
                                                />
                                            }
                                            label="Set Responsive Font Size"
                                        />
                                        <Tooltip classes={{tooltip: classes.tooltipResponse}}  title="If enabled, the type will be smaller on mobile devices and the alignment will be centered"  >
                                            <IconButton>
                                                <InfoOutlined/>
                                            </IconButton>
                                        </Tooltip>
                                </Box>
                                <Box mb={2}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={defaultSize}
                                                    onChange={() => {  setIsDisableBtn(false); setDefaultSize(!defaultSize) }}
                                                    name="checkedD"
                                                    color="default"
                                                    classes={{checked: classes.defaultSizeCheck, track: classes.defaultSizeTrack }}
                                                />
                                            }
                                            label="Set Default Font Size"
                                        />
                                        <Tooltip classes={{tooltip: classes.tooltipDefault}}  title="If enabled, font size will be default"  >
                                            <IconButton>
                                                <InfoOutlined/>
                                            </IconButton>
                                        </Tooltip>
                                </Box>
                                {
                                    defaultSize && 
                                    <TableFontSizeInfo activeRow={variant} />
                                }
                                <Tooltip classes={{tooltip: classes.tabletTooltip}} title='Calculated styles for Tablets (<960px)' placement={'top'}>
                                    <Box className={`${classes.responseValues} ${classes.responseTablets}`}>
                                        <TabletMacIcon/>
                                        <Box> 
                                            {
                                                isResponsiveFont ?
                                                <React.Fragment> 
                                                    <p>MarginTop: <b>{margin.top * 0.8 }</b>; &nbsp; MarginBottom: <b>{margin.bottom * 0.8 }</b> </p>   
                                                    <p>FontSize:  { defaultSize ? 'Look default table ' : <b>{ fontSize > 40 ? fontSize*0.8 : 20 }</b> } </p>   
                                                    <p>TextAlign:  <b>center</b></p>
                                                </React.Fragment>
                                                :
                                                <Typography variant='caption'>
                                                    Turn on the "button" at the top for auto-calculated responsive values
                                                </Typography>
                                            }
                                        </Box>
                                    </Box>
                                </Tooltip>
                                
                                <Tooltip classes={{tooltip: classes.mobileTooltip}} title='Calculated styles for Mobile (<600px)' placement={'top'}>
                                    <Box className={`${classes.responseValues} ${classes.responseMobile}`}>
                                        <PhoneIphoneIcon/>
                                        <Box> 
                                            {
                                                isResponsiveFont ?
                                                <React.Fragment> 
                                                    <p>MarginTop: <b>{margin.top * 0.5 }</b>; &nbsp; MarginBottom: <b>{margin.bottom * 0.5 }</b> </p>  
                                                    <p>  FontSize: { defaultSize ? 'Look default table ' : <b>{ fontSize > 40 ? fontSize*0.6 : 20 }</b> }  </p>   
                                                    <p>TextAlign:  <b>center</b> ; &nbsp; LineHeight: <b>{1.2} </b>  </p>
  
                                                </React.Fragment>
                                                :
                                                <Typography variant='caption'>
                                                    Turn on the "button" at the top for auto-calculated responsive values
                                                </Typography>
                                            }
                                        </Box>
                                    </Box>
                                </Tooltip>
                                <Box className={classes.inputGroup}>
                                    <FormGroup row>
                                        <FormControl 
                                            variant='filled' 
                                            size='small'   
                                            className={classes.inputNumber}
                                            fullWidth
                                        >
                                            <InputLabel id="display-style-label">Display</InputLabel>
                                            <Select
                                                labelId="display-style-label"
                                                id="display-style"
                                                value={display}
                                                onChange={(e) => {setIsDisableBtn(false); setDisplay(e.target.value) }}
                                            >
                                            <MenuItem value={'block'}>Block</MenuItem> 
                                            <MenuItem value={'inline-block'}>Inline-block</MenuItem> 
                                            <MenuItem value={'flex'}>Flex</MenuItem> 
                                            <MenuItem value={'inline-flex'}>Inline-flex</MenuItem> 
                                            </Select>
                                        </FormControl>
                                        <SelectHeadingVariant
                                            variant={'filled'} 
                                            size="small"  
                                            fullWidth={true}
                                            className={classes.inputNumber} 
                                            label="Variant" 
                                            value={variant} 
                                            setValue={setVariant} 
                                            setIsDisableBtn={setIsDisableBtn}
                                        />
                                    </FormGroup>
                                </Box>  

                                {/* margin */}
                                <Box className={classes.inputGroup}>
                                    <Box display="flex" flexDirection="row"  > 
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'top'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label='Margin Top'
                                                variant='filled'
                                                value={margin.top}
                                                setValue={handleMargin}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box>
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'bottom'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label='Margin Bottom'
                                                variant='filled'
                                                value={margin.bottom}
                                                setValue={handleMargin}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box> 
                                    </Box>
                                    <Box display="flex" flexDirection="row" > 
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'left'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label='Margin Left'
                                                variant='filled'
                                                value={margin.left}
                                                setValue={handleMargin}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box>
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'right'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label='Margin Right'
                                                variant='filled'
                                                value={margin.right}
                                                setValue={handleMargin}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box>
                                         
                                    </Box>
                                </Box>
                                
                                {/* padding */}
                                <Box className={classes.inputGroup}>
                                    <Box display="flex" flexDirection="row" > 
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'top'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label="Padding Top" 
                                                variant='filled'
                                                value={padding.top}
                                                setValue={handlePadding}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box> 
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'bottom'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label="Padding Bottom" 
                                                variant='filled'
                                                value={padding.bottom}
                                                setValue={handlePadding}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box>  
                                    </Box>
                                    <Box display="flex" flexDirection="row" >
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'left'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label="Padding Left" 
                                                variant='filled'
                                                value={padding.left}
                                                setValue={handlePadding}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box>   
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'right'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label="Padding Right" 
                                                variant='filled'
                                                value={padding.right}
                                                setValue={handlePadding}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box>  
                                    </Box>
                
                                </Box>
                                
                                {/* bg-color */}
                                <Box className={classes.inputGroup} display="flex" flexDirection="row" > 
                                    <Box className={classes.inputNumber} >   
                                        <ColorSelecter
                                            label={'Background'}
                                            colorSelect={backgroundSelect} 
                                            setColorSelect={setBackgroundSelect}
                                            colorCustom={backgroundCustom}
                                            setColorCustom={setBackgroundCustom}
                                            setIsDisableBtn={setIsDisableBtn} 
                                            position = {'right'}
                                            noInherit={false}
                                        />  
                                    </Box> 
                                     
                                </Box>
                                <Box className={classes.inputGroup} display="flex" flexDirection="row" > 
                                    <Box className={classes.inputNumber} >   
                                        <ColorSelecter
                                            label={'Color'}
                                            colorSelect={colorSelect} 
                                            setColorSelect={setColorSelect}
                                            colorCustom={colorCustom}
                                            setColorCustom={setColorCustom}
                                            setIsDisableBtn={setIsDisableBtn} 
                                            position = {'right'}
                                            noInherit={false}
                                            isContrastSelect={true} 
                                        /> 
                                        {
                                            backgroundCustom === 'inherit' &&
                                            colorSelect === 'contrast' && 
                                            <Typography variant='caption' color='secondary' >Contast color don`t work with "inherit" background </Typography>
                                        } 
                                    </Box> 
                                     
                                </Box>
                                
                                {/* font */}
                                <Box className={classes.inputGroup}> 
                                    <Box display="flex" flexDirection="row" >  
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'right'}
                                                fullWidth={false}
                                                disabled={defaultSize}
                                                type='number'
                                                size="small" 
                                                label="Font Size" 
                                                variant='filled'
                                                value={fontSize}
                                                setValue={setFontSize}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box> 
                                         
                                        <FormControl 
                                            variant='filled' 
                                            size='small'   
                                            className={classes.inputNumber}
                                        >
                                            <InputLabel id="weight-select-label">Font Weight</InputLabel>
                                            <Select
                                                labelId="weight-select-label"
                                                id="weight-select"
                                                value={fontWeight}
                                                onChange={(e) => {setIsDisableBtn(false); setFontWeight(Number(e.target.value)) }}
                                            >
                                            <MenuItem value={300}>Light</MenuItem>
                                            <MenuItem value={400}>Regular</MenuItem>
                                            <MenuItem value={700}>Bold</MenuItem>
                                            </Select>
                                        </FormControl>
                                    
                                        
                                    </Box>
                                    <Box display="flex" flexDirection="row" >
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'right'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label="Line Height (em)" 
                                                variant='filled'
                                                value={lineHeight}
                                                setValue={setLineHeight}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box> 
                                     
                                        <FormControl 
                                            variant='filled' 
                                            size='small'   
                                            className={classes.inputNumber}
                                        >
                                            <InputLabel id="align-select-label">Text Align</InputLabel>
                                            <Select
                                                labelId="align-select-label"
                                                id="align-select"
                                                value={textAlign}
                                                onChange={(e) => {setIsDisableBtn(false); setTextAlign((e.target.value)) }}
                                            >
                                            <MenuItem value={'left'}>Left</MenuItem>
                                            <MenuItem value={'center'}>Center</MenuItem>
                                            <MenuItem value={'right'}>Right</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box display="flex" flexDirection="row" >
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'right'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label="Border Radius" 
                                                variant='filled'
                                                value={borderRadius}
                                                setValue={setBorderRadius}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box> 
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'right'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label="Border Width" 
                                                variant='filled'
                                                value={borderWidth}
                                                setValue={setBorderWidth}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box>   
                                    </Box>
                                    <Box display="flex" flexDirection="row" >
                                        <FormControl 
                                            variant='filled' 
                                            size='small'   
                                            className={classes.inputNumber}
                                        >
                                            <InputLabel id="border-style-label">Border Style</InputLabel>
                                            <Select
                                                labelId="border-style-label"
                                                id="border-style"
                                                value={borderStyle}
                                                onChange={(e) => {setIsDisableBtn(false); setBorderStyle(e.target.value) }}
                                            >
                                            <MenuItem value={'solid'}>Solid</MenuItem>
                                            <MenuItem value={'dotted'}>Dotted</MenuItem>
                                            <MenuItem value={'dashed'}>Dashed</MenuItem>
                                            <MenuItem value={'double'}>Double</MenuItem>
                                            <MenuItem value={'groove'}>Groove</MenuItem>
                                            <MenuItem value={'inset'}>Inset</MenuItem>
                                            <MenuItem value={'outset'}>Outset</MenuItem>
                                            <MenuItem value={'ridge'}>Ridge</MenuItem>
                                            <MenuItem value={'none'}>None</MenuItem>
                                            </Select>
                                        </FormControl>  
                                    </Box>
                                    <Box display="flex" flexDirection="row" >
                                        <Box className={classes.inputNumber} >   
                                            <ColorSelecter
                                                label={'Border Color'}
                                                colorSelect={borderColorSelect} 
                                                setColorSelect={setBorderColorSelect}
                                                colorCustom={borderColorCustom}
                                                setColorCustom={setBorderColorCustom}
                                                setIsDisableBtn={setIsDisableBtn} 
                                                position = {'right'}
                                                noInherit={false}
                                            />  
                                        </Box> 
                                    </Box>
                                </Box>
                                
                                <Box mt={5} />
                                {/* <Box className={classes.btnSave}>
                                    <Button 
                                        disabled={isDisableBtn} 
                                        variant="contained"
                                        color="primary"
                                        size={'medium'} 
                                        onClick={saveData}
                                    >
                                        Save
                                    </Button> 
                                </Box> */}
                            
                            </div>
                        </Draggable>
                    </DialogContent>
                    
                </Modal>
                
                <Grid item xs={12}  className={classes.dumbItemContainer }>  
                       
                        <div 
                            className={classes.dumbItem }
                            onClick={handleInputFocus}
                            aria-controls="simple-menu" aria-haspopup="true"  
                        >
                            <Tooltip  title={` ${props.data.variant} margin top ${viewCorrect}`}  placement={'top'}>
                                <div className={classes.mtView}></div>
                            </Tooltip>
                            <Tooltip  title={` ${props.data.variant} margin bottom ${viewCorrect}`}  placement={'top'}>
                                <div className={classes.mbView}></div>
                            </Tooltip> 
                            <Tooltip  title={` ${props.data.variant} padding top ${viewCorrect}`}  placement={'top'}>
                                <div className={classes.ptView}></div>
                            </Tooltip> 
                            <Tooltip  title={` ${props.data.variant} padding bottom ${viewCorrect}`}  placement={'top'}>
                                <div className={classes.pbView}></div>
                            </Tooltip>  
                            <DumbComponent 
                                data={props.data} 
                                className={props.data.classes}
                                isResponsiveFont={props.data.responseFont}
                                prop={props.data.prop} 
                                textChildren={props.data.text}
                            />
                           
                        </div>  
                        <Box className={ classes.dumbItemDelete} >
                            <ButtonGroup
                                orientation="horizontal"
                                color="primary"
                                aria-label="horizontal contained primary button group"
                                variant="contained" 

                            >  
                                { 
                                    !props.isFirst  && 
                                    <Tooltip title='Get Up' placement='top'>
                                        <Button   
                                            onClick={() => { swapHeading('up', props.data.id) }}
                                            size='small'
                                            variant='contained'
                                            color='primary'  
                                        >  
                                            <ExpandLessOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>   
                                        </Button>
                                    </Tooltip> 
                                }
                                {
                                    !props.isLast &&
                                    <Tooltip title='Get Down' placement='top'>
                                        <Button   
                                            onClick={() => { swapHeading('down', props.data.id) }} 
                                            size='small'
                                            variant='contained'
                                            color='primary' 
                                            // disabled={categories.indexOf(item) === categories.length - 1 ? true : false }
                                        >     
                                            <ExpandMoreOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>
                                        </Button>
                                    </Tooltip>  
                                }
 

                                <Tooltip  title="Delete Heading"  placement={'top'}> 
                                    <Button 
                                        size="small"
                                        variant='contained'
                                        color='secondary'
                                        aria-label="delete"
                                        onClick={removeItem}
                                    >
                                        <DeleteOutline style={{ color: '#fff'}}/>
                                    </Button> 
                                </Tooltip>
                                    
                            </ButtonGroup>
                            
                        </Box>
                        
                        
                        
 
                </Grid>
            </Grid>
           
 
    )
}

export default StyledComponent
