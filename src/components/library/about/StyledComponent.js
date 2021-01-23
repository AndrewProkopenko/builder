import React from 'react'
import firebase from "../../../firebase/firebase"

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
    FormControlLabel,
    Switch,
    Typography,
    ButtonGroup,
    makeStyles,
    Modal,
    DialogContent
} from '@material-ui/core'

import OpenWithIcon from '@material-ui/icons/OpenWith';

import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import {DeleteOutline} from '@material-ui/icons';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

import DumbComponent from "./DumbComponent"

import ImageContext  from '../../../context/imageContext/ImageContext'

function StyledComponent(props) {
 
    const { removeImage } = React.useContext(ImageContext)
      
    const [isDisableBtn, setIsDisableBtn] = React.useState(true)
    const [open, setOpen] = React.useState(false)

    const [heading, setHeading] = React.useState(props.data.heading)
    const [paragraph, setParagraph] = React.useState(props.data.paragraph)

    const [imageUrl, setImageUrl] = React.useState(props.data.image)
    const [imageName, setImageName] = React.useState(props.data.imageName || '')

    const [isButton, setIsButton] = React.useState(props.data.isButton || false)
    const [textButton,  setTextButton] = React.useState(props.data.textButton || '')
    const [targetButton, setTargetButton] = React.useState(props.data.targetButton || '')

    const [colorSelect,  setColorSelect] = React.useState(props.data.colorButton || '')
    const [colorCustom, setColorCustom] = React.useState(props.data.colorButton || '')

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
    const handleChange = () => {
        setIsButton(!isButton)
        setIsDisableBtn(false)
    }
    React.useEffect(() => {
        if(
            props.data.colorButton !== 'primary' && 
            props.data.colorButton !== 'secondary' &&
            props.data.colorButton !== 'warning' &&
            props.data.colorButton !== 'error' &&
            props.data.colorButton !== 'info' &&
            props.data.colorButton !== 'success' 
        ) {  
            setColorSelect('custom')
        }  
    }, [props.data.colorButton])  

    const useStyles = makeStyles((theme) => {
        
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)

        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle, btnSetting, btnSave, btnDrawerStyle, btnDrawerItem, 
            containerWrapper, btnWithLabel, responseValues ,responseMobile , mobileTooltip
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
  
    const handleImageUpload = async (e) => {
  
        removeImage(imageName)

        const imageData = e.target.files[0]
        const generateImageName = `${imageData.name}-${props.data.id}`

        const storageRef = await firebase.storage.ref(generateImageName).put(imageData)
        const downloadURL = await storageRef.ref.getDownloadURL();
 
        setImageName(generateImageName)
        setImageUrl(downloadURL)  
         
        setIsDisableBtn(false)
    }
    const handleSave = () => {
        const newData = Object.assign({}, props.data)
        newData.heading = heading
        newData.paragraph = paragraph
        newData.image = imageUrl
        newData.imageName = imageName
        newData.isButton = isButton
        newData.textButton = textButton
        newData.targetButton = targetButton
        newData.marginTop = marginTop
        newData.marginBottom = marginBottom
        newData.maxWidthContainer = maxWidthContainer

        if (colorSelect === 'custom') {
            newData.colorButton = colorCustom
        } else {
            newData.colorButton = colorSelect
        }

        props.reSaveItem(props.data.id, newData)
        handleClose()
        setIsDisableBtn(true)
    }
    const removeItem = () => {
        const conf = window.confirm('Delete? ')
        if (conf)  {
            removeImage(imageName)
            props.removeContainer(props.data.id)
        }
           
    }
    

    return (
        <div className={classes.containerWrapper}>
            <Tooltip  title={`about margin top`}  placement={'top'}>
                <div className={classes.mtView}></div>
            </Tooltip>
            <Tooltip  title={`about margin bottom`}  placement={'top'}>
                <div className={classes.mbView}></div>
            </Tooltip>
            <Box style={{
                position: 'relative'
            }}>
                <Box className={classes.btnDrawerStyle}>
                    <Box display="flex" flexDirection="column">
                        <Box mb={1}>
                            <Tooltip title='About Settings' placement='right'>
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
                                    onClick={removeItem}
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
                        onClose={handleClose}>
                        <DialogContent>
                            <Draggable
                                handle="#draggable-dialog-title"
                                cancel={'[class*="MuiDialogContent-root"]'}>
                                <div className={classes.menu}>
                                    <Typography
                                        component='p'
                                        className={classes.menuTitle}
                                        id="draggable-dialog-title">
                                        Settings About
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
                                            onChange={(e) => {
                                            setIsDisableBtn(false);
                                            setHeading(e.target.value)
                                        }}/>
                                    </Box>

                                    <Box mt={3}>
                                        <TextField
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Paragraph"
                                            variant="outlined"
                                            value={paragraph}
                                            onChange={(e) => {
                                            setIsDisableBtn(false);
                                            setParagraph(e.target.value)
                                        }}/>
                                    </Box>

                                    <Box display='flex' mt={3} mb={3}>
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
                                                <Box display='flex' flexDirection='column' ml={2}>
                                                    <Box mb={1}>
                                                        <Box display='flex'>
                                                            <Box mr={1}>
                                                                <TextField
                                                                    type='text'
                                                                    label="Text for Button"
                                                                    variant="outlined"
                                                                    value={textButton}
                                                                    onChange={(e) => {
                                                                    setIsDisableBtn(false);
                                                                    setTextButton(e.target.value)
                                                                }}/>
                                                            </Box>
                                                            <TextField
                                                                type='text'
                                                                label="Target for Button"
                                                                variant="outlined"
                                                                value={targetButton}
                                                                onChange={(e) => { setIsDisableBtn(false); setTargetButton(e.target.value) }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                    <Box mt={2} display="flex" >
                                                        <ColorSelecter
                                                            label={'Color for Button'}
                                                            colorSelect={colorSelect} 
                                                            setColorSelect={setColorSelect}
                                                            colorCustom={colorCustom}
                                                            setColorCustom={setColorCustom}
                                                            setIsDisableBtn={setIsDisableBtn} 
                                                            position = {'right'}
                                                            noInherit={true}
                                                        /> 
                                                    </Box>
                                                </Box>
                                            }
                                    </Box>

                                    <Box mt={3} display="flex" alignItems='flex-start'>
                                        <Button color='primary' variant='contained' className={classes.btnWithLabel}  >
                                            <label htmlFor='image-input-label'>
                                                Set image</label>
                                            <input
                                                id="image-input-label"
                                                type="file"
                                                onChange={(e) => {
                                                handleImageUpload(e)
                                            }}
                                                style={{
                                                display: "none"
                                            }}/>
                                        </Button>
                                        <Box ml={1} maxWidth={300}>
                                            { imageUrl && <img src={imageUrl} alt='main' width={'100%'}/>}
                                        </Box>
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
