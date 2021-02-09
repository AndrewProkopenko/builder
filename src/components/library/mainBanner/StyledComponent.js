import React from 'react'
import firebase from "../../../firebase/firebase"

import StylesChangers from '../../../styles/changers'    
import StyledInputs from '../../../styles/inputs'    

import Draggable from 'react-draggable';  
 
import ColorSelecter from '../../functions/colorChanger/ColorSelecter'
import {isNoThemeColor} from '../../functions/colorChanger/ColorCalculation'

import { 
    MenuItem,Button, Box, Tooltip, FormControl, InputLabel,
    Select, Typography, ButtonGroup, makeStyles, Modal, DialogContent
} from '@material-ui/core'

import OpenWithIcon from '@material-ui/icons/OpenWith';

import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'; 
import { DeleteOutline , InfoOutlined } from '@material-ui/icons';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import TabletMacIcon from '@material-ui/icons/TabletMac';

import DumbComponent from "./DumbComponent" 

import InputChange from '../../functions/InputChange';

import {RemoveImage} from '../../functions/RemoveImage' 

import Confirm from '../../utilits/Confirm' 
import TableFontSizeInfo from '../../utilits/TableFontSizeInfo'
import SelectHeadingVariant from '../../functions/SelectHeadingVariant';

function StyledComponent(props) { 
        
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 
    const [open, setOpen] = React.useState(false)

    const [isVisibleConfirmBlock, setIsVisibleConfirmBlock] = React.useState(false) 
    const [isVisibleConfirmImage, setIsVisibleConfirmImage] = React.useState(false) 
    const [isVisibleConfirmIcon, setIsVisibleConfirmIcon] = React.useState(false) 

    const [variant, setVariant] = React.useState(props.data.variantHeading || 'h2')
    const [isTableSizeVisible, setIsTableSizeVisible] = React.useState(false)

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
        if(!isDisableBtn) handleSave()
        setOpen(false);
    };

    const colorTheme = isNoThemeColor(props.data.color)
    React.useEffect(() => {
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

        const { menu, menuTitle, btnSetting, btnDrawerStyle, btnDrawerItem, containerWrapper, btnWithLabel, dialogContentUnstyle, 
            responseValues ,responseMobile , mobileTooltip, responseTablets, tabletTooltip, tableSizeContainer, tableSizeBtn, tableSizeAbsolute } = commonClasses 
            
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
            }, 
            infoBlock: {
                padding: 8, 
                border: `1px solid ${theme.palette.info.main}`
            }
        })
    })
    
    const classes = useStyles();
 
    const handleImageUpload = async (e, imageType) => {  
        const imageData = e.target.files[0]
        const generateImageName = `${imageData.name}-${props.data.id}`

        if( imageType === 'mainImage')  { 
            RemoveImage(imageName)   
        }
        if( imageType === 'icon') {
            RemoveImage(iconName)   
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
        newData.variantHeading = variant 
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
        // handleClose()
        setIsDisableBtn(true)
    }
    const removeItem = () => { 
        setIsVisibleConfirmBlock(true)  
    }
    const handleRemoveImage = () => {
        setIsVisibleConfirmImage(true) 
    }
    const handleRemoveIcon = () => {
        setIsVisibleConfirmIcon(true)  
    }
 
    // const handleRemoveImage = () => {
    //     setIsVisibleConfirmImage(true)
    // }

    const handleConfirmClickBlock = () => {
        RemoveImage(imageName) 
        RemoveImage(iconName) 
        props.removeContainer(props.data.id)
    }
    const handleConfirmClickImage = () => {
        RemoveImage(imageName)

        setImageUrl('')
        setImageName('')
        setIsDisableBtn(false)
    }
    const handleConfirmClickIcon = () => {
        RemoveImage(iconName)

        setIconUrl('')
        setIconName('')
        setIsDisableBtn(false)
    }

    return (
        <div className={classes.containerWrapper}>
            <Confirm
                isVariable={false}
                show={isVisibleConfirmBlock}
                setShow={setIsVisibleConfirmBlock} 
                title={'Remove main block?'}
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
            <Confirm
                isVariable={false}
                show={isVisibleConfirmIcon}
                setShow={setIsVisibleConfirmIcon} 
                title={'Delete image?'}
                text={"You can't cancel this action."}
                removeText={"delete"}
                handleRemoveClick={handleConfirmClickIcon}
            />

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
                        <DialogContent classes={{root: classes.dialogContentUnstyle}}> 
                            <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                                <div className={classes.menu}>
                                    <Typography 
                                        component='p' 
                                        className={classes.menuTitle}
                                        id="draggable-dialog-title"
                                    >
                                        { !isDisableBtn && "Close to save - " } Main banner settings <OpenWithIcon/>
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
                                        <Tooltip classes={{tooltip: classes.tabletTooltip}} title='Calculated styles for Tablets (<960px)' placement={'top'}>
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
                                    
                                    <Box className={classes.infoBlock}> 
                                        <span>You can use block without image. In this state you can set background color for block and contrast text</span>    
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

                                    <Box display="flex" mt={3}>   
                                        <Box display="flex" mr={2} minWidth={150} >
                                            <Box display='flex' flexDirection='column' >
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
                                                    iconUrl.length > 0 &&
                                                    <Box mt={1}>
                                                        <Button
                                                            size='small'
                                                            color='secondary' 
                                                            variant='contained' 
                                                            onClick={handleRemoveIcon}
                                                            style={{whiteSpace: 'nowrap'}}
                                                        > 
                                                            Remove icon
                                                        </Button>
                                                    </Box>
                                                }
                                            </Box>
                                            
                                            {
                                                iconUrl &&
                                                <Box ml={1}>
                                                    <img src={iconUrl} alt='icon' width={35} />
                                                </Box>
                                            }
                                            
                                        </Box> 
                                        <InputChange
                                            id={null}
                                            fullWidth={true}
                                            type='text'
                                            size="small" 
                                            label='Sub Heading'
                                            variant='outlined'
                                            value={subHeading}
                                            setValue={setSubHeading}
                                            setIsDisableBtn={setIsDisableBtn}
                                            direction='row'
                                        /> 
                                         
                                    </Box> 
                                    <Box mt={3} mb={3}>   
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
                                            direction='row'
                                        />  
                                    </Box> 
                                    <Typography 
                                        component='h6'  
                                    >
                                        Form Settings
                                    </Typography> 
                                    <Box display='flex' mt={2}>
                                        <Box mr={1} flexGrow='1' >  
                                            <InputChange
                                                id={null}
                                                fullWidth={true} 
                                                type='text'
                                                size="small" 
                                                label="Form Input Label" 
                                                variant='outlined'
                                                value={inputLabel}
                                                setValue={setInputLabel}
                                                setIsDisableBtn={setIsDisableBtn}
                                                direction='row'
                                            />  
                                        </Box> 
                                        <Box flexGrow='1' >   
                                            <InputChange
                                                id={null}
                                                fullWidth={true} 
                                                type='text'
                                                size="small" 
                                                label="Form Button Label" 
                                                variant='outlined'
                                                value={buttonLabel}
                                                setValue={setButtonLabel}
                                                setIsDisableBtn={setIsDisableBtn}
                                                direction='row'
                                            />  
                                        </Box> 
                                    </Box>
                                    <Box mt={2}>   
                                    
                                        <InputChange
                                            id={null}
                                            fullWidth={true} 
                                            type='text'
                                            size="small" 
                                            label="Form Policy" 
                                            variant='outlined'
                                            value={policy}
                                            setValue={setPolicy}
                                            setIsDisableBtn={setIsDisableBtn}
                                            direction='row'
                                        />   
                                    </Box> 

                                    <Box mt={2} display="flex" >
                                        <ColorSelecter
                                            label={'Color for Form and SubHeading'}
                                            colorSelect={colorSelect} 
                                            setColorSelect={setColorSelect}
                                            colorCustom={colorCustom}
                                            setColorCustom={setColorCustom}
                                            setIsDisableBtn={setIsDisableBtn} 
                                            position="right"
                                            noInherit={true}
                                        /> 
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
                                            onClick={handleSave}
                                        >
                                            Save
                                        </Button> 
                                    </Box> */}
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
