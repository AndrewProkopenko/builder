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
    Typography,
    ButtonGroup,
    makeStyles,
    Modal,
    DialogContent,
    Divider,  
    FormControlLabel, 
    Switch, 
    IconButton
} from '@material-ui/core'

import OpenWithIcon from '@material-ui/icons/OpenWith';

import {DeleteOutline, InfoOutlined} from '@material-ui/icons'; 
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'; 
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

import DumbComponent from "./DumbComponent"
import AddItem from "./AddItem" 

import InputChange from '../../functions/InputChange'; 

import Confirm from '../../utilits/Confirm' 
import TableFontSizeInfo from '../../utilits/TableFontSizeInfo'
import SelectHeadingVariant from '../../functions/SelectHeadingVariant';

function StyledComponent(props) {

    const [isDisableBtn, setIsDisableBtn] = useState(true)
    const [open, setOpen] = useState(false)

    const [isVisibleConfirmBlock, setIsVisibleConfirmBlock] = useState(false) 
    const [isVisibleConfirmItem, setIsVisibleConfirmItem] = useState({show: false, index : null}) 

    const [variant, setVariant] = useState(props.data.variantHeading || 'h3')
    const [isTableSizeVisible, setIsTableSizeVisible] = useState(false)

    const [heading, setHeading] = useState(props.data.heading)  
 
    const [isButton, setIsButton] = useState(props.data.isButton || false)
    const [textButton,  setTextButton] = useState(props.data.buttonText || '') 

    const [colorSelect,  setColorSelect] = useState(props.data.color || '')
    const [colorCustom, setColorCustom] = useState(props.data.color || '')
    const [rows, setRows] = useState(props.data.rows)
    const [tableRow, setTableRow] = useState(props.data.tableRow)

    const [tableMinWidth, setTableMinWidth] = useState(props.data.tableMinWidth || 200 )

    const [visibleRows, setVisibleRows] = useState(props.data.visibleRows || 5)
    const [visibleBottonText, setVisibleBottonText] = useState(props.data.visibleBottonText || 'Show all')
    const [visibleBottonTextClick, setVisibleBottonTextClick] = useState(props.data.visibleBottonTextClick || 'Show less') 
    
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
     
    const colorTheme = isNoThemeColor(props.data.color)
    useEffect(() => {
        if(colorTheme) {  
            setColorSelect('custom')
        }
        // eslint-disable-next-line
    }, [props.data.color])  

    const useStyles = makeStyles((theme) => {
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle, btnSetting, btnDrawerStyle, btnDrawerItem, containerWrapper ,
            responseValues ,responseMobile , mobileTooltip, dialogContentUnstyle, tableSizeContainer, tableSizeBtn, tableSizeAbsolute} = commonClasses   

        const { mtView, mbView } = commonStyle 
        return ({
            tableSizeContainer: tableSizeContainer,
            tableSizeBtn: tableSizeBtn, 
            tableSizeAbsolute: tableSizeAbsolute,
            dialogContentUnstyle: dialogContentUnstyle, 
            btnDrawerStyle: btnDrawerStyle,
            btnDrawerItem: btnDrawerItem,
            containerWrapper: {
                ...containerWrapper, ...{
               '&:hover' : {
                   outlineColor: `${theme.palette.error.main}`,
                   zIndex: 25,
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
                left: 'calc( 50% - 400px )',
                maxWidth: 800,
                width: '100%',
            }},   
            menuTitle: {...menuTitle, ...{ 
                borderColor: isDisableBtn ? '#0000' : theme.palette.secondary.main
            }},
            btnSetting: btnSetting,   

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
            }
             
        })
    })

    const classes = useStyles();
 
    const handleSave = () => {
        const newData = Object.assign({}, props.data)
        newData.variantHeading = variant 
        newData.heading = heading 
        newData.tableMinWidth = tableMinWidth 
        newData.isButton = isButton 
        newData.buttonText = textButton 
        newData.rows = rows 
        newData.tableRow = tableRow 
        newData.visibleRows = visibleRows 
        newData.visibleBottonText = visibleBottonText 
        newData.visibleBottonTextClick = visibleBottonTextClick 

        newData.marginTop = marginTop
        newData.marginBottom = marginBottom
        newData.maxWidthContainer = maxWidthContainer
        

        if (colorSelect === 'custom') {
            newData.color = colorCustom
        } else {
            newData.color = colorSelect
        }

        props.reSaveItem(props.data.id, newData) 
        setIsDisableBtn(true)
    }
    const handleTableHeadChange = (value, index) => {
        const newRow = tableRow.slice()
        newRow[index] = value
        setTableRow(newRow)
    }
    const handleRowChangeName = (name, index) => {
        const newRows = rows.slice() 
        newRows[index].name = name 

        setRows(newRows)
        setIsDisableBtn(false); 
    } 
    const handleRowChangePrice = (price, index) => {
        const newRows = rows.slice() 
        newRows[index].price = price

        setRows(newRows)
        setIsDisableBtn(false); 
    } 
    const swapItem = (direction, index) => { 
        const newRows = rows.slice()
        let activeIndex   
    
        newRows.map( (item) => { 
            if(newRows.indexOf(item) === index) {
                activeIndex = index
            }
            return 0 
        }) 
 
        if(direction === 'up' && activeIndex === 0) return  
        if(direction === 'down' && activeIndex === newRows.length - 1 ) return
        
        if(direction === 'up') { 
            const movedItem = newRows[activeIndex]
            const placeItem = newRows[activeIndex - 1]

            newRows[activeIndex] = placeItem
            newRows[activeIndex - 1 ] = movedItem  
        }
        if(direction === 'down') {
            const movedItem = newRows[activeIndex]
            const placeItem = newRows[activeIndex + 1]

            newRows[activeIndex] = placeItem
            newRows[activeIndex + 1 ] = movedItem  
        }
  
        setRows(newRows) 
        setIsDisableBtn(false);  
    }
    const addRow = (title, body) => {
        const newRows = rows.slice()
        const rowLayout = {
            name: title, 
            price: body 
        }
        newRows.push(rowLayout)

        setRows(newRows)
        setIsDisableBtn(false); 
    }
    const removeItem = (index) => { 
        setIsVisibleConfirmItem({show: true, index: index}) 
    }
    const removeTable = () => {
        setIsVisibleConfirmBlock(true)  
    }
      
    const handleConfirmClickBlock = () => {
        props.removeContainer(props.data.id)
    }
    const handleConfirmClickItem = (index) => { 
        const newRows = rows.slice()
        newRows.splice(index, 1) 
 
        setRows(newRows)
        setIsDisableBtn(false);
    }

    return (
        <div className={classes.containerWrapper}>
            <Confirm
                isVariable={false}
                show={isVisibleConfirmBlock}
                setShow={setIsVisibleConfirmBlock} 
                title={'Remove table?'}
                text={"You can't cancel this action."}
                removeText={"remove"}
                handleRemoveClick={handleConfirmClickBlock}
            />
            <Confirm
                isVariable={true}
                show={isVisibleConfirmItem}
                setShow={setIsVisibleConfirmItem} 
                title={'Delete row?'}
                text={"You can't cancel this action."}
                removeText={"delete"}
                handleRemoveClick={handleConfirmClickItem}
            />

            <Tooltip  title={`Table margin top`}  placement={'top'}>
                <div className={classes.mtView}></div>
            </Tooltip>
            <Tooltip  title={`Table margin bottom`}  placement={'top'}>
                <div className={classes.mbView}></div>
            </Tooltip>
            <Box style={{
                position: 'relative'
            }}>
                <Box className={classes.btnDrawerStyle}>
                    <Box display="flex" flexDirection="column">
                        <Box mb={1}>
                            <Tooltip title='Table Settings' placement='right'>
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
                                    onClick={removeTable}
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
                        onClose={handleClose}
                    >
                        <DialogContent classes={{root: classes.dialogContentUnstyle}} >
                            <Draggable
                                handle="#draggable-dialog-title"
                                cancel={'[class*="MuiDialogContent-root"]'}>
                                <div className={classes.menu}>
                                    <Typography
                                        component='p'
                                        className={classes.menuTitle}
                                        id="draggable-dialog-title">
                                        { !isDisableBtn && "Close to save - " }Settings Table
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
                                                direction='row'
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
                                                direction='row'
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
                                                        MarginBottom: <b>{mobileMarginBottomComputed}</b> ;  
                                                    </p>        
                                                </Box>
                                            </Box>
                                        </Tooltip>
                                    </Box>

                                    <Box mt={2}>
                                        <InputChange
                                            id={null}
                                            fullWidth={true}
                                            type='text'
                                            size="medium" 
                                            label='Main Heading'
                                            variant='outlined'
                                            value={heading}
                                            setValue={setHeading}
                                            setIsDisableBtn={setIsDisableBtn}
                                            direction='row'
                                        />  
                                    </Box>
                                    
                                    <Box mt={3} mb={1} className={classes.tableSizeContainer}>   
                                        <SelectHeadingVariant
                                            variant={'filled'} 
                                            size="small"  
                                            fullWidth={false} 
                                            label="Main Heading Variant" 
                                            value={variant} 
                                            setValue={setVariant} 
                                            setIsDisableBtn={setIsDisableBtn}
                                        />
                                        <Button 
                                            className={classes.tableSizeBtn}
                                            size={'medium'}
                                            startIcon={<InfoOutlined/>}
                                            onClick={() => {setIsTableSizeVisible(!isTableSizeVisible)}}
                                        >
                                            {isTableSizeVisible ? 'Hide' : 'Show' } variants info
                                        </Button> 
                                    </Box>
                                    {
                                        isTableSizeVisible && 
                                        <Box className={classes.tableSizeAbsolute}>
                                            <TableFontSizeInfo activeRow={variant} /> 
                                        </Box>
                                    }


                                    <Box my={2} display={'flex'}>
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
                                                <Box flexGrow={1}> 
                                                    <InputChange
                                                        id={null} 
                                                        fullWidth={true}
                                                        type='text'
                                                        size="small" 
                                                        label="Text for Button"
                                                        variant='outlined'
                                                        value={textButton}
                                                        setValue={setTextButton}
                                                        setIsDisableBtn={setIsDisableBtn} 
                                                    />    
                                                </Box>
                                            }
                                    </Box>

                                    <Box my={3} display='flex' alignItems='center'>
                                        <Box mr={1}> 
                                            <Tooltip  title="The table will scroll horizontally with a smaller width" >
                                                <IconButton className={classes.warningBtn} >
                                                    <InfoOutlined/>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        <InputChange
                                            id={null} 
                                            fullWidth={true}
                                            type='number'
                                            size="small" 
                                            label="Table Min Width"
                                            variant='outlined'
                                            value={tableMinWidth}
                                            setValue={setTableMinWidth}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        />    
                                    </Box>

                                    <Typography variant='h6' gutterBottom>
                                        Table Head row
                                    </Typography>

                                    <Box display='flex' mt={1} mb={3}> 
                                        {
                                            tableRow.map( (item, index) => {
                                                return (
                                                    <Box key={index} mr={1} flexGrow={1} >
                                                        <InputChange
                                                            id={index} 
                                                            fullWidth={true}
                                                            type='text'
                                                            size="small" 
                                                            label={`Table Head Row ${index + 1}`}
                                                            variant='outlined'
                                                            value={item}
                                                            setValue={handleTableHeadChange}
                                                            setIsDisableBtn={setIsDisableBtn} 
                                                        />  
                                                    </Box>
                                                )
                                            })
                                        } 
                                    </Box>

                                    <Divider style={{margin: "12px 0"}}/>

                                    <Typography variant='h6' gutterBottom>
                                        Table Rows
                                    </Typography>

                                    <Box mt={1} mb={1}> 
                                        
                                        {
                                            rows.map( (item, index) => {
                                                return (
                                                    <Box key={index} my={2} display='flex' alignItems='center' >
                                                        <Box mr={1} display='flex' alignItems='center'>
  
                                                            <ButtonGroup 
                                                                color="primary"
                                                                aria-label="contained primary button group"
                                                                variant="contained" 
                                                            >  
                                                                {
                                                                    index !== 0 &&
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
                                                                    rows.length - 1 !== index && 
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
                                                                <Tooltip title='Delete Row' placement='top'>
                                                                    <Button
                                                                        variant='contained'
                                                                        color="secondary"
                                                                        disableElevation={true}
                                                                        className={classes.deletePageBtn}
                                                                        onClick={() => { removeItem(index) }}
                                                                    > 
                                                                        <DeleteOutline style={{ color: '#fff' }} fontSize='small'/>
                                                                    </Button>
                                                                </Tooltip>  
                                                            </ButtonGroup>
                                                        </Box>

                                                        <InputChange
                                                            id={index}
                                                            fullWidth={true}
                                                            type='text'
                                                            size="small" 
                                                            label={`Table Row Name ${index + 1}`}
                                                            variant='outlined'
                                                            value={item.name}
                                                            setValue={handleRowChangeName}
                                                            setIsDisableBtn={setIsDisableBtn} 
                                                        />  
                                                        <Box mr={1} />
                                                        <InputChange
                                                            id={index}
                                                            fullWidth={false}
                                                            type='text'
                                                            size="small" 
                                                            label={`Table Row Price ${index + 1}`}
                                                            variant='outlined'
                                                            value={item.price}
                                                            setValue={handleRowChangePrice}
                                                            setIsDisableBtn={setIsDisableBtn} 
                                                        />  
                                                        {/* <ChangeItem handleRowChange={handleRowChange} item={item} index={index} /> */}

                                                    </Box>
                                                )
                                            })
                                        } 
                                    </Box>
                                    
                                    <AddItem addItem={addRow} />
                                     

                                    <Divider style={{margin: "12px 0"}}/>

                                    <Box display='flex' mt={3} mb={3}> 
                                        <ColorSelecter
                                            label={'Color for Table'}
                                            colorSelect={colorSelect} 
                                            setColorSelect={setColorSelect}
                                            colorCustom={colorCustom}
                                            setColorCustom={setColorCustom}
                                            setIsDisableBtn={setIsDisableBtn} 
                                            position="right"
                                            noInherit={true}
                                        /> 
                                    </Box>

                                    <Box mt={3} mb={3}>
                                        <Box mr={1} display='inline-block'>
                                            <InputChange
                                                id={null}  
                                                type='number'
                                                size="small" 
                                                label={`Quantity to show`}
                                                variant='outlined'
                                                value={visibleRows}
                                                setValue={setVisibleRows}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            />   
                                        </Box>
                                        <Box mr={1} display='inline-block'>
                                            <InputChange
                                                id={null}  
                                                type='text'
                                                size="small" 
                                                label={`Text for botton`}
                                                variant='outlined'
                                                value={visibleBottonText}
                                                setValue={setVisibleBottonText}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box>
                                        <InputChange
                                            id={null}  
                                            type='text'
                                            size="small" 
                                            label={`Text for botton clicked`}
                                            variant='outlined'
                                            value={visibleBottonTextClick}
                                            setValue={setVisibleBottonTextClick}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        /> 
                                        
                                    </Box>
                                                
                                    <Box mt={5} />
 
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
