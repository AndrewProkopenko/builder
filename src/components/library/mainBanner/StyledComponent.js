import React from 'react'
import firebase from "../../../firebase/firebase"

import StylesChangers from '../../../styles/changers'    
import StyledInputs from '../../../styles/inputs'    

import Draggable from 'react-draggable';  

import {ColorPicker} from '../colorPicker/ColorPicker'

import { 
    MenuItem,Button, Box, Tooltip, TextField, FormControl, InputLabel,
    Select, Typography, ButtonGroup, makeStyles, Modal, DialogContent
} from '@material-ui/core'

import OpenWithIcon from '@material-ui/icons/OpenWith';

import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'; 
import { DeleteOutline } from '@material-ui/icons';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import TabletMacIcon from '@material-ui/icons/TabletMac';

import DumbComponent from "./DumbComponent"

import ImageContext  from '../../../context/imageContext/ImageContext'

function StyledComponent(props) {

    const { removeImage } = React.useContext(ImageContext)
        
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 
    const [open, setOpen] = React.useState(false)

    const [heading, setHeading] = React.useState(props.data.heading)
    const [subHeading, setSubHeading] = React.useState(props.data.headingIcon.title)
    const [paragraph, setParagraph] = React.useState(props.data.paragraph)
    const [inputLabel, setInputLabel] = React.useState(props.data.form.inputLabel)
    const [buttonLabel, setButtonLabel] = React.useState(props.data.form.buttonLabel)
    const [policy, setPolicy] = React.useState(props.data.form.policy)

    const [colorSelect, setColorSelect] = React.useState(props.data.color)
    const [colorCustom, setColorCustom] = React.useState(props.data.color)

    const [imageUrl, setImageUrl] = React.useState(props.data.image)
    const [imageName, setImageName] = React.useState(props.data.imageName || '')

    const [iconUrl, setIconUrl] = React.useState(props.data.headingIcon.icon)
    const [iconName, setIconName] = React.useState(props.data.headingIcon.iconName || '')
 
    const [marginTop, setMarginTop] = React.useState(props.data.marginTop || 51)
    const [marginBottom, setMarginBottom] = React.useState(props.data.marginBottom || 51)
    const [maxWidthContainer, setMaxWidthContainer] = React.useState(props.data.maxWidthContainer || 'lg') 
    
    const mobileMarginTopComputed = marginTop === 0 ? 0 : (marginTop > 120 ? marginTop*0.25 : 40)
    const mobileMarginBottomComputed = marginBottom === 0 ? 0 : (marginBottom > 120 ? marginBottom*0.25 : 40)
    const tabletMarginTopComputed = marginTop === 0 ? 0 : (marginTop > 80 ? marginTop*0.8 : 50)
    const tabletMarginBottomComputed = marginBottom === 0 ? 0 : (marginBottom > 80 ? marginBottom*0.8 : 50)

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
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle, btnSetting, btnSave, btnDrawerStyle, btnDrawerItem, containerWrapper, btnWithLabel,  
            responseValues ,responseMobile , mobileTooltip, responseTablets, tabletTooltip } = commonClasses 
            
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
            btnWithLabel: btnWithLabel,

            responseValues: responseValues, 
            responseTablets: responseTablets,
            responseMobile: responseMobile,
            mobileTooltip: mobileTooltip,
            tabletTooltip: tabletTooltip, 

            mtView: { ...mtView, ...{
                    top: `-${marginTop}px`,  
                    height: `${marginTop}px`,
                    [theme.breakpoints.down('md')]: {
                        top: `-${tabletMarginTopComputed}px`,  
                        height: `${tabletMarginTopComputed}px`,
                    },
                    [theme.breakpoints.down('sm')]: {
                        top: `-${mobileMarginTopComputed}px `,  
                        height: `${mobileMarginTopComputed}px `,
                    }
                } 
            },
            mbView: { ...mbView, ...{
                    bottom: `-${marginBottom}px`,
                    height: `${marginBottom}px`,  
                    [theme.breakpoints.down('md')]: {
                        bottom: `-${tabletMarginBottomComputed}px`,  
                        height: `${tabletMarginBottomComputed}px`,
                    },
                    [theme.breakpoints.down('sm')]: {
                        bottom: `-${mobileMarginBottomComputed}px `,  
                        height: `${mobileMarginBottomComputed}px `,
                    }
                } 
            }
        })
    })
    
    const classes = useStyles();
 
    const handleImageUpload = async (e, imageType) => {  
        const imageData = e.target.files[0]
        const generateImageName = `${imageData.name}-${props.data.id}`

        if( imageType === 'mainImage')  { 
            removeImage(imageName)   
        }
        if( imageType === 'icon') {
            removeImage(iconName)   
        }
 
          
        const storageRef = await firebase.storage.ref(generateImageName).put(imageData)
        const downloadURL = await storageRef.ref.getDownloadURL();
 
        if( imageType === 'mainImage')  { 
            setImageName(generateImageName)
            setImageUrl(downloadURL)  
        }
        if( imageType === 'icon') {
            setIconName(generateImageName)
            setIconUrl(downloadURL)
        }
          
         
        setIsDisableBtn(false)
    }
    const handleSave = () => {
        const newData = Object.assign({}, props.data) 
        newData.heading = heading
        newData.paragraph = paragraph
        newData.headingIcon = {
            title: subHeading,
            icon : iconUrl,
            iconName : iconName
        }  
        newData.form = {
            inputLabel: inputLabel,
            buttonLabel: buttonLabel,
            policy: policy 
        }
        newData.image = imageUrl
        newData.imageName = imageName

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
    }
    const removeItem = () => {
        const conf = window.confirm('Delete? ')
        if(conf) { 
            removeImage(imageName) 
            removeImage(iconName) 
            props.removeContainer(props.data.id)
        }
    }

    return (
        <div className={classes.containerWrapper}>
            <Tooltip  title={`Main Banner margin top`}  placement={'top'}>
                <div className={classes.mtView}></div>
            </Tooltip>
            <Tooltip  title={`Main Banner margin bottom`}  placement={'top'}>
                <div className={classes.mbView}></div>
            </Tooltip>

            <Box style={{position: 'relative'}} >  
                <Box className={classes.btnDrawerStyle}> 
                    <Box display="flex" flexDirection="column"> 
                        <Box mb={1}>
                            <Tooltip title='Main Banner Settings' placement='right'>
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
                                        Main banner settings <OpenWithIcon/>
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
                                        <Tooltip classes={{tooltip: classes.tabletTooltip}} title='Calculated styles for Tablets (>960px)' placement={'top'}>
                                            <Box className={`${classes.responseValues} ${classes.responseTablets}`}>
                                                <TabletMacIcon/>
                                                <Box>   
                                                    <p> 
                                                        MarginTop: <b>{tabletMarginTopComputed}</b>; 
                                                        MarginBottom: <b>{tabletMarginBottomComputed}</b> 
                                                    </p>     
                                                </Box>
                                            </Box>
                                        </Tooltip>

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
                                    <Box display="flex" mt={3}>   
                                        <Box display="flex" mr={2} minWidth={150} >
                                            <Button color='primary' variant={'contained'} className={classes.btnWithLabel} > 
                                                <label htmlFor='imageIcon-input-label'> Set Icon </label>
                                                <input 
                                                    id="imageIcon-input-label"
                                                    type="file" 
                                                    onChange={(e) => { handleImageUpload(e, 'icon')}} 
                                                    style={{ display: "none" }}
                                                />
                                            </Button>
                                            {
                                                iconUrl &&
                                                <Box ml={1}>
                                                    <img src={iconUrl} alt='icon' width={35} />
                                                </Box>
                                            }
                                            
                                        </Box> 
                                        <TextField  
                                            fullWidth
                                            type='text'
                                            label="Sub Heading" 
                                            variant="outlined" 
                                            size='small'  
                                            value={subHeading}
                                            onChange={ (e) => { setIsDisableBtn(false); setSubHeading(e.target.value)  } }     
                                        />
                                    </Box> 
                                    <Box mt={3} mb={3}>   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Paragraph" 
                                            variant="outlined"  
                                            value={paragraph}
                                            onChange={ (e) => { setIsDisableBtn(false);  setParagraph(e.target.value)  } }     
                                        />
                                    </Box> 
                                    <Typography 
                                        component='h6'  
                                    >
                                        Form Settings
                                    </Typography> 
                                    <Box display='flex' mt={2}>
                                        <Box mr={1} flexGrow='1' >   
                                            <TextField   
                                                fullWidth
                                                type='text'
                                                label="Form Input Label" 
                                                size='small'  
                                                variant="outlined"  
                                                value={inputLabel}
                                                onChange={ (e) => { setIsDisableBtn(false); setInputLabel(e.target.value) } }     
                                            />
                                        </Box> 
                                        <Box flexGrow='1' >   
                                            <TextField   
                                                fullWidth
                                                type='text'
                                                label="Form Button Label" 
                                                size='small'  
                                                variant="outlined"  
                                                value={buttonLabel}
                                                onChange={ (e) => { setIsDisableBtn(false); setButtonLabel(e.target.value) } }     
                                            />
                                        </Box> 
                                    </Box>
                                    <Box mt={2}>   
                                        <TextField   
                                            fullWidth
                                            type='text'
                                            label="Form Policy" 
                                            size='small'  
                                            variant="outlined"  
                                            value={policy}
                                            onChange={ (e) => { setIsDisableBtn(false);  setPolicy(e.target.value) } }     
                                        />
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

                                    <Box mt={3} display="flex" alignItems='flex-start' >
                                        <Tooltip title='recomended size 515x340' placement='top'>  
                                            <Button color='primary' variant='contained' className={classes.btnWithLabel} > 
                                                <label htmlFor='image-input-label'> Set main image</label>
                                                <input 
                                                    id="image-input-label"
                                                    type="file" 
                                                    onChange={(e) => { handleImageUpload(e, 'mainImage')}} 
                                                    style={{ display: "none" }}
                                                />
                                            </Button> 
                                        </Tooltip>
                                        {
                                            imageUrl &&
                                            <Box ml={1} maxWidth={300}>
                                                <img src={imageUrl} alt='main' width={'100%'} />
                                            </Box>
                                        }
                                        
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
