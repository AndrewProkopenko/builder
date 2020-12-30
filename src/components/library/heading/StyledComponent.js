import React from 'react'  

import Draggable from 'react-draggable';
import { TwitterPicker } from 'react-color';

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
 

import OpenWithIcon from '@material-ui/icons/OpenWith';
import { DeleteOutline, InfoOutlined } from '@material-ui/icons';

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
         

    const useStyles = makeStyles((theme) => ({
        inputNumber: {
            flexGrow: 1, 
            margin: 5, 
            width: "100%"
        }, 
        inputGroup: {
            border: `1px solid ${theme.palette.divider}`, 
            padding: 3, 
            inputNumber: { 
                maxWidth: "100%"

            }
        }, 
        btnSave: { 
            position: 'sticky', 
            zIndex: theme.zIndex.tooltip,
            bottom: 0, 
            left: 0, 
            right: 0,
            height: 80, 
            backgroundColor: theme.palette.background.paper, 
            
            '&>button': {
                marginTop: 20, 
                marginBottom: 30, 
                marginLeft: 5, 
                opacity: 1,  
                paddingLeft: 40, 
                paddingRight: 40
            }
        },
        dumbItemContainer: { 
            position: 'relative', 
            outline: '1px solid #f000',
            transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn} outline`,
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
                '& $btnDrawerStyle': {
                    opacity: 1
                } 
            }, 
        },
        mtView: {  
            position: 'absolute', 
            top: `-${margin.top}px`, 
            left: 0, 
            right: 0,
            zIndex: 10, 
            backgroundColor: '#fff7003d',
            height: `${margin.top}px`, 
            opacity: 0,
            transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeIn} opacity`
        },
        mbView: {  
            position: 'absolute', 
            bottom: `-${margin.bottom}px`, 
            left: 0, 
            right: 0,
            zIndex: 10, 
            backgroundColor: '#fff7003d',
            height: `${margin.bottom}px`, 
            opacity: 0,
            transition: `180ms ${theme.transitions.easing.easeIn} opacity`
        },
        ptView: {  
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0,
            zIndex: 10, 
            backgroundColor: '#400e575e',
            height: `${padding.top}px`, 
            opacity: 0,
            transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeIn} opacity`
        },
        pbView: {  
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0,
            zIndex: 10, 
            backgroundColor: '#400e575e',
            height: `${padding.bottom}px`, 
            opacity: 0,
            transition: `180ms ${theme.transitions.easing.easeIn} opacity`
        },
        dumbItem: { 
            position: 'relative',
            transition: "300ms cubic-bezier(0.4, 0, 1, 1)",
            
        }, 
        dumbItemDelete : { 
            opacity: 0,
            position: 'absolute', 
            zIndex: 15, 
            top: 3, 
            right: 5,
            backgroundColor: theme.palette.secondary.dark,
            transition: "100ms cubic-bezier(0.4, 0, 1, 1)",
            '&:hover' : { 
                backgroundColor: theme.palette.error.light
            }
        }, 
         
        menu: {    
            position: "absolute", 
            left: "calc(50% - 200px)",
            top: 50,  
            backgroundColor: theme.palette.background.paper, 
            padding: 10 , 
            paddingBottom: 0, 
            maxWidth: 400,  
            width: 400,
            maxHeight: 'calc(100vh - 100px)', 
            minHeight: 500,
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
        const sentData = Object.assign({}, props.data)

        sentData.classes = myClassName
        sentData.text = textInDumb
        sentData.responseFont = isResponsiveFont
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
                                        <Tooltip title="Если включено, шрифт будет меньше размером на мобильных устройствах. "  >
                                            <IconButton>
                                                <InfoOutlined/>
                                            </IconButton>
                                        </Tooltip>
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
                                    <Box 
                                        className={classes.inputNumber}
                                    >
                                        <Typography  component={'h6'} gutterBottom  >
                                            Background  
                                        </Typography>
                                        <TwitterPicker
                                            width={'100%'}
                                            triangle={'hide'}
                                            color={backgroundColor}
                                            colors={[ '#4e36f4', '#36f477', 'rgb(244, 214, 54)']} 
                                            onChangeComplete={(newColor) => {
                                                setIsDisableBtn(false);
                                                setBackgroundColor(newColor.hex) 
                                            }}

                                        /> 
                                    </Box> 
                                    <Box 
                                        className={classes.inputNumber}
                                    >
                                        <Typography  component={'h6'} gutterBottom  >
                                            Color  
                                        </Typography>
                                        <TwitterPicker
                                            width={'100%'}
                                            triangle={'hide'}
                                            colors={[ '#4e36f4', '#36f477', 'rgb(244, 214, 54)']} 
                                            color={color}
                                            onChangeComplete={(newColor) => {
                                                setIsDisableBtn(false);
                                                setColor(newColor.hex) 
                                            }}

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
                                data={dataNew} 
                                className={myClassName}
                                isResponsiveFont={isResponsiveFont}
                                prop={props.data.prop} 
                                textChildren={textInDumb}
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
