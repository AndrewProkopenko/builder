import React from 'react'  

import StylesChangers from '../../../styles/changers'   
import StyledInputs from '../../../styles/inputs'   

import Draggable from 'react-draggable'; 

import { makeStyles } from '@material-ui/core/styles';

import { 
    Grid, 
    TextField, 
    Button, 
    ButtonGroup, 
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
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

const StyledComponent = (props) => {  

    console.log('styled list work')

    const [paddingLeft, setPaddingLeft] = React.useState( props.data.classes.paddingLeft || 15 )
    const [margin, setMargin] = React.useState({
        top:  props.data.classes.marginTop ,  
        bottom: props.data.classes.marginBottom ,  
    }) 
    const [color, setColor] = React.useState(props.data.classes.color || 'inherit') 
    const [fontSize, setFontSize] = React.useState(props.data.classes.fontSize ||  16)
    const [fontWeight, setFontWeight] = React.useState(props.data.classes.fontWeight ||  400)
    const [lineHeight, setLineHeight] = React.useState(props.data.classes.lineHeight ||  1.38)

    const [items, setItems] = React.useState(props.data.items || [])
    const [itemsPadding, setItemsPadding] = React.useState(props.data.itemsStyle.paddingBottom || [])
    const [itemsListStyle, setItemsListStyle] = React.useState(props.data.itemsStyle.listStyle || 'decimal')
    const [newItem, setNewItem] = React.useState('')

 
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 
 
    const [open, setOpen] = React.useState(false);
         

    const useStyles = makeStyles((theme) => {
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { btnSave, menu, menuTitle,  responseValues, responseMobile, mobileTooltip  } = commonClasses 
        const { mtView, mbView, inputNumber, inputGroup, dumbItemContainer, dumbItem, dumbItemDelete } = commonStyle
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
                    }   
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
            dumbItem: dumbItem, 
            dumbItemDelete : dumbItemDelete,  
            menu: {...menu, ...{
                left: "calc(50% - 200px)",
                width: 400, 
            } },
             
            menuTitle: menuTitle,
            movingPageBtn: {  
                '&>button' : {
                    paddingLeft: 3,
                    paddingRight: 3,
                    minWidth: 22
                }
            },
            responseValues: responseValues,  
            responseMobile: responseMobile,
            mobileTooltip: mobileTooltip,
             
          })
    });
    
    const myClassName = {  
        marginTop: margin.top,
        marginBottom: margin.bottom, 
        paddingLeft: paddingLeft, 
        color: color, 
        fontSize: fontSize,
        fontWeight: fontWeight, 
        lineHeight: lineHeight 
    } 
    const classes = useStyles();

    
    const handleMargin = (e, direction) => {  
        let newMargin = Object.assign({}, margin)
        newMargin[direction] = Number(e.target.value)
        setMargin(newMargin)  

        setIsDisableBtn(false);
    }

    const saveData = () => {    
        const sentData = Object.assign({}, props.data)

        sentData.classes = myClassName 
        sentData.itemsStyle = {
            paddingBottom: itemsPadding, 
            listStyle: itemsListStyle
        }
        sentData.items = items
 
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

    const handleItemChange = (index, value) => {
        let newItems = items.slice()
        newItems[index] = value
        setItems(newItems)
        setIsDisableBtn(false)
    }
    const swapItem = (direction, index) => {
        let newItems = items.slice() 
        let activeIndex = index  
      
        if(direction === 'up' && activeIndex === 0) return  
        if(direction === 'down' && activeIndex === newItems.length - 1 ) return
        
        if(direction === 'up') { 
          const movedItem = newItems[activeIndex]
          const placeItem = newItems[activeIndex - 1]
    
          newItems[activeIndex] = placeItem
          newItems[activeIndex - 1 ] = movedItem  
        }
        if(direction === 'down') {
          const movedItem = newItems[activeIndex]
          const placeItem = newItems[activeIndex + 1]
    
          newItems[activeIndex] = placeItem
          newItems[activeIndex + 1 ] = movedItem  
        }

        setItems(newItems) 
        setIsDisableBtn(false)
    }
    const deleteItem = (index) => {  
        let newItems = items.slice()
        newItems.splice(index, 1)
         
        setItems(newItems) 
        setIsDisableBtn(false)
    }
    
    const handleAddItem = () => {
        let newItems = items.slice()
        
        newItems.push(newItem)
 
        setItems(newItems)
        
        setNewItem('') 
        setIsDisableBtn(false)
    }
    

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
                                List Settings <OpenWithIcon/>
                            </Typography>
                            <Tooltip classes={{tooltip: classes.mobileTooltip}} title='Calculated styles for Mobile (>600px)' placement={'top'}>
                                <Box className={`${classes.responseValues} ${classes.responseMobile}`}>
                                    <PhoneIphoneIcon/>
                                    <Box>
                                        <p>
                                            MarginTop: <b>{margin.top === 0 ? 0 : (margin.top > 30 ? margin.top*0.6 : 15)}</b>; 
                                            MarginBottom: <b>{margin.bottom === 0 ? 0 : (margin.bottom > 30 ? margin.bottom*0.6 : 15)}</b> 
                                        </p> 
                                        <p>PaddingLeft:  <b>{paddingLeft === 0 ? 0 : (paddingLeft > 30 ? paddingLeft*0.6 : 15)}</b></p>
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
                            </Box>
                            
                            {/* padding */}
                            <Box className={classes.inputGroup}>
                                <Box display="flex" flexDirection="row" > 
                                    <TextField 
                                        className={classes.inputNumber}
                                        type='number'
                                        label="Padding Left" 
                                        variant="filled" 
                                        size='small'  
                                        value={paddingLeft}
                                        onChange={ (e) => { setPaddingLeft(e.target.value) } }     
                                    /> 
                                </Box>
                                 
            
                            </Box>
                           
                                     
                            {/* font */}
                            <Box className={classes.inputGroup} mt={2}> 
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
                                     <Box className={classes.inputNumber} >
                                        <Typography  component={'p'} gutterBottom  >
                                            Color  -  { color }
                                        </Typography> 
                                        <ColorPicker 
                                            initialColor={color} 
                                            changeColor={setColor} 
                                            setIsDisableBtn={setIsDisableBtn}
                                            position={'left'}
                                        /> 
                                    </Box>  
                                </Box>
                                <Box display="flex" flexDirection="row" >
                                    <TextField 
                                        className={classes.inputNumber}
                                        type='number'
                                        label="Item Padding Bottom" 
                                        variant="filled" 
                                        size='small'  
                                        value={itemsPadding}
                                        onChange={ (e) => {setIsDisableBtn(false); setItemsPadding(Number(e.target.value))} }     
                                    />
                                    <FormControl 
                                        variant='filled' 
                                        size='small'   
                                        className={classes.inputNumber}
                                    >
                                        <InputLabel id="align-select-label">List Style</InputLabel>
                                        <Select
                                            labelId="align-select-label"
                                            id="align-select"
                                            value={itemsListStyle}
                                            onChange={(e) => {setIsDisableBtn(false); setItemsListStyle((e.target.value)) }}
                                        >
                                            <MenuItem value={'none'}>None</MenuItem>
                                            <MenuItem value={'circle'}>Circle</MenuItem>
                                            <MenuItem value={'disc'}>Disc</MenuItem>
                                            <MenuItem value={'square'}>Square</MenuItem>
                                            <MenuItem value={'decimal'}>Numbers</MenuItem>
                                            <MenuItem value={'lower-alpha'}>lower-alpha</MenuItem>
                                            <MenuItem value={'upper-alpha'}>upper-alpha</MenuItem>
                                            <MenuItem value={'upper-roman'}>upper-roman</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            

                            {/* items */}
                            <Box className={classes.inputGroup} mt={3}>  
                                {
                                    items.map( (item, index) => {
                                        return (
                                            <Box key={index} display={'flex'} p={1} > 
                                                <TextField 
                                                    className={classes.inputNumber}
                                                    type='text'
                                                    label={`Item ${index+1}`} 
                                                    variant="outlined" 
                                                    size='small'  
                                                    value={item}
                                                    onChange={ (e) => {handleItemChange(index, e.target.value)} }     
                                                /> 
                                                <ButtonGroup 
                                                        color="primary"
                                                        aria-label="contained primary button group"
                                                        variant="contained"
                                                        className={classes.movingPageBtn}
                                                    >  
                                                        {
                                                            items.indexOf(item) !== 0 &&
                                                            <Tooltip title='Get Up' placement='top'>
                                                                <Button   
                                                                    onClick={() => { swapItem('up', index) }}
                                                                    size='small'
                                                                    variant='contained'
                                                                    color='primary'  
                                                                >  
                                                                    <ExpandLessOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>   
                                                                </Button>
                                                            </Tooltip>
                                                        }
                                                        {
                                                            items.indexOf(item) !== items.length - 1 &&
                                                            <Tooltip title='Get Down' placement='top'>
                                                                <Button   
                                                                    onClick={() => { swapItem('down', index) }} 
                                                                    size='small'
                                                                    variant='contained'
                                                                    color='primary'  
                                                                >     
                                                                    <ExpandMoreOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>
                                                                </Button>
                                                            </Tooltip>
                                                        }
                                                            
                                                        <Tooltip title='Delete Item' placement='top'>
                                                            <Button
                                                                variant='contained'
                                                                color="secondary"
                                                                disableElevation={true} 
                                                                onClick={() => { deleteItem(index) }}
                                                            > 
                                                                <DeleteOutline style={{ color: '#fff' }} fontSize='small'/>
                                                            </Button>
                                                        </Tooltip>  
                                                    </ButtonGroup> 
                                            </Box>
                                        )
                                    })
                                } 
                                <TextField 
                                    className={classes.inputNumber}
                                    type='text'
                                    label={`New Item`} 
                                    variant="outlined" 
                                    size='small'  
                                    value={newItem}
                                    onChange={ (e) => {setNewItem(e.target.value)} }     
                                />
                                <Box my={1}>
                                    <Button 
                                        onClick={handleAddItem}
                                        variant='contained'
                                        color='primary'
                                        disabled={newItem.length > 0 ? false : true}
                                    >
                                        Add new item
                                    </Button>
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
                               
                            <DumbComponent 
                                data={props.data} 
                                className={props.data.classes}   
                            /> 
                           
                        </div>  
                        <Tooltip  title="Delete List"  placement={'top'}> 
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
