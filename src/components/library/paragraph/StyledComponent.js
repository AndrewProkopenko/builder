import React from 'react'  

import StylesChangers from '../../../styles/changers'   
import StyledInputs from '../../../styles/inputs'   

import Draggable from 'react-draggable'; 

import { makeStyles } from '@material-ui/core/styles';

import {
    FormGroup, 
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
    DialogContent, 
    Tooltip

} from '@material-ui/core'

import DumbComponent from "./DumbComponent"  
import {ColorPicker} from '../colorPicker/ColorPicker'
 

import OpenWithIcon from '@material-ui/icons/OpenWith';
import DeleteOutline  from '@material-ui/icons/DeleteOutline';  

const StyledComponent = (props) => {  

    console.log('styled paragraph work')
    let [padding, setPadding] = React.useState({ 
        top:  props.data.classes.paddingTop  , 
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

    const [borderColor, setBorderColor] = React.useState(props.data.classes.borderColor ||  'transperent')
    const [borderStyle, setBorderStyle] = React.useState(props.data.classes.borderStyle ||  'solid')
    const [borderWidth, setBorderWidth] = React.useState(props.data.classes.borderWidth ||  0 )
    const [borderRadius, setBorderRadius] = React.useState(props.data.classes.borderRadius || 0)

    const [textAlign, setTextAlign] = React.useState(props.data.classes.textAlign ||  'left')
    const [display, setDisplay] = React.useState(props.data.classes.display ||  'block')
    const [fontSize, setFontSize] = React.useState(props.data.classes.fontSize ||  16)
    const [fontWeight, setFontWeight] = React.useState(props.data.classes.fontWeight ||  400)
    const [lineHeight, setLineHeight] = React.useState(props.data.classes.lineHeight ||  1.38)

    const [textInDumb, setTextInDumb] = React.useState(props.data.text)
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 

    
    const [open, setOpen] = React.useState(false);
         

    const useStyles = makeStyles((theme) => {
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { btnSave, menu, menuTitle } = commonClasses 
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
        lineHeight: lineHeight,
        borderColor: borderColor,
        borderStyle: borderStyle,
        borderRadius: borderRadius,
        borderWidth: borderWidth
    } 
    const classes = useStyles();

    //const dataNew - props for Dumb Component
    // const dataNew = {...props.data, ...{
    //     classes: myClassName
    // }} 

     
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


        props.reSaveChildren(props.data.id, sentData)
        setIsDisableBtn(true); 
        handleClose()
    }
    const removeItem = () => {  
        props.removeItem(props.data.id)
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
                                Задать параграфу текст и стили <OpenWithIcon/>
                            </Typography>
                            <Box mb={3} >
                                <TextField 
                                        type='text' 
                                        label="Text input"
                                        fullWidth
                                        value={textInDumb}
                                        multiline={true}
                                        rowsMax={6}
                                        variant="filled"
                                        onChange={(e) => { setIsDisableBtn(false); setTextInDumb(e.target.value) }}
                                />    
                            </Box>  

                            
                            {/* display */}
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
                                </FormGroup>
                            </Box>                           
                           
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
                                    <Box className={classes.inputNumber} >
                                        <Typography  component={'p'} gutterBottom  >
                                            Background   -  { backgroundColor }
                                        </Typography> 
                                        <ColorPicker 
                                            initialColor={backgroundColor} 
                                            changeColor={setBackgroundColor} 
                                            setIsDisableBtn={setIsDisableBtn}
                                            position={'left'}
                                        /> 
                                    </Box> 
                                    <Box className={classes.inputNumber} >
                                        <Typography  component={'p'} gutterBottom  >
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
                                                    
                            {/* border */}
                            <Box className={classes.inputGroup}> 
                                <Box display="flex" flexDirection="row" > 
                                    
                                    <Box className={classes.inputNumber} >
                                        <Typography  component={'p'} gutterBottom  >
                                            Border Color  -  { borderColor }
                                        </Typography> 
                                        <ColorPicker 
                                            initialColor={borderColor} 
                                            changeColor={setBorderColor} 
                                            setIsDisableBtn={setIsDisableBtn}
                                            position={'left'}
                                        /> 
                                    </Box> 
                                     
                                    <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Border Radius" 
                                            variant="filled" 
                                            size='small'  
                                            value={borderRadius}
                                            onChange={ (e) => { setIsDisableBtn(false);  setBorderRadius(Number(e.target.value)) } }     
                                    />

                                </Box>
                                <Box display="flex" flexDirection="row" > 
                        
                                <TextField 
                                    className={classes.inputNumber}
                                    type='number'
                                    label="Border Width" 
                                    variant="filled" 
                                    size='small'  
                                    value={borderWidth}
                                    onChange={ (e) => { setIsDisableBtn(false);setBorderWidth(Number(e.target.value))} }     
                                />
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
                            <Tooltip  title={` paragraph margin top`}  placement={'top'}>
                                <div className={classes.mtView}></div>
                            </Tooltip>
                            <Tooltip  title={` paragraph margin bottom`}  placement={'top'}>
                                <div className={classes.mbView}></div>
                            </Tooltip> 
                            <Tooltip  title={` paragraph padding top`}  placement={'top'}>
                                <div className={classes.ptView}></div>
                            </Tooltip> 
                            <Tooltip  title={` paragraph padding bottom`}  placement={'top'}>
                                <div className={classes.pbView}></div>
                            </Tooltip>   
                            
                            <DumbComponent 
                                data={props.data} 
                                className={props.data.classes}  
                                prop={props.data.prop} 
                                textChildren={props.data.text} 
                            /> 
                           
                        </div>  
                        <Tooltip  title="Delete Paragraph"  placement={'top'}> 
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
