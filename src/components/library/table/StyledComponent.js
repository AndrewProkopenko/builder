import React from 'react'

import StylesChangers from '../../../styles/changers'  
import StyledInputs from '../../../styles/inputs'    
 
import Draggable from 'react-draggable';
import ColorSelecter from '../colorPicker/ColorSelecter'

import {
    Select, 
    FormControl,  
    MenuItem, 
    InputLabel, 
    Button,
    Box,
    Tooltip,
    TextField, 
    Typography,
    ButtonGroup,
    makeStyles,
    Modal,
    DialogContent,
    Divider,  
} from '@material-ui/core'

import OpenWithIcon from '@material-ui/icons/OpenWith';

import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import {DeleteOutline} from '@material-ui/icons';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

import DumbComponent from "./DumbComponent"
import AddItem from "./AddItem"
import ChangeItem from "./ChangeItem"

function StyledComponent(props) {

    const [isDisableBtn, setIsDisableBtn] = React.useState(true)
    const [open, setOpen] = React.useState(false)

    const [heading, setHeading] = React.useState(props.data.heading)  
 
    const [textButton,  setTextButton] = React.useState(props.data.buttonText || '') 

    const [colorSelect,  setColorSelect] = React.useState(props.data.color || '')
    const [colorCustom, setColorCustom] = React.useState(props.data.color || '')
    const [rows, setRows] = React.useState(props.data.rows)
    const [tableRow, setTableRow] = React.useState(props.data.tableRow)

    const [visibleRows, setVisibleRows] = React.useState(props.data.visibleRows || 5)
    const [visibleBottonText, setVisibleBottonText] = React.useState(props.data.visibleBottonText || 'Show all')
    const [visibleBottonTextClick, setVisibleBottonTextClick] = React.useState(props.data.visibleBottonTextClick || 'Show less') 
    
    const [marginTop, setMarginTop] = React.useState(props.data.marginTop || 51)
    const [marginBottom, setMarginBottom] = React.useState(props.data.marginBottom || 51)
    const [maxWidthContainer, setMaxWidthContainer] = React.useState(props.data.maxWidthContainer || 'lg') 
    
    const mobileMarginTopComputed = marginTop === 0 ? 0 : (marginTop > 50 ? marginTop*0.6 : 30)
    const mobileMarginBottomComputed = marginBottom === 0 ? 0 : (marginBottom > 50 ? marginBottom*0.6 : 30)

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
     
    React.useEffect(() => {
        if(
            props.data.color !== 'primary' && 
            props.data.color !== 'secondary' &&
            props.data.color !== 'warning' &&
            props.data.color !== 'error' &&
            props.data.color !== 'info' &&
            props.data.color !== 'success' 
        ) {  
            setColorSelect('custom')
        }
    }, [props.data.color])  

    const useStyles = makeStyles((theme) => {
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle, btnSetting, btnSave, btnDrawerStyle, btnDrawerItem, containerWrapper ,
            responseValues ,responseMobile , mobileTooltip} = commonClasses 

        const { mtView, mbView } = commonStyle 
        return ({
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
            menuTitle: menuTitle,
            btnSetting: btnSetting,  
            btnSave: btnSave,

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
        newData.heading = heading 
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
        handleClose()
        setIsDisableBtn(true)
    }
    const removeTable = () => {
        const conf = window.confirm('Delete? ')
        if (conf) 
            props.removeContainer(props.data.id)
    }
    const handleTableHeadChange = (index, value) => {
        const newRow = tableRow.slice()
        newRow[index] = value
        setTableRow(newRow)
    }
    const handleRowChange = (index, name, price) => {
        const newRows = rows.slice()

        newRows[index].name = name
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
        const newRows = rows.slice()
        newRows.splice(index, 1) 
 
        setRows(newRows)
        setIsDisableBtn(false); 
    }
    

    return (
        <div className={classes.containerWrapper}>
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
                        <DialogContent>
                            <Draggable
                                handle="#draggable-dialog-title"
                                cancel={'[class*="MuiDialogContent-root"]'}>
                                <div className={classes.menu}>
                                    <Typography
                                        component='p'
                                        className={classes.menuTitle}
                                        id="draggable-dialog-title">
                                        Settings Table
                                        <OpenWithIcon/>
                                    </Typography>

                                    <Box>
                                        <Typography variant='h6' gutterBottom>
                                            Styles
                                        </Typography>
                                        <Box mr={1} mb={2} display='inline-block' >
                                            <TextField 
                                                type='number'
                                                size='small'
                                                label="Margin Top"
                                                variant="outlined"
                                                value={marginTop}
                                                onChange={(e) => {
                                                    setIsDisableBtn(false);
                                                    setMarginTop(Number(e.target.value))
                                            }}/>
                                        </Box>
                                        <Box mr={1} mb={2} display='inline-block' >
                                            <TextField 
                                                type='number'
                                                size='small'
                                                label="Margin Bottom"
                                                variant="outlined"
                                                value={marginBottom}
                                                onChange={(e) => {
                                                    setIsDisableBtn(false);
                                                    setMarginBottom(Number(e.target.value))
                                            }}/>
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
                                        
                                        <Tooltip classes={{tooltip: classes.mobileTooltip}} title='Calculated styles for Mobile (>600px)' placement={'top'}>
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
                                        <TextField
                                            fullWidth
                                            type='text'
                                            size='small'
                                            label="Main Heading"
                                            variant="outlined"
                                            value={heading}
                                            onChange={(e) => {
                                            setIsDisableBtn(false);
                                            setHeading(e.target.value)
                                        }}/>
                                    </Box>

                                    <Box mt={3} mb={3}>
                                        <TextField 
                                            fullWidth
                                            size='small'
                                            type='text'
                                            label="Text Button"
                                            variant="outlined"
                                            value={textButton}
                                            onChange={(e) => {
                                            setIsDisableBtn(false);
                                            setTextButton(e.target.value)
                                        }}/>
                                    </Box>

                                    <Typography variant='h6' gutterBottom>
                                        Table Head row
                                    </Typography>

                                    <Box display='flex' mt={1} mb={3}> 
                                        {
                                            tableRow.map( (item, index) => {
                                                return (
                                                    <Box key={index} mr={1} flexGrow={1} >
                                                        <TextField 
                                                            fullWidth
                                                            type='text'
                                                            size='small'
                                                            label={`Table Head Row ${index + 1}`}
                                                            variant="outlined"
                                                            value={item}
                                                            onChange={(e) => {
                                                            setIsDisableBtn(false);
                                                            handleTableHeadChange(index, e.target.value)
                                                        }}/>
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
                                                                <Tooltip title='Delete Page' placement='top'>
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
                                                                
                                                        <ChangeItem handleRowChange={handleRowChange} item={item} index={index} />

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
                                            <TextField  
                                                type='number'
                                                label={`Quantity to show`}
                                                variant="outlined"
                                                value={visibleRows}
                                                onChange={(e) => {
                                                    setIsDisableBtn(false);
                                                    setVisibleRows(Number(e.target.value))
                                                }}
                                            />
                                        </Box>
                                        <Box mr={1} display='inline-block'>
                                            <TextField  
                                                type='text'
                                                label={`Text for botton`}
                                                variant="outlined"
                                                value={visibleBottonText}
                                                onChange={(e) => {
                                                    setIsDisableBtn(false);
                                                    setVisibleBottonText(e.target.value)
                                                }}
                                            />
                                        </Box>
                                        <TextField  
                                            type='text'
                                            label={`Text for botton clicked`}
                                            variant="outlined"
                                            value={visibleBottonTextClick}
                                            onChange={(e) => {
                                                setIsDisableBtn(false);
                                                setVisibleBottonTextClick(e.target.value)
                                            }}
                                        />
                                    </Box>
                                                
                                    

                                    <Box className={classes.btnSave}>
                                        <Button
                                            disabled={isDisableBtn}
                                            variant="contained"
                                            color="primary"
                                            size={'medium'}
                                            onClick={handleSave}>
                                            Save
                                        </Button>
                                    </Box>
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
