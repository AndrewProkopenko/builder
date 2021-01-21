import React from 'react'  
 
import StylesChangers from '../../../styles/changers'   
import StyledInputs from '../../../styles/inputs'   

import Draggable from 'react-draggable'; 

import { makeStyles } from '@material-ui/core/styles';

import { 
    FormControlLabel, 
    Switch,
    Grid, 
    TextField, 
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
    DialogContent

} from '@material-ui/core'

import DumbComponent from "./DumbComponent" 

import {ColorPicker} from '../colorPicker/ColorPicker'

import OpenWithIcon from '@material-ui/icons/OpenWith';
import { DeleteOutline, InfoOutlined } from '@material-ui/icons';

import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import TabletMacIcon from '@material-ui/icons/TabletMac';

const StyledComponent = (props) => {  

    console.log('styled heading work')

    const [padding, setPadding] = React.useState({ 
        top:  props.data.classes.paddingTop , 
        left:  props.data.classes.paddingLeft ,
        bottom: props.data.classes.paddingBottom , 
        right: props.data.classes.paddingRight 
    })
    const [margin, setMargin] = React.useState({
        top:  props.data.classes.marginTop , 
        left:  props.data.classes.marginLeft ,
        bottom: props.data.classes.marginBottom , 
        right: props.data.classes.marginRight 
    })
    
    const [color, setColor] = React.useState(props.data.classes.color || 'inherit')
    const [backgroundColor, setBackgroundColor] = React.useState(props.data.classes.backgroundColor ||  'transperent')
    const [textAlign, setTextAlign] = React.useState(props.data.classes.textAlign ||  'left')
    const [display, setDisplay] = React.useState(props.data.classes.display ||  'block')
    const [fontSize, setFontSize] = React.useState(props.data.classes.fontSize ||  16)
    const [fontWeight, setFontWeight] = React.useState(props.data.classes.fontWeight ||  400)
    const [lineHeight, setLineHeight] = React.useState(props.data.classes.lineHeight ||  1.38)

    const [isResponsiveFont, setIsResponsiveFont] = React.useState(props.data.responseFont || false)

    const [textInDumb, setTextInDumb] = React.useState(props.data.text)
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 

    
    const [open, setOpen] = React.useState(false);
         

    

    const useStyles = makeStyles((theme) => {
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { btnSave, menu, menuTitle, responseValues, responseTablets, responseMobile, mobileTooltip, tabletTooltip } = commonClasses 
        const { mtView, mbView, ptView, pbView, inputNumber, inputGroup, dumbItemContainer, dumbItem, dumbItemDelete } = commonStyle 
        return ({
            inputNumber: inputNumber, 
            inputGroup: inputGroup, 
            btnSave: btnSave,
            dumbItemContainer: {  ...dumbItemContainer, ...{
                '&:hover' : {    
                    boxShadow: theme.shadows[10], 
                    cursor: 'pointer',
                    outlineColor: `${theme.palette.error.light}`,  
                    '&>button' : { 
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
                } 
            }, 
            mbView: { ...mbView, ...{
                bottom: `-${margin.bottom}px`, 
                height: `${margin.bottom}px`, 
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
                left: "calc(50% - 200px)",
                width: 400, 
            } },    
            menuTitle: menuTitle,  

            responseValues: responseValues, 
            responseTablets: responseTablets,
            responseMobile: responseMobile,
            mobileTooltip: mobileTooltip,
            tabletTooltip: tabletTooltip
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
        color: color,
        backgroundColor: backgroundColor,
        textAlign: textAlign,
        fontSize: fontSize,
        fontWeight: fontWeight, 
        lineHeight: lineHeight
    } 
    const classes = useStyles();

    

    const handlePadding = (e, direction) => {  
        let newPadding = Object.assign({}, padding)
        newPadding[direction] = Number(e.target.value)
        setPadding(newPadding)  

        setIsDisableBtn(false);
    }
    const handleMargin= (e, direction) => {  
        let newMargin = Object.assign({}, margin)
        newMargin[direction] = Number(e.target.value)
        setMargin(newMargin)  

        setIsDisableBtn(false);
    }

    const saveData = () => {   
        const sentData = Object.assign({}, props.data)

        sentData.classes = myClassName
        sentData.text = textInDumb
        sentData.responseFont = isResponsiveFont
        props.reSaveChildren(props.data.id, sentData)
        setIsDisableBtn(true); 
        handleClose()
    }
    const removeItem = () => {  
        let conf = window.confirm("Delete ?");
        if(conf) {  
            props.removeItem(props.data.id)
        }
    };
    
    const handleInputFocus = (event) => {  
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
      };
    

    return ( 
            <Grid container style={{position: 'relative'}}> 
                <Modal 
                    open={open} 
                    // PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    onClose={handleClose} 
                >
                    <DialogContent>
                        <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                            <div className={classes.menu}  >
                                <Typography 
                                    component='p' 
                                    className={classes.menuTitle}
                                    id="draggable-dialog-title"
                                >
                                    Задать заголовку текст и стили <OpenWithIcon/>
                                </Typography>

                                {/* text input */}
                                <Box mb={2} >
                                    <TextField 
                                        type='text' 
                                        label="Text input"
                                        fullWidth
                                        value={textInDumb}
                                        onChange={(e) => { setIsDisableBtn(false); setTextInDumb(e.target.value); e.target.focus() }}
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
                                                    color="primary"
                                                />
                                            }
                                            label="Set Responsive Font Size"
                                        />
                                        <Tooltip title="Если включено, то на мобильных устройствах шрифт будет меньше и выравнивание будет по центру  "  >
                                            <IconButton>
                                                <InfoOutlined/>
                                            </IconButton>
                                        </Tooltip>
                                </Box>
                                <Tooltip classes={{tooltip: classes.tabletTooltip}} title='Calculated styles for Tablets (>960px)' placement={'top'}>
                                    <Box className={`${classes.responseValues} ${classes.responseTablets}`}>
                                        <TabletMacIcon/>
                                        <Box> 
                                            {
                                                isResponsiveFont ?
                                                <React.Fragment> 
                                                    <p>MarginTop: <b>{margin.top * 0.8 }</b>; MarginBottom: <b>{margin.bottom * 0.8 }</b> </p>   
                                                    <p>FontSize: <b>{ fontSize * 0.8 }</b> </p>   
                                                </React.Fragment>
                                                :
                                                <Typography variant='caption'>
                                                    Turn on the "button" at the top for auto-calculated responsive values
                                                </Typography>
                                            }
                                        </Box>
                                    </Box>
                                </Tooltip>
                                <Tooltip classes={{tooltip: classes.mobileTooltip}} title='Calculated styles for Mobile (>600px)' placement={'top'}>
                                    <Box className={`${classes.responseValues} ${classes.responseMobile}`}>
                                        <PhoneIphoneIcon/>
                                        <Box> 
                                            {
                                                isResponsiveFont ?
                                                <React.Fragment> 
                                                    <p>MarginTop: <b>{margin.top * 0.5 }</b>; MarginBottom: <b>{margin.bottom * 0.5 }</b> </p>  
                                                    <p>FontSize: <b>{ fontSize > 40 ? fontSize*0.6 : 20 }</b>  LineHeight: <b>{1.2} </b> </p>   
                                                    <p>TextAlign:  <b>center</b> </p>
  
                                                </React.Fragment>
                                                :
                                                <Typography variant='caption'>
                                                    Turn on the "button" at the top for auto-calculated responsive values
                                                </Typography>
                                            }
                                        </Box>
                                    </Box>
                                </Tooltip>

                                {/* margin */}
                                <Box className={classes.inputGroup}>
                                    <Box display="flex" flexDirection="row"  > 
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Margin Top" 
                                            variant="filled" 
                                            size='small'  
                                            value={margin.top}
                                            onChange={ (e) => { handleMargin(e, 'top') } }     
                                        />
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Margin Bottom" 
                                            variant="filled" 
                                            size='small'  
                                            value={margin.bottom}
                                            onChange={ (e) => { handleMargin(e, 'bottom') } }     
                                        />
                                    </Box>
                                    <Box display="flex" flexDirection="row" > 
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Margin Left" 
                                            variant="filled" 
                                            size='small'  
                                            value={margin.left}
                                            onChange={ (e) => { handleMargin(e, 'left') } }     
                                        />
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Margin Right" 
                                            variant="filled" 
                                            size='small'  
                                            value={margin.right}
                                            onChange={ (e) => { handleMargin(e, 'right') } }     
                                        />
                                    </Box>
                                </Box>
                                
                                {/* padding */}
                                <Box className={classes.inputGroup}>
                                    <Box display="flex" flexDirection="row" > 
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Padding Top" 
                                            variant="filled" 
                                            size='small'  
                                            value={padding.top}
                                            onChange={ (e) => { handlePadding(e, 'top') } }     
                                        />
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Padding Bottom" 
                                            variant="filled" 
                                            size='small'  
                                            value={padding.bottom}
                                            onChange={ (e) => { handlePadding(e, 'bottom') } }     
                                        />
                                    </Box>
                                    <Box display="flex" flexDirection="row" > 
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Padding Left" 
                                            variant="filled" 
                                            size='small'  
                                            value={padding.left}
                                            onChange={ (e) => { handlePadding(e, 'left') } }     
                                        />
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Padding Right" 
                                            variant="filled" 
                                            size='small'  
                                            value={padding.right}
                                            onChange={ (e) => { handlePadding(e, 'right') } }     
                                        />
                                    </Box>
                
                                </Box>
                                
                                {/* bg-color */}
                                <Box className={classes.inputGroup} display="flex" flexDirection="row" > 
                                    <Box 
                                        className={classes.inputNumber}
                                    >
                                        <Typography  component={'h6'} gutterBottom  >
                                            Background  -  { backgroundColor }
                                        </Typography> 
                                        <ColorPicker 
                                            initialColor={backgroundColor} 
                                            changeColor={setBackgroundColor} 
                                            setIsDisableBtn={setIsDisableBtn}
                                            position={'left'}
                                        /> 
                                    </Box> 
                                    <Box 
                                        className={classes.inputNumber}
                                    >
                                        <Typography  component={'h6'} gutterBottom  >
                                            Color  -  { color }
                                        </Typography>
                                        <ColorPicker 
                                            initialColor={color} 
                                            changeColor={setColor} 
                                            setIsDisableBtn={setIsDisableBtn}
                                            position={'right'}
                                        /> 
                                    </Box>  
                                </Box>
                                
                                {/* font */}
                                <Box className={classes.inputGroup}> 
                                    <Box display="flex" flexDirection="row" >  
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Font Size" 
                                            variant="filled" 
                                            size='small'  
                                            value={fontSize}
                                            onChange={ (e) => {setIsDisableBtn(false); setFontSize(Number(e.target.value))} }     
                                        /> 
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
                                    <TextField 
                                        className={classes.inputNumber}
                                        type='number'
                                        label="Line Height (em)" 
                                        variant="filled" 
                                        size='small'  
                                        value={lineHeight}
                                        onChange={ (e) => {setIsDisableBtn(false); setLineHeight(Number(e.target.value))} }     
                                    />
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
                                </Box>
                                
                                <Box className={classes.btnSave}>
                                    <Button 
                                        disabled={isDisableBtn} 
                                        variant="contained"
                                        color="primary"
                                        size={'medium'} 
                                        onClick={saveData}
                                    >
                                        Save
                                    </Button> 
                                </Box>
                            
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
                            <Tooltip  title={` ${props.data.variant} margin top`}  placement={'top'}>
                                <div className={classes.mtView}></div>
                            </Tooltip>
                            <Tooltip  title={` ${props.data.variant} margin bottom`}  placement={'top'}>
                                <div className={classes.mbView}></div>
                            </Tooltip> 
                            <Tooltip  title={` ${props.data.variant} padding top`}  placement={'top'}>
                                <div className={classes.ptView}></div>
                            </Tooltip> 
                            <Tooltip  title={` ${props.data.variant} padding bottom`}  placement={'top'}>
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
                        <Tooltip  title="Delete Heading"  placement={'top'}> 
                            <IconButton 
                                className={ classes.dumbItemDelete}
                                size="small"
                                aria-label="delete"
                                onClick={removeItem}
                            >
                                <DeleteOutline style={{ color: '#fff'}}/>
                            </IconButton>
                        </Tooltip>  
                        
 
                </Grid>
            </Grid>
           
 
    )
}

export default StyledComponent
