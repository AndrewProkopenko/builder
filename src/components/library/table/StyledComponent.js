import React from 'react'

import StylesChangers from '../../../styles/changers'  
 
import Draggable from 'react-draggable';
import {ColorPicker} from '../colorPicker/ColorPicker'

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

import DumbComponent from "./DumbComponent"

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

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
     
    React.useEffect(() => {
        if(props.data.color !== 'primary' && props.data.color !== 'secondary' ) {  
            setColorSelect('custom')
        }
    }, [props.data.color])  

    const useStyles = makeStyles((theme) => {
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle, btnSetting, btnSave, btnDrawerStyle, btnDrawerItem, containerWrapper } = commonClasses 
        return ({
            btnDrawerStyle: btnDrawerStyle,
            btnDrawerItem: btnDrawerItem,
            containerWrapper: containerWrapper,
            menu: {...menu, ...{
                left: 'calc( 50% - 400px )',
                maxWidth: 800,
                width: '100%',
            }}, 
            menuTitle: menuTitle,
            btnSetting: btnSetting,  
            btnSave: btnSave,
             
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
        

        if (colorSelect === 'custom') {
            newData.color = colorCustom
        } else {
            newData.color = colorSelect
        }

        props.reSaveItem(props.data.id, newData)
        handleClose()
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
    const handleRowChange = (index, place, value) => {
        const newRows = rows.slice()
        newRows[index][place] = value

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
    const addRow = () => {
        const newRows = rows.slice()
        const rowLayout = {
            name: "Table Row", 
            price: 100 
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
                                    <Box mt={2}>
                                        <TextField
                                            fullWidth
                                            type='text'
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
                                            multiline
                                            fullWidth
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

                                                            <Box mr={0.5}>
                                                                <Typography variant='caption'>
                                                                    Row {index + 1}
                                                                </Typography>
                                                            </Box>

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
                                                        <Box mr={1} flexGrow={1}>
                                                            <TextField 
                                                                fullWidth
                                                                type='text'
                                                                label={`Table Row Name ${index + 1}`}
                                                                variant="outlined"
                                                                value={item.name}
                                                                onChange={(e) => {
                                                                    setIsDisableBtn(false);
                                                                    handleRowChange(index, 'name', e.target.value)
                                                                }}
                                                            />
                                                        </Box>
                                                        <Box >
                                                            <TextField 
                                                                fullWidth
                                                                type='text'
                                                                label={`Table Row Price ${index + 1}`}
                                                                variant="outlined"
                                                                value={item.price}
                                                                onChange={(e) => {
                                                                    setIsDisableBtn(false);
                                                                    handleRowChange(index, 'price', e.target.value)
                                                                }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                )
                                            })
                                        } 
                                    </Box>

                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={addRow}
                                    >
                                        Add Row
                                    </Button>

                                    <Divider style={{margin: "12px 0"}}/>

                                    <Box display='flex' mt={3} mb={3}> 
                                        <Box  display="flex" >
                                            <FormControl variant='filled' style={{minWidth: '250px' }}>
                                                <InputLabel id="color-select-label">Color for Table</InputLabel>
                                                <Select
                                                    labelId="color-select-label"
                                                    id="color-select"
                                                    value={colorSelect}
                                                    onChange={(e) => {setIsDisableBtn(false); setColorSelect(e.target.value)   }}
                                                >
                                                    <MenuItem value={'primary'}>Primary</MenuItem>
                                                    <MenuItem value={'secondary'}>Secondary</MenuItem>
                                                    <MenuItem value={'custom'}>Custom</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Box ml={1} >
                                                {
                                                    colorSelect === 'custom' &&
                                                    <ColorPicker
                                                        initialColor = {colorCustom}
                                                        changeColor = {setColorCustom}
                                                        setIsDisableBtn = {setIsDisableBtn}
                                                        noInherit={true}
                                                        position = {'right'}
                                                    />  
                                                }
                                                
                                            </Box>
                                        </Box>  
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
