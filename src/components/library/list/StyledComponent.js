import React from 'react'  

import StylesChangers from '../../../styles/changers'   
import StyledInputs from '../../../styles/inputs'   

import Draggable from 'react-draggable'; 

import { makeStyles } from '@material-ui/core/styles';

import { 
    Grid,  
    Button, 
    ButtonGroup, 
    FormControl,
    InputLabel,
    Select, 
    MenuItem,   
    Typography,
    Modal,
    Box,
    DialogContent, 
    Tooltip,
    TextField
} from '@material-ui/core'

import DumbComponent from "./DumbComponent"  

import ColorSelecter from '../../functions/colorChanger/ColorSelecter'
import {isNoThemeColor} from '../../functions/colorChanger/ColorCalculation'

import InputChange from '../../functions/InputChange';
  
import OpenWithIcon from '@material-ui/icons/OpenWith';
import DeleteOutline  from '@material-ui/icons/DeleteOutline';   
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

import Confirm from '../../utilits/Confirm' 

const StyledComponent = (props) => {  

    console.log('styled list work')

    const [isVisibleConfirmBlock, setIsVisibleConfirmBlock] = React.useState(false) 
    const [isVisibleConfirmItem, setIsVisibleConfirmItem] = React.useState({show: false, index : null}) 

    const [paddingLeft, setPaddingLeft] = React.useState( props.data.classes.paddingLeft || 15 )
    const [margin, setMargin] = React.useState({
        top:  props.data.classes.marginTop ,  
        bottom: props.data.classes.marginBottom ,  
    }) 
     
    const [colorSelect, setColorSelect] = React.useState(props.data.classes.color || 'inherit') 
    const [colorCustom, setColorCustom] = React.useState(props.data.classes.color || 'inherit') 

    const [fontSize, setFontSize] = React.useState(props.data.classes.fontSize ||  16)
    const [fontWeight, setFontWeight] = React.useState(props.data.classes.fontWeight ||  400)
    const [lineHeight, setLineHeight] = React.useState(props.data.classes.lineHeight ||  1.38)

    const [items, setItems] = React.useState(props.data.items || [])
    const [itemsPadding, setItemsPadding] = React.useState(props.data.itemsStyle.paddingBottom || [])
    const [itemsListStyle, setItemsListStyle] = React.useState(props.data.itemsStyle.listStyle || 'decimal')
    const [newItem, setNewItem] = React.useState('') 

    const mobileMarginTopComputed = margin.top === 0 ? 0 : (margin.top > 30 ? margin.top*0.6 : 15)
    const mobileMarginBottomComputed = margin.bottom === 0 ? 0 : (margin.bottom > 30 ? margin.bottom*0.6 : 15)

    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 
 
    const [open, setOpen] = React.useState(false);
         
    
    const colorTheme = isNoThemeColor(props.data.classes.color)
    React.useEffect(() => {
        if(colorTheme) {  
            setColorSelect('custom')
        } 
        // eslint-disable-next-line
    }, [props.data.classes.color]) 

    const useStyles = makeStyles((theme) => {
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle,  responseValues, responseMobile, mobileTooltip, dialogContentUnstyle  } = commonClasses 
        const { mtView, mbView, inputNumber, inputGroup, dumbItemContainer, dumbItem, dumbItemDelete } = commonStyle
        return ({ 
            dialogContentUnstyle: dialogContentUnstyle, 
            inputNumber: inputNumber, 
            inputGroup: inputGroup, 
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
                    }   
                }
            }},
            mtView: { ...mtView, ...{
                    top: `-${margin.top}px`, 
                    height: `${margin.top}px`, 
                    [theme.breakpoints.down('sm')]: {
                        top: `-${mobileMarginTopComputed}px`,  
                        height: `${mobileMarginTopComputed}px`,
                    }
                } 
            }, 
            mbView: { ...mbView, ...{
                    bottom: `-${margin.bottom}px`, 
                    height: `${margin.bottom}px`, 
                    [theme.breakpoints.down('sm')]: {
                        bottom: `-${mobileMarginBottomComputed}px`,
                        height: `${mobileMarginBottomComputed}px`,
                    }
                } 
            },  
            dumbItem: dumbItem, 
            dumbItemDelete : dumbItemDelete,  
            menu: {...menu, ...{
                left: "calc(50% - 250px)",
                width: 500, 
            }}, 
            menuTitle: {...menuTitle, ...{ 
                borderColor: isDisableBtn ? '#0000' : theme.palette.secondary.main
            }},
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
        fontSize: fontSize,
        fontWeight: fontWeight, 
        lineHeight: lineHeight 
    } 
    const classes = useStyles();

    
    const handleMargin = (value, direction) => {  
        let newMargin = Object.assign({}, margin)
        newMargin[direction] = Number(value)
        setMargin(newMargin)  

        setIsDisableBtn(false);
    }

    const handleSave = () => {    
        const sentData = Object.assign({}, props.data)

        sentData.classes = myClassName 
        sentData.itemsStyle = {
            paddingBottom: itemsPadding, 
            listStyle: itemsListStyle
        }
        sentData.items = items
        if(colorSelect === 'custom') {
            sentData.classes.color = colorCustom
        } else {
            sentData.classes.color = colorSelect
        }
 
        props.reSaveChildren(props.data.id, sentData)
        setIsDisableBtn(true);  
    }
    const removeItem = () => {  
        setIsVisibleConfirmBlock(true)  
    };
    
    const handleOpen = () => {  
        setOpen(true);
    }
    const handleClose = () => {
        if(!isDisableBtn) handleSave()
        setOpen(false);
    };

    const handleItemChange = (value, index) => {
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
    const deleteItemList = (index) => { 
        setIsVisibleConfirmItem({show: true, index: index}) 
    } 
    const handleAddItem = () => {
        let newItems = items.slice()
        
        newItems.push(newItem)
 
        setItems(newItems)
        
        setNewItem('') 
        setIsDisableBtn(false)
    } 
    const swapList = (direction, id) => {
        props.swapChildrens(direction, id)
    }
    const handleConfirmClickBlock = () => {
        props.removeItem(props.data.id)
    }
    const handleConfirmClickItem = (index) => { 
        let newItems = items.slice()
        newItems.splice(index, 1)
            
        setItems(newItems) 
        setIsDisableBtn(false)
    }

    return ( 
            <Grid container style={{position: 'relative'}}> 
                <Confirm
                    isVariable={false}
                    show={isVisibleConfirmBlock}
                    setShow={setIsVisibleConfirmBlock} 
                    title={'Remove block advantages?'}
                    text={"You can't cancel this action."}
                    removeText={"remove"}
                    handleRemoveClick={handleConfirmClickBlock}
                />
                <Confirm
                    isVariable={true}
                    show={isVisibleConfirmItem}
                    setShow={setIsVisibleConfirmItem} 
                    title={'Delete item?'}
                    text={"You can't cancel this action."}
                    removeText={"delete"}
                    handleRemoveClick={handleConfirmClickItem}
                />
                <Modal 
                    open={open}  
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
                                { !isDisableBtn && "Close to save - " } List Settings <OpenWithIcon/>
                            </Typography>
                            <Tooltip classes={{tooltip: classes.mobileTooltip}} title='Calculated styles for Mobile (<600px)' placement={'top'}>
                                <Box className={`${classes.responseValues} ${classes.responseMobile}`}>
                                    <PhoneIphoneIcon/>
                                    <Box>
                                        <p>
                                            MarginTop: <b>{mobileMarginTopComputed}</b>; &nbsp;
                                            MarginBottom: <b>{mobileMarginBottomComputed}</b> 
                                        </p> 
                                        <p>PaddingLeft:  <b>{paddingLeft === 0 ? 0 : (paddingLeft > 30 ? paddingLeft*0.6 : 15)}</b></p>
                                    </Box>
                                </Box> 
                            </Tooltip> 
                               
                            {/* margin */}
                            <Box className={classes.inputGroup}>
                                <Box display="flex" flexDirection="row"  > 
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={'top'}
                                            fullWidth={false}
                                            type='number'
                                            size="small" 
                                            label='Block Margin Top'
                                            variant='filled'
                                            value={margin.top}
                                            setValue={handleMargin}
                                            setIsDisableBtn={setIsDisableBtn}
                                            direction='row'
                                        />  
                                    </Box> 
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={'bottom'}
                                            fullWidth={false}
                                            type='number'
                                            size="small" 
                                            label='Block Margin Bottom'
                                            variant='filled'
                                            value={margin.bottom}
                                            setValue={handleMargin}
                                            setIsDisableBtn={setIsDisableBtn}
                                            direction='row'
                                        />  
                                    </Box>  
                                </Box> 
                            </Box>
                            
                            {/* padding */}
                            <Box className={classes.inputGroup}>
                                <Box display="flex" flexDirection="row" > 
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={null} 
                                            type='number'
                                            size="small" 
                                            label="Block Padding Left" 
                                            variant='filled'
                                            value={paddingLeft}
                                            setValue={setPaddingLeft}
                                            setIsDisableBtn={setIsDisableBtn}
                                            direction='row'
                                        />  
                                    </Box>   
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={null} 
                                            type='number'
                                            size="small" 
                                            label="Item Padding Bottom" 
                                            variant='filled'
                                            value={itemsPadding}
                                            setValue={setItemsPadding}
                                            setIsDisableBtn={setIsDisableBtn}
                                            direction='row'
                                        />  
                                    </Box>   
                                </Box>
                                 
                            </Box>
                           
                                     
                            {/* font */}
                            <Box className={classes.inputGroup} mt={2}> 
                                <Box display="flex" flexDirection="row" >  
                                   
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={null} 
                                            type='number'
                                            size="small" 
                                            label="Font Size" 
                                            variant='filled'
                                            value={fontSize}
                                            setValue={setFontSize}
                                            setIsDisableBtn={setIsDisableBtn}
                                            direction='row'
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
                                            id={null} 
                                            type='number'
                                            size="small" 
                                            label="Line Height (em)" 
                                            variant='filled'
                                            value={lineHeight}
                                            setValue={setLineHeight}
                                            setIsDisableBtn={setIsDisableBtn}
                                            direction='row'
                                        />  
                                    </Box>
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
                                <Box display="flex" flexDirection="row" >
                                    <Box className={classes.inputNumber} >
                                        <ColorSelecter
                                            label={'Color'}
                                            colorSelect={colorSelect} 
                                            setColorSelect={setColorSelect}
                                            colorCustom={colorCustom}
                                            setColorCustom={setColorCustom}
                                            setIsDisableBtn={setIsDisableBtn} 
                                            position="left"
                                            noInherit={false}
                                        /> 
                                    </Box>
                                </Box>
                            </Box>
                            

                            {/* items */}
                            <Box className={classes.inputGroup} mt={3}>  
                                {
                                    items.map( (item, index) => {
                                        return (
                                            <Box key={index} display={'flex'} alignItems='flex-start' p={1} > 
                                                <InputChange
                                                    id={index}
                                                    fullWidth={true}
                                                    multiline={true}
                                                    type='text'
                                                    size="small" 
                                                    label={`Item ${index+1}`} 
                                                    variant='outlined'
                                                    value={item}
                                                    setValue={handleItemChange}
                                                    setIsDisableBtn={setIsDisableBtn} 
                                                />  
                                                <Box mr={0.5} />
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
                                                                onClick={() => { deleteItemList(index) }}
                                                            > 
                                                                <DeleteOutline style={{ color: '#fff' }} fontSize='small'/>
                                                            </Button>
                                                        </Tooltip>  
                                                    </ButtonGroup> 
                                            </Box>
                                        )
                                    })
                                } 
                                <Box px={1}>
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
                            </Box>
                            <Box mt={5} />
                        
                        </div>
                    </Draggable>
                    </DialogContent>
                </Modal>
                
                <Grid item xs={12}  className={classes.dumbItemContainer }>  
                        <div 
                            className={classes.dumbItem }
                            onClick={handleOpen}
                            aria-controls="simple-menu" aria-haspopup="true"  
                        > 
                            <Tooltip  title={` list margin top`}  placement={'top'}>
                                <div className={classes.mtView}></div>
                            </Tooltip>
                            <Tooltip  title={` list margin bottom`}  placement={'top'}>
                                <div className={classes.mbView}></div>
                            </Tooltip> 
                               
                            <DumbComponent 
                                data={props.data} 
                                className={props.data.classes}   
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
                                            onClick={() => { swapList('up', props.data.id) }}
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
                                            onClick={() => { swapList('down', props.data.id) }} 
                                            size='small'
                                            variant='contained'
                                            color='primary'  
                                        >     
                                            <ExpandMoreOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>
                                        </Button>
                                    </Tooltip>  
                                }
 

                                <Tooltip  title="Delete List"  placement={'top'}> 
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
