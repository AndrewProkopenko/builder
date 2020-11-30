import React from 'react'  

import Draggable from 'react-draggable';

import { makeStyles } from '@material-ui/core/styles';

import {
    FormGroup, 
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
    Tooltip

} from '@material-ui/core'

import DumbComponent from "./DumbComponent" 
 

import OpenWithIcon from '@material-ui/icons/OpenWith';
import { DeleteOutline, InfoOutlined } from '@material-ui/icons';

const StyledComponent = (props) => { 

 
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

    const [isResponsiveFont, setIsResponsiveFont] = React.useState(false)

    const [textInDumb, setTextInDumb] = React.useState(props.data.text)
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 

    
    const [open, setOpen] = React.useState(false);
         

    const useStyles = makeStyles((theme) => ({
        myClassName: { 
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
        },
        
        inputNumber: {
            flexGrow: 1,
            
            maxWidth: "45%", 
            margin: 5
        }, 
        btnSave: { 
            display: 'block',
            marginTop: 10, 
            marginBottom: 10, 
            paddingLeft: 40, 
            paddingRight: 40
        }, 
        dumbItemContainer: { 
            position: 'relative', 
            border: '1px solid #f000',
            transition: "200ms cubic-bezier(0.4, 0, 1, 1)",
            '&:hover' : {   
                boxShadow: theme.shadows[10], 
                cursor: 'pointer',
                borderColor: '#f00',
                '&>button' : { 
                    opacity: 1
                }
            }, 
        },
        dumbItem: { 
            position: 'relative',
            transition: "300ms cubic-bezier(0.4, 0, 1, 1)",
            
        }, 
        dumbItemDelete : { 
            opacity: 0,
            position: 'absolute', 
            zIndex: 9, 
            top: 3, 
            right: 5,
            backgroundColor: '#fff',
            transition: "100ms cubic-bezier(0.4, 0, 1, 1)",
            '&:hover' : { 
                backgroundColor: theme.palette.error.light
            }
        }, 
         
        menu: {    
            position: "absolute", 
            left: "calc(50% - 200px)",
            top: 50, 
            backgroundColor: '#fff',
            padding: 10 , 
            maxWidth: 400,  
            width: 400,
            maxHeight: 'calc(100vh - 100px)', 
            overflowY: 'scroll'
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
        showInput: {
        }
        
      }));
    
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

    //const dataNew - props for Dumb Component
    const dataNew = {...props.data, ...{
        classes: myClassName
    }}  

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

        props.reSaveChildren(props.data.id, myClassName, textInDumb)
        setIsDisableBtn(true); 
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
                    // PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    onClose={handleClose} 
                >
                    <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                        <div className={classes.menu}  >
                        <Typography 
                            component='p' 
                            className={classes.menuTitle}
                            id="draggable-dialog-title"
                        >
                            Задать блоку текст и стили <OpenWithIcon/>
                        </Typography>
                        <Box mb={2} >
                            <TextField 
                                    type='text' 
                                    label="Text input"
                                    fullWidth
                                    value={textInDumb}
                                    onChange={(e) => { setIsDisableBtn(false); setTextInDumb(e.target.value); e.target.focus() }}
                            />    
                        </Box>  

                       <Box mb={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isResponsiveFont}
                                        onChange={() => { setIsResponsiveFont(!isResponsiveFont) }}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Set Responsive Font Size"
                            />
                            <Tooltip title="Если включено, шрифт будет меньше размером на мобильных устройствах. "  >
                                <IconButton>
                                    <InfoOutlined/>
                                </IconButton>
                            </Tooltip>
                       </Box>

                        <FormGroup row> 
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
                        </FormGroup>
                        <FormGroup row> 
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
                        </FormGroup>
                        <FormGroup row> 
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
                        </FormGroup>
                        <FormGroup row> 
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
                        </FormGroup>
    
                        <FormGroup row> 
                    
                            <TextField 
                                className={classes.inputNumber}
                                type='color'
                                label="Color" 
                                variant="filled" 
                                size='small'  
                                value={color}
                                onChange={ (e) => { setIsDisableBtn(false);  setColor(e.target.value)} }     
                            />
                            <TextField 
                                className={classes.inputNumber}
                                type='color'
                                label="Background Color" 
                                variant="filled" 
                                size='small'  
                                value={backgroundColor}
                                onChange={ (e) => { setIsDisableBtn(false);setBackgroundColor(e.target.value)} }     
                            />
                        </FormGroup>
                        <FormGroup row>  
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
                        
                            
                        </FormGroup>
                        <FormGroup row>
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
                        </FormGroup>
                        <Button 
                            disabled={isDisableBtn}
                            className={classes.btnSave}
                            variant="contained"
                            color="primary"
                            size={'medium'} 
                            onClick={saveData}
                        >
                            Save
                        </Button> 
                    
                    </div>
                    </Draggable>
                </Modal>
                
                <Grid item xs={12}  className={classes.dumbItemContainer }>  
                        <div 
                            className={classes.dumbItem }
                            onClick={handleInputFocus}
                            aria-controls="simple-menu" aria-haspopup="true"  
                        >
                            <DumbComponent 
                                data={dataNew} 
                                className={myClassName}
                                isResponsiveFont={isResponsiveFont}
                                prop={props.data.prop} 
                                textChildren={textInDumb}
                            />
                           
                        </div>  
                        <IconButton 
                            className={ classes.dumbItemDelete}
                            size="small"
                            aria-label="delete"
                            onClick={removeItem}
                        >
                            <DeleteOutline/>
                        </IconButton>
 
                </Grid>
            </Grid>
           
 
    )
}

export default StyledComponent
