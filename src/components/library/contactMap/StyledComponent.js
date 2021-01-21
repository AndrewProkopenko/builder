import React from 'react'
import StylesChangers from '../../../styles/changers'   
import StyledInputs from '../../../styles/inputs'    
 
import {ColorPicker} from '../colorPicker/ColorPicker'
import Draggable from 'react-draggable';  
 
import { 
    Button, Box, Tooltip, TextField, Typography, 
    ButtonGroup, makeStyles, Modal, DialogContent, Switch, 
    FormControlLabel, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core'

import OpenWithIcon from '@material-ui/icons/OpenWith';

import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'; 
import { DeleteOutline } from '@material-ui/icons';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

import DumbComponent from "./DumbComponent"

function StyledComponent(props) {
 
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 
    const [open, setOpen] = React.useState(false)

    const [location, setLocation] = React.useState(props.data.location)
    const [phone, setPhone] = React.useState(props.data.phone)
    const [paragraph, setParagraph] = React.useState(props.data.paragraph || '')
    const [inputName, setInputName] = React.useState(props.data.inputName || '')
    const [inputPhone, setInputPhone] = React.useState(props.data.inputPhone || '')
    const [inputComment, setInputComment] = React.useState(props.data.inputComment || '')
    const [buttonText, setButtonText] = React.useState(props.data.buttonText || '')
    const [policy, setPolicy] = React.useState(props.data.policy || '')

    const [mapFrame, setMapFrame] = React.useState(props.data.mapFrame) 
    
    const [isButton, setIsButton] = React.useState(props.data.mapFrame === null ? false : true)
    
    const [colorSelect,  setColorSelect] = React.useState(props.data.color || 'primary')
    const [colorCustom, setColorCustom] = React.useState(props.data.color || 'primary')

    const [marginTop, setMarginTop] = React.useState(props.data.marginTop || 50)
    const [marginBottom, setMarginBottom] = React.useState(props.data.marginBottom || 0)
    const [maxWidthContainer, setMaxWidthContainer] = React.useState(props.data.maxWidthContainer || 'lg') 
 
    const mobileMarginTopComputed = marginTop === 0 ? 0 : (marginTop > 50 ? marginTop*0.6 : 30)
    const mobileMarginBottomComputed = marginBottom === 0 ? 0 : (marginBottom > 50 ? marginBottom*0.6 : 30)
     
    React.useEffect(() => {
        if(props.data.color !== 'primary' && props.data.color !== 'secondary' ) {  
            setColorSelect('custom')
        }  
    }, [props.data.color])

    
    const handleOpen = () => {  
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = () => {
        setIsButton(!isButton)
        setIsDisableBtn(false)
    }

    const useStyles = makeStyles((theme) => {
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle, btnSetting, btnSave, btnDrawerStyle, btnDrawerItem, containerWrapper, 
            responseValues ,responseMobile , mobileTooltip } = commonClasses 
        
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
                left: 'calc( 50% - 300px )',
                maxWidth: 600,
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
        newData.location = location
        newData.phone = phone 
        newData.paragraph = paragraph 
        newData.inputName = inputName 
        newData.inputPhone = inputPhone 
        newData.inputComment = inputComment 
        newData.buttonText = buttonText 
        newData.policy = policy 
        newData.mapFrame = !isButton ? null : mapFrame 
        
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
    }
    const removeItem = () => {
        const conf = window.confirm('Delete? ')
        if(conf) props.removeContainer(props.data.id)
    }

    return (
        <div className={classes.containerWrapper}>
            <Tooltip  title={`Contact Map margin top`}  placement={'top'}>
                <div className={classes.mtView}></div>
            </Tooltip>
            <Tooltip  title={`Contact Map margin bottom`}  placement={'top'}>
                <div className={classes.mbView}></div>
            </Tooltip>

            <Box style={{position: 'relative'}} >  
                <Box className={classes.btnDrawerStyle}> 
                    <Box display="flex" flexDirection="column"> 
                        <Box mb={1}>
                            <Tooltip title='Contacts Map Settings' placement='right'>
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
                                    onClick={removeItem}
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
                                        Contacts Map Settings  <OpenWithIcon/>
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
                                                        MarginBottom: <b>{ mobileMarginBottomComputed}</b> ; 
                                                         
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
                                            label="Location" 
                                            size='small'
                                            variant="outlined"  
                                            value={location}
                                            onChange={ (e) => { setIsDisableBtn(false); setLocation(e.target.value) } }     
                                        />
                                    </Box>  
                                    <Box mt={2} >   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Phone" 
                                            size='small'
                                            variant="outlined"  
                                            value={phone}
                                            onChange={ (e) => { setIsDisableBtn(false);  setPhone(e.target.value)  } }     
                                        />
                                    </Box> 
                                    <Box mt={2} >   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Paragraph" 
                                            size='small'
                                            variant="outlined"  
                                            value={paragraph}
                                            onChange={ (e) => { setIsDisableBtn(false);  setParagraph(e.target.value)  } } 
                                              
                                        />
                                    </Box> 
                                    <Box mt={2} >   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Input Name Placeholder" 
                                            size='small'
                                            variant="outlined"      
                                            value={inputName}
                                            onChange={ (e) => { setIsDisableBtn(false);  setInputName(e.target.value)  } }   
                                        />
                                    </Box> 
                                    <Box mt={2} >   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Input Phone Placeholder" 
                                            size='small'
                                            variant="outlined"  
                                            value={inputPhone}
                                            onChange={ (e) => { setIsDisableBtn(false);  setInputPhone(e.target.value)  } }     
                                        />
                                    </Box> 
                                    <Box mt={2} >   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Input Comment Placeholder" 
                                            size='small'
                                            variant="outlined" 
                                            value={inputComment}
                                            onChange={ (e) => { setIsDisableBtn(false);  setInputComment(e.target.value)  } }     
                                        />
                                    </Box> 
                                    <Box mt={2} >   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Button Text" 
                                            size='small'
                                            variant="outlined"  
                                            value={buttonText}
                                            onChange={ (e) => { setIsDisableBtn(false);  setButtonText(e.target.value)  } }     
                                        />
                                    </Box> 
                                    <Box mt={2} >   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Policy Text" 
                                            size='small'
                                            variant="outlined"  
                                            value={policy}
                                            onChange={ (e) => { setIsDisableBtn(false);  setPolicy(e.target.value)  } }     
                                        />
                                    </Box> 
                                    <Box   mt={2} mb={2}>
                                        <FormControlLabel
                                            control={
                                                < Switch checked = { isButton }
                                                        onChange = { handleChange }
                                                            name = "checkedB" 
                                                            color = "primary" />
                                            }
                                            label="Add Map Frame"/> 
                                            {
                                                isButton ?   
                                                <Box mt={2} mb={2}>   
                                                    <TextField  
                                                        multiline
                                                        fullWidth
                                                        type='text'
                                                        label="Map Frame" 
                                                        variant="outlined"  
                                                        value={mapFrame}
                                                        onChange={ (e) => { setIsDisableBtn(false);  setMapFrame(e.target.value)  } }     
                                                    />
                                                </Box>  
                                                :
                                                <Typography color='secondary'>
                                                    If <b>Map Frame</b> is null layout have another view!
                                                </Typography>
                                            }
                                    </Box>
                                    <Box mt={2} display="flex" >
                                        <FormControl variant='filled' style={{minWidth: '250px' }}>
                                            <InputLabel id="color-select-label">Color for Button</InputLabel>
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
                                                    noInherit={true}
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
