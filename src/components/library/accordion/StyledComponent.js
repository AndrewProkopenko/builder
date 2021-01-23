import React from 'react' 

import StylesChangers from '../../../styles/changers'  
import StyledInputs from '../../../styles/inputs'   

import Draggable from 'react-draggable';  
import ColorSelecter from '../colorPicker/ColorSelecter'

import { 
    MenuItem,Button, Box, Tooltip, TextField, FormControl, InputLabel,
    Select, Typography, ButtonGroup, makeStyles, Modal, DialogContent, Divider
} from '@material-ui/core'

import OpenWithIcon from '@material-ui/icons/OpenWith';

import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'; 
import { DeleteOutline } from '@material-ui/icons'; 
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
 
import DumbComponent from "./DumbComponent"
import AddItem from "./AddItem"
import ChangeItem from "./ChangeItem"

function StyledComponent(props) {

        
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 
    const [open, setOpen] = React.useState(false)

    const [items, setItems] = React.useState(props.data.items)   
    const [heading, setHeading] = React.useState(props.data.heading)   

    const [colorSelect, setColorSelect] = React.useState(props.data.color)
    const [colorCustom, setColorCustom] = React.useState(props.data.color)

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

        const { menu, menuTitle, btnSetting, btnSave, btnDrawerStyle, btnDrawerItem, 
            containerWrapper, responseValues ,responseMobile , mobileTooltip 
        } = commonClasses 
        
        const { mtView, mbView } = commonStyle 
        return ({
            btnDrawerStyle: btnDrawerStyle,
            btnDrawerItem: btnDrawerItem,
            containerWrapper: {
                ...containerWrapper, ...{
               '&:hover' : {
                    zIndex: 25,
                   outlineColor: `${theme.palette.error.main}`,
                   '& $mtView' : { 
                       opacity: 1
                   },
                   '& $mbView' : { 
                       opacity: 1
                   } ,
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
            }, 
        })
    })
    
    const classes = useStyles();
 
    const handleSave = () => {
        const newData = Object.assign({}, props.data) 
 
        newData.heading = heading
        newData.items = items
        newData.marginTop = marginTop
        newData.marginBottom = marginBottom
        newData.maxWidthContainer = maxWidthContainer

        if(colorSelect === 'custom') {
            newData.color = colorCustom
        } else {
            newData.color = colorSelect
        }
   
        props.reSaveItem(props.data.id, newData) 
        handleClose()
        setIsDisableBtn(true)
    }
    const removeAccordion = () => {
        const conf = window.confirm('Delete? ')
        if(conf) props.removeContainer(props.data.id)
    }

    const handleUpdateItem = (index, head, body) => { 
        const newItems = items.slice()
        newItems[index].head = head
        newItems[index].body = body

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
    const addItem = (head, body) => {
        const newItems = items.slice()
        const itemLayout = {
            head: head,
            body: body
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
            <Tooltip  title={`accordion margin top`}  placement={'top'}>
                <div className={classes.mtView}></div>
            </Tooltip>
            <Tooltip  title={`accordion margin bottom`}  placement={'top'}>
                <div className={classes.mbView}></div>
            </Tooltip>
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
                                        Accordion Settings <OpenWithIcon/>
                                    </Typography> 

                                    <Box>
                                        <Typography variant='h6' gutterBottom>
                                            Styles
                                        </Typography>
                                        <Box mr={1} display='inline-block' >
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
                                        <Box mr={1} display='inline-block' >
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
                                                        MarginBottom: <b>{ mobileMarginBottomComputed}</b> ; 
                                                        FontSize Heading: <b>25</b> 
                                                    </p>        
                                                </Box>
                                            </Box>
                                        </Tooltip>
                                    </Box>

                                    <Box mt={2}>  
                                        <Typography variant='h6' gutterBottom>
                                            Texts
                                        </Typography>
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
                                                    <Box key={index} mt={2}>
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

                                                        <ChangeItem index={index} item={item} handleUpdateItem={handleUpdateItem} /> 
                                                        
                                                    </Box>
                                                )
                                            })
                                        }

                                        <AddItem addItem={addItem} />
                                         
                                        <Divider/>
                                    </Box> 

                                    <Box mt={2} display="flex" >
                                        <ColorSelecter
                                            label={'Color for Accordion'}
                                            colorSelect={colorSelect} 
                                            setColorSelect={setColorSelect}
                                            colorCustom={colorCustom}
                                            setColorCustom={setColorCustom}
                                            setIsDisableBtn={setIsDisableBtn} 
                                            position = {'right'}
                                            noInherit={false}
                                        />
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
