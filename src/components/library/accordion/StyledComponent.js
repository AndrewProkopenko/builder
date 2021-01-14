import React from 'react' 

import StylesChangers from '../../../styles/changers'  

import Draggable from 'react-draggable';  
import {ColorPicker} from '../colorPicker/ColorPicker'

import { 
    MenuItem,Button, Box, Tooltip, TextField, FormControl, InputLabel,
    Select, Typography, ButtonGroup, makeStyles, Modal, DialogContent, Divider
} from '@material-ui/core'

import OpenWithIcon from '@material-ui/icons/OpenWith';

import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'; 
import { DeleteOutline } from '@material-ui/icons'; 

import DumbComponent from "./DumbComponent"

function StyledComponent(props) {

        
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 
    const [open, setOpen] = React.useState(false)

    const [items, setItems] = React.useState(props.data.items)   
    const [heading, setHeading] = React.useState(props.data.heading)   

    const [colorSelect, setColorSelect] = React.useState(props.data.color)
    const [colorCustom, setColorCustom] = React.useState(props.data.color)
 
 
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
                left: 50,
                maxWidth: '100% ',
                width: 'calc( 100% - 100px )',
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
        newData.items = items
        

        if(colorSelect === 'custom') {
            newData.color = colorCustom
        } else {
            newData.color = colorSelect
        }
   
        props.reSaveItem(props.data.id, newData) 
        handleClose()
    }
    const removeAccordion = () => {
        const conf = window.confirm('Delete? ')
        if(conf) props.removeContainer(props.data.id)
    }

    const handleUpdateItem = (index, value, place) => { 
        const newItems = items.slice()
        newItems[index][place] = value

        setItems(newItems)
        setIsDisableBtn(false); 
    } 
    const swapItem = (direction, index) => { 
        const newItems = items.slice()
        let activeIndex   
    
        newItems.map( (item) => { 
        if(newItems.indexOf(item) === index) {
            activeIndex = index
        }
        return 0 
        }) 
 
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
        setIsDisableBtn(false); 
    }
    const addItem = () => {
        const newItems = items.slice()
        const itemLayout = {
            head: "heading",
            body: "body"
        }
        newItems.push(itemLayout)

        setItems(newItems)
        setIsDisableBtn(false); 
    }
    const removeItem = (index) => { 
        const newItems = items.slice()
        newItems.splice(index, 1) 
 
        setItems(newItems)
        setIsDisableBtn(false); 
    }

    return (
        <div className={classes.containerWrapper}>
            <Box style={{position: 'relative'}} >  
                <Box className={classes.btnDrawerStyle}> 
                    <Box display="flex" flexDirection="column"> 
                        <Box mb={1}>
                            <Tooltip title='Accordion Settings' placement='right'>
                                <Button  
                                    onClick={handleOpen} 
                                    size='medium'
                                    variant='contained' 
                                    className={classes.btnDrawerItem}
                                >   
                                    <SettingsIcon style={{ color: '#fff' }} fontSize='small'/>
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
                                        onClick={() => { props.swapContainer('up', props.data.id) }}
                                        size='medium'
                                        variant='contained' 
                                        className={classes.btnDrawerItem}
                                    >  
                                        <ExpandLessOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>   
                                    </Button>
                                </Tooltip>
                            }
                            {
                                !props.isLast &&
                                <Tooltip title='Get Down' placement='right'>
                                    <Button   
                                        onClick={() => { props.swapContainer('down', props.data.id) }}
                                        size='medium'
                                        variant='contained' 
                                        className={classes.btnDrawerItem}
                                    >     
                                        <ExpandMoreOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>
                                    </Button>
                                </Tooltip> 
                            }
                            
                        </ButtonGroup>
                        
                        <Box mt={1}>
                            <Tooltip title='Remove' placement='right'>
                                <Button   
                                    onClick={removeAccordion}
                                    size='medium'
                                    variant='contained' 
                                    className={classes.btnDrawerItem}
                                >     
                                    <DeleteOutline style={{ color: '#fff' }} fontSize='small'/>
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
                            <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                                <div className={classes.menu}>
                                    <Typography 
                                        component='p' 
                                        className={classes.menuTitle}
                                        id="draggable-dialog-title"
                                    >
                                        Настройки аккордиона  <OpenWithIcon/>
                                    </Typography> 
                                    <Box mt={2}>  
                                        <TextField  
                                            fullWidth
                                            type='text'
                                            label="Main Heading" 
                                            variant="outlined"  
                                            value={heading}
                                            onChange={ (e) => { setIsDisableBtn(false); setHeading(e.target.value) } }     
                                        />
                                    </Box> 
                                    <Box mt={2}>  
                                        <Typography variant='h6'>
                                            Items: 
                                        </Typography>
                                        <Divider/>

                                        {
                                            items.map( (item, index) => { 
                                                return(
                                                    <Box key={index} mt={3}>
                                                        <Box display='flex' alignItems='center'>
                                                            <Box component='p' mr={2}>
                                                                Item № {index + 1}
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
                                                                    items.length - 1 !== index && 
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


                                                        <Box mt={1}>
                                                            <TextField  
                                                                fullWidth
                                                                type='text'
                                                                label="Head" 
                                                                variant="outlined"  
                                                                value={item.head}
                                                                onChange={ (e) => {  handleUpdateItem(index, e.target.value, 'head') } }     
                                                            /> 
                                                        </Box>
                                                        
                                                        <Box mt={1}>
                                                            <TextField  
                                                                fullWidth
                                                                type='text'
                                                                label="Body" 
                                                                variant="outlined"  
                                                                value={item.body}
                                                                onChange={ (e) => {  handleUpdateItem(index, e.target.value, 'body') } }     
                                                            />
                                                        </Box>
                                                    </Box>
                                                )
                                            })
                                        }

                                        <Box my={2}>
                                            <Button 
                                                variant='contained' 
                                                color='primary'
                                                onClick={addItem}
                                            >
                                                Add item
                                            </Button>
                                        </Box>
                                         
                                        <Divider/>
                                    </Box> 

                                    <Box mt={2} display="flex" >
                                        <FormControl variant='filled' style={{minWidth: '250px' }}>
                                            <InputLabel id="color-select-label">Color for Form and SubHeading</InputLabel>
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
                                                    position = {'right'}
                                                />   
                                            }
                                            
                                        </Box>
                                    </Box>

                                    <Box className={classes.btnSave}>
                                        <Button
                                            disabled={isDisableBtn}
                                        
                                            variant="contained"
                                            color="primary"
                                            size={'medium'} 
                                            onClick={handleSave}
                                        >
                                            Save
                                        </Button> 
                                    </Box>
                                    
                                    
                                </div>
                            </Draggable>
                        </DialogContent> 
                    </Modal>  
                </Box>
            </Box>
            <DumbComponent data={props.data} />
        </div>
    )
}

export default StyledComponent
