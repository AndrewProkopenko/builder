import React, { useEffect, useState } from 'react'
import firebase from "../../../firebase/firebase"

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
import {DeleteOutline, InfoOutlined} from '@material-ui/icons'; 
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import TabletMacIcon from '@material-ui/icons/TabletMac';

import DumbComponent from "./DumbComponent" 

import InputChange from '../../functions/InputChange';

import {RemoveImage} from '../../functions/RemoveImage' 

import Confirm from '../../utilits/Confirm' 
import TableFontSizeInfo from '../../utilits/TableFontSizeInfo'
import SelectHeadingVariant from '../../functions/SelectHeadingVariant';

function StyledComponent(props) { 
      
    const [isDisableBtn, setIsDisableBtn] = useState(true)
    const [open, setOpen] = useState(false)

    
    const [isVisibleConfirmBlock, setIsVisibleConfirmBlock] = useState(false) 
    const [isVisibleConfirmImage, setIsVisibleConfirmImage] = useState(false) 

    const [variant, setVariant] = useState(props.data.variantHeading || 'h3')
    const [isTableSizeVisible, setIsTableSizeVisible] = useState(false)

    const [heading, setHeading] = useState(props.data.heading)
    const [paragraph, setParagraph] = useState(props.data.paragraph)

    const [imagePositionDesktop,  setImagePositionDesktop] = useState(props.data.imagePositionDesktop || 'right')
    const [imagePositionMobile,  setImagePositionMobile] = useState(props.data.imagePositionMobile || 'bottom')

    const [backgroundPosition,  setBackgroundPosition] = useState(props.data.backgroundPosition || 'center')
    const [backgroundSize,  setBackgroundSize] = useState(props.data.backgroundSize || 'cover')
    const [imageHeight,  setImageHeight] = useState(props.data.imageHeight || 400)
    const [isHalfWidth, setIsHalfWidth] = useState(props.data.isHalfWidth || true)

    const [imageUrl, setImageUrl] = useState(props.data.image)
    const [imageName, setImageName] = useState(props.data.imageName || '')

    const [isButton, setIsButton] = useState(props.data.isButton || false)
    const [textButton,  setTextButton] = useState(props.data.textButton || '')
    const [targetButton, setTargetButton] = useState(props.data.targetButton || '')

    const [colorSelect,  setColorSelect] = useState(props.data.colorButton || '')
    const [colorCustom, setColorCustom] = useState(props.data.colorButton || '')

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
    const handleChangeIsButton = () => {
        setIsButton(!isButton)
        setIsDisableBtn(false)
    }
    const handleChangeIsHalf = () => {
        setIsHalfWidth(!isHalfWidth)
        setIsDisableBtn(false)
    }
    
    const colorTheme = isNoThemeColor(props.data.colorButton)

    useEffect(() => {
        if(colorTheme) {  
            setColorSelect('custom')
        }  
        // eslint-disable-next-line
    }, [props.data.colorButton])  

    const useStyles = makeStyles((theme) => {
        
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)

        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle, btnSetting, btnDrawerStyle, btnDrawerItem,  dialogContentUnstyle, 
            containerWrapper, btnWithLabel, responseValues ,responseMobile , mobileTooltip, tabletTooltip, responseTablets, 
            tableSizeContainer, tableSizeBtn, tableSizeAbsolute
        } = commonClasses 

        
        
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
            menuTitle: {...menuTitle, ...{ 
                borderColor: isDisableBtn ? '#0000' : theme.palette.secondary.main
            }},
            btnSetting: btnSetting,  
            // btnSave: btnSave, 
            btnWithLabel: btnWithLabel,
            responseValues: responseValues,  
            responseMobile: responseMobile,
            mobileTooltip: mobileTooltip, 
            responseTablets: responseTablets,  
            tabletTooltip: tabletTooltip, 
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
            infoBlock: {
                padding: 8, 
                border: `1px solid ${theme.palette.info.main}`
            }
        })
    })

    const classes = useStyles();
  
    const handleImageUpload = async (e) => {
  
        RemoveImage(imageName)

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
        newData.variantHeading = variant
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
        newData.backgroundPosition = backgroundPosition
        newData.backgroundSize = backgroundSize
        newData.imageHeight = imageHeight
        newData.isHalfWidth = isHalfWidth
        newData.imagePositionDesktop = imagePositionDesktop
        newData.imagePositionMobile = imagePositionMobile


        if (colorSelect === 'custom') {
            newData.colorButton = colorCustom
        } else {
            newData.colorButton = colorSelect
        }

        props.reSaveItem(props.data.id, newData)
        // handleClose()
        setIsDisableBtn(true)
    }
    const removeItem = () => {
        setIsVisibleConfirmBlock(true)           
    }
    const handleRemoveImage = () => {
        setIsVisibleConfirmImage(true)
    }

    const handleConfirmClickBlock = () => {
        RemoveImage(imageName)
        props.removeContainer(props.data.id)
    }
    const handleConfirmClickImage = () => {
        RemoveImage(imageName)

        setImageUrl('')
        setImageName('')
        setIsDisableBtn(false)
    }

    return (
        <div className={classes.containerWrapper}>
            
            <Confirm
                isVariable={false}
                show={isVisibleConfirmBlock}
                setShow={setIsVisibleConfirmBlock} 
                title={'Remove about?'}
                text={"You can't cancel this action."}
                removeText={"remove"}
                handleRemoveClick={handleConfirmClickBlock}
            />
            <Confirm
                isVariable={false}
                show={isVisibleConfirmImage}
                setShow={setIsVisibleConfirmImage} 
                title={'Delete image?'}
                text={"You can't cancel this action."}
                removeText={"delete"}
                handleRemoveClick={handleConfirmClickImage}
            />
            <Tooltip  title={`about margin top`}  placement={'top'}>
                <div className={classes.mtView}></div>
            </Tooltip>
            <Tooltip  title={`about margin bottom`}  placement={'top'}>
                <div className={classes.mbView}></div>
            </Tooltip>
            <Box style={{ position: 'relative' }}>
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
                        <DialogContent classes={{root: classes.dialogContentUnstyle}}>
                            <Draggable
                                handle="#draggable-dialog-title"
                                cancel={'[class*="MuiDialogContent-root"]'}>
                                <div className={classes.menu}>
                                    <Typography
                                        component='p'
                                        className={classes.menuTitle}
                                        id="draggable-dialog-title">
                                        { !isDisableBtn && "Close to save - " }  Settings About
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
                                                        MarginBottom: <b>{ mobileMarginBottomComputed}</b> ; 
                                                        FontSize Heading: <b>25</b> 
                                                    </p>        
                                                </Box>
                                            </Box>
                                        </Tooltip>
                                        <Box className={classes.infoBlock}>  
                                            <span>You can use block without image. Block will be full width</span>       
                                        </Box>
                                    </Box>

                                    <Box mt={2}>
                                        <Typography variant='h6' gutterBottom>
                                            Texts
                                        </Typography>
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
                                        />  
                                    </Box>

                                    <Box mt={3}>   
                                        <InputChange
                                            id={null}
                                            fullWidth={true}
                                            multiline={true}
                                            type='text'
                                            size="medium" 
                                            label="Paragraph" 
                                            variant='outlined'
                                            value={paragraph}
                                            setValue={setParagraph}
                                            setIsDisableBtn={setIsDisableBtn} 
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

                                    <Box display='flex' mt={3} mb={3}>
                                        <FormControlLabel
                                            control={
                                                < Switch checked = { isButton }
                                                        onChange = { handleChangeIsButton }
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
                                                                <InputChange
                                                                    id={null} 
                                                                    type='text'
                                                                    size="small" 
                                                                    label="Text for Button"
                                                                    variant='outlined'
                                                                    value={textButton}
                                                                    setValue={setTextButton}
                                                                    setIsDisableBtn={setIsDisableBtn} 
                                                                />   
                                                            </Box>
                                                            <InputChange
                                                                id={null} 
                                                                type='text'
                                                                size="small" 
                                                                label="Target for Button"
                                                                variant='outlined'
                                                                value={targetButton}
                                                                setValue={setTargetButton}
                                                                setIsDisableBtn={setIsDisableBtn} 
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

                                    {
                                        imageUrl.length > 0 && 
                                        <Box display="flex" > 
                                            <FormControl 
                                                variant='filled' 
                                                size='small'    
                                            >
                                                <InputLabel id="maxWidth-style-label">Background Position</InputLabel>
                                                <Select
                                                    labelId="maxWidth-label"
                                                    id="maxWidth-style"
                                                    value={backgroundPosition}
                                                    style={{minWidth: 180}}
                                                    onChange={(e) => {setIsDisableBtn(false); setBackgroundPosition(e.target.value) }}
                                                >
                                                    <MenuItem value={'center'}>Center</MenuItem>
                                                    <MenuItem value={'top left'}>Top Left </MenuItem> 
                                                    <MenuItem value={'top right'}>Top Right </MenuItem> 
                                                    <MenuItem value={'top center'}>Top Center </MenuItem>  
                                                    <MenuItem value={'bottom left'}>Bottom Left </MenuItem> 
                                                    <MenuItem value={'bottom right'}>Bottom Right </MenuItem> 
                                                    <MenuItem value={'bottom center'}>Bottom Center </MenuItem>  
                                                </Select>
                                            </FormControl>
                                            

                                            <Box ml={1} display='inline-block'>
                                                <FormControl 
                                                    variant='filled' 
                                                    size='small'     
                                                >
                                                    <InputLabel id="maxWidth-style-label">Background Size</InputLabel>
                                                    <Select
                                                        labelId="maxWidth-label"
                                                        id="maxWidth-style"
                                                        value={backgroundSize}
                                                        style={{minWidth: 180}}
                                                        onChange={(e) => {setIsDisableBtn(false); setBackgroundSize(e.target.value) }}
                                                    >
                                                        <MenuItem value={'auto'}>Auto</MenuItem>
                                                        <MenuItem value={'auto 100%'}>Auto 100%</MenuItem>
                                                        <MenuItem value={'100% auto'}>100% Auto</MenuItem> 
                                                        <MenuItem value={'cover'}>Cover</MenuItem>
                                                        <MenuItem value={'contain'}>Contain </MenuItem>   
                                                    </Select>
                                                </FormControl>
                                            </Box>

                                            <Box ml={1} display='flex' >
                                                <InputChange
                                                    id={null} 
                                                    type='number'
                                                    size="small" 
                                                    label="Heigth Image for Desktop"
                                                    variant='outlined'
                                                    value={imageHeight}
                                                    setValue={setImageHeight}
                                                    setIsDisableBtn={setIsDisableBtn} 
                                                />  
                                                <Box  display='flex' flexDirection='column' ml={1} mt={-1}>
                                                    <Tooltip classes={{tooltip: classes.tabletTooltip}} title='Calculated styles for Tablets (<960px)' placement={'top'}>
                                                        <Box  className={`${classes.responseValues} ${classes.responseTablets}`}>
                                                            <TabletMacIcon/>
                                                            <Box>   
                                                                <p>  
                                                                    Height: <b>{Math.round(imageHeight*0.9)}</b> 
                                                                </p>     
                                                            </Box>
                                                        </Box>
                                                    </Tooltip>
                                                    <Tooltip classes={{tooltip: classes.mobileTooltip}} title='Calculated styles for Mobile (<600px)' placement={'top'}>
                                                        <Box className={`${classes.responseValues} ${classes.responseMobile}`}>
                                                            <PhoneIphoneIcon/>
                                                            <Box>  
                                                                <p> 
                                                                    Height: <b>{Math.round(imageHeight*0.7)}</b>;  
                                                                </p>        
                                                                <p> 
                                                                    {'>400px:'} <b>{Math.round(imageHeight*0.5)}</b>;  
                                                                </p>        
                                                            </Box>
                                                        </Box>
                                                    </Tooltip>


                                                </Box>
                                            </Box>
                                        
                                        </Box>
                                    }
                                    {
                                        imageUrl.length > 0 && 
                                        <FormControlLabel
                                            control={
                                                    < Switch checked = { isHalfWidth }
                                                            onChange = { handleChangeIsHalf }
                                                                name = "checkedB" 
                                                                color = "primary" />
                                                }
                                            label="If enable image will absolute and have half screen width "
                                        /> 
                                    }
                                    {
                                        imageUrl.length > 0 && 
                                        <Box display='flex' >
                                            <Box mr={1} flexGrow={1}>
                                                <FormControl 
                                                    variant='filled'  
                                                    size='small'    
                                                    fullWidth
                                                >
                                                    <InputLabel id="maxWidth-style-label">Image position on Desktop</InputLabel>
                                                    <Select
                                                        labelId="maxWidth-label"
                                                        id="maxWidth-style"
                                                        value={imagePositionDesktop}
                                                        style={{minWidth: 180}}
                                                        onChange={(e) => {setIsDisableBtn(false); setImagePositionDesktop(e.target.value) }}
                                                    >
                                                        <MenuItem value={'left'}>Left</MenuItem>
                                                        <MenuItem value={'right'}>Right</MenuItem>  
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box flexGrow={1}>
                                                <FormControl 
                                                    variant='filled' 
                                                    size='small'    
                                                    fullWidth
                                                >
                                                    <InputLabel id="maxWidth-style-label">Image position on Mobile ({'>960px'})</InputLabel>
                                                    <Select
                                                        labelId="maxWidth-label"
                                                        id="maxWidth-style"
                                                        value={imagePositionMobile}
                                                        style={{minWidth: 180}}
                                                        onChange={(e) => {setIsDisableBtn(false); setImagePositionMobile(e.target.value) }}
                                                    > 
                                                        <MenuItem value={'top'}>Top</MenuItem> 
                                                        <MenuItem value={'bottom'}>Bottom</MenuItem>  
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    }

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
                                    {
                                        imageUrl.length > 0 &&
                                        <Button
                                            color='secondary' 
                                            variant='contained' 
                                            onClick={handleRemoveImage}
                                        > 
                                        Remove image
                                        </Button>
                                    }


                                    <Box mt={5} /> 

                                    {/* <Box className={classes.btnSave}>
                                        <Button
                                            disabled={isDisableBtn}
                                            variant="contained"
                                            color="primary"
                                            size={'medium'}
                                            onClick={handleSave}>
                                            Save
                                        </Button>
                                    </Box> */}
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
