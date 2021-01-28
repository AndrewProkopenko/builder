import React from 'react'  

import StylesChangers from '../../../styles/changers'   
import StyledInputs from '../../../styles/inputs'   

import firebase from '../../../firebase/firebase'

import LoadingContext from '../../../context/loadingContext/LoadingContext' 
import ImageContext  from '../../../context/imageContext/ImageContext'

import Draggable from 'react-draggable';

import InputChange from '../../functions/InputChange';
 
import ColorSelecter from '../../functions/colorChanger/ColorSelecter'
import {isNoThemeColor} from '../../functions/colorChanger/ColorCalculation'

import { makeStyles } from '@material-ui/core/styles';

import { 
    FormGroup, 
    Grid,  
    Button, 
    FormControl,
    InputLabel,
    Select, 
    MenuItem,  
    ButtonGroup, 
    Typography,
    Modal,
    Box,
    Accordion,
    AccordionSummary,
    DialogContent, 
    Tooltip,

} from '@material-ui/core'

import DumbComponent from "./DumbComponent" 
import DumbImage from '../image/DumbComponent' 

import OpenWithIcon from '@material-ui/icons/OpenWith';
import DeleteOutline  from '@material-ui/icons/DeleteOutline'; 
import ImageIcon from '@material-ui/icons/Image';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

const StyledComponent = (props) => {  
    console.log("styled paragraph image")
    const { setIsLoading } = React.useContext(LoadingContext)
    const { removeImage } = React.useContext(ImageContext)
 
    const [padding, setPadding] = React.useState({ 
        top:  props.data.classes.paddingTop || 0, 
        left:  props.data.classes.paddingLeft || 0,
        bottom: props.data.classes.paddingBottom || 0,
        right: props.data.classes.paddingRight || 0
    })
    const [margin, setMargin] = React.useState({
        top:  props.data.classes.marginTop || 0,
        left:  props.data.classes.marginLeft || 0,
        bottom: props.data.classes.marginBottom || 0, 
        right: props.data.classes.marginRight  || 0
    })
    

    const [backgroundSelect,  setBackgroundSelect] = React.useState(props.data.classes.backgroundColor || 'transperent')
    const [backgroundCustom, setBackgroundCustom] = React.useState(props.data.classes.backgroundColor || 'transperent')
    const [colorSelect,  setColorSelect] = React.useState(props.data.classes.color || 'inherit')
    const [colorCustom, setColorCustom] = React.useState(props.data.classes.color || 'inherit') 
    const [borderColorSelect, setBorderColorSelect] = React.useState(props.data.classes.borderColor ||  'transperent')
    const [borderColorCustom, setBorderColorCustom] = React.useState(props.data.classes.borderColor ||  'transperent') 
    const [imageBorderColorSelect, setImageBorderColorSelect] = React.useState(props.data.image.classes.borderColor ||  'transperent')
    const [imageBorderColorCustom, setImageBorderColorCustom] = React.useState(props.data.image.classes.borderColor ||  'transperent')
  
    // eslint-disable-next-line
    const [image, setImage] = React.useState(props.data.image || {})
    const [imageUrl, setImageUrl] = React.useState(props.data.image.url || '')
    const [imageName, setImageName] = React.useState(props.data.image.imageName || '')
    const [imageTitle, setImageTitle] = React.useState(props.data.image.title || '')
    const [imagePlacement, setImagePlacement] = React.useState(props.data.image.imagePlacement || 'top')
     
    const [borderStyle, setBorderStyle] = React.useState(props.data.classes.borderStyle ||  'solid')
    const [borderWidth, setBorderWidth] = React.useState(props.data.classes.borderWidth ||  '0px')
    const [borderRadius, setBorderRadius] = React.useState(props.data.classes.borderRadius ||  '0px')

    const [textAlign, setTextAlign] = React.useState(props.data.classes.textAlign ||  'left')
    const [display, setDisplay] = React.useState(props.data.classes.display ||  'block')
    const [fontSize, setFontSize] = React.useState(props.data.classes.fontSize ||  16)
    const [fontWeight, setFontWeight] = React.useState(props.data.classes.fontWeight ||  400)
    const [lineHeight, setLineHeight] = React.useState(props.data.classes.lineHeight ||  1.38)
 
    const [imageWidth, setImageWidth] = React.useState(props.data.image.classes.width || 100)
    const [imageHeight, setImageHeight] = React.useState(props.data.image.classes.height || 100)
    const [imageBorderStyle, setImageBorderStyle] = React.useState(props.data.image.classes.borderStyle ||  'solid')
    const [imageBorderWidth, setImageBorderWidth] = React.useState(props.data.image.classes.borderWidth ||  '0px')
    const [imageBorderRadius, setImageBorderRadius] = React.useState(props.data.image.classes.borderRadius ||  0)
    const [imageFloat, setImageFloat] = React.useState(props.data.image.classes.float || 'none')
    const [imageMargin, setImageMargin] = React.useState({
        top:  props.data.image.classes.marginTop || 0, 
        left:  props.data.image.classes.marginLeft || 0,
        bottom: props.data.image.classes.marginBottom || 0, 
        right: props.data.image.classes.marginRight  || 0
    })
    const [textInDumb, setTextInDumb] = React.useState(props.data.text)
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 

 
    const [open, setOpen] = React.useState(false);
         
    const bgTheme = isNoThemeColor(props.data.classes.backgroundColor)
    const colorTheme = isNoThemeColor(props.data.classes.color)
    const borderTheme = isNoThemeColor(props.data.classes.borderColor)
    const imageBorderTheme = isNoThemeColor(props.data.image.classes.borderColor)
    React.useEffect(() => {
        if(bgTheme) {  
            setBackgroundSelect('custom')
        }  
        if(colorTheme) {  
            setColorSelect('custom')
        }  
        if(borderTheme) {  
            setBorderColorSelect('custom')
        }  
        if(imageBorderTheme) {  
            setImageBorderColorSelect('custom')
        }  
        // eslint-disable-next-line
    }, [props.data.classes.backgroundColor, props.data.classes.color, props.data.classes.borderColor, props.data.image.classes.borderColor ]) 

    const useStyles = makeStyles((theme) => {
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle,  responseValues, responseMobile, mobileTooltip  } = commonClasses 
        const { mtView, mbView, ptView, pbView, inputNumber, inputGroup, dumbItemContainer, dumbItem, dumbItemDelete } = commonStyle

        return ({
            inputNumber: inputNumber, 
            inputGroup: inputGroup, 
            dumbItemContainer: {  ...dumbItemContainer, ...{
                '&:hover' : {     
                    boxShadow: theme.shadows[10], 
                    cursor: 'pointer',
                    outlineColor: `${theme.palette.error.light}`,  
                    '& $dumbItemDelete' : { 
                        opacity: 1
                    }  ,
                    '& $mtView' : { 
                        opacity: 1
                    },
                    '& $mbView' : { 
                        opacity: 1
                    }, 
                    '& $ptView' : { 
                        opacity: 1
                    },
                    '& $pbView' : { 
                        opacity: 1
                    },  
                }
            }},
            mtView: { ...mtView, ...{
                    top: `-${margin.top}px`, 
                    height: `${margin.top}px`, 
                    [theme.breakpoints.down('sm')]: {
                        top: `-${margin.top * 0.5}px`,  
                        height: `${margin.top * 0.5}px`,
                    }
                } 
            }, 
            mbView: { ...mbView, ...{
                    bottom: `-${margin.bottom}px`, 
                    height: `${margin.bottom}px`, 
                    [theme.breakpoints.down('sm')]: {
                        top: `-${margin.bottom * 0.5}px`,  
                        height: `${margin.bottom * 0.5}px`,
                    }
                } 
            }, 
            ptView: { ...ptView, ...{
                height: `${padding.top}px`,   
                } 
            }, 
            pbView: { ...pbView, ...{
                height: `${padding.bottom}px`,  
                } 
            },     
            dumbItem: dumbItem, 
            dumbItemDelete : dumbItemDelete,  
            menu: {...menu, ...{
                left: "calc(50% - 250px)",
                width: 500, 
            } },
            menuTitle: menuTitle,
            imageAccordion: { 
                marginBottom: 10,  
            },
            imagePreview: {
                position: 'relative', 
                width: 105, 
                height: 105, 
                border: `1px solid ${theme.palette.primary.light}`, 
                '&>img' : {  
                    position: 'absolute',
                    top: 0, 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    margin: 0, 
                    width: "100%", 
                    maxWidth: "100%", 
                    height: "100%", 
                    maxHeight: "100%", 
                }, 
                '&>button' : {
                    position: 'absolute',
                    zIndex: 10, 
                    top: 0, 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    width: "100%", 
                    maxWidth: "100%", 
                    height: "100%", 
                    maxHeight: "100%", 
                    backgroundColor: "#0027ff70", 
                    borderRadius: 0, 
                    transition: "200ms cubic-bezier(0.4, 0, 1, 1)",
                    "&:hover": {
                        opacity: 0
                    } 
                }, 
            },
            imageLabel: {
                position: 'absolute',
                zIndex: 10, 
                top: 0, 
                bottom: 0, 
                left: 0, 
                right: 0, 
                width: "100%", 
                maxWidth: "100%", 
                height: "100%", 
                maxHeight: "100%", 
                cursor: 'pointer'
            }, 
            responseValues: responseValues,  
            responseMobile: responseMobile,
            mobileTooltip: mobileTooltip,
          })
    });
    
    const myClassName = { 
        display: display,
        paddingTop: padding.top,
        paddingBottom: padding.bottom,
        paddingLeft: padding.left,
        paddingRight: padding.right,
        marginTop: margin.top,
        marginBottom: margin.bottom,
        marginLeft: margin.left,
        marginRight: margin.right,  
        textAlign: textAlign,
        fontSize: fontSize,
        fontWeight: fontWeight, 
        lineHeight: lineHeight, 
        borderStyle: borderStyle,
        borderRadius: borderRadius,
        borderWidth: borderWidth
    } 

    const imageClassName = { 
        marginTop: imageMargin.top,
        marginBottom: imageMargin.bottom,
        marginLeft: imageMargin.left,
        marginRight: imageMargin.right,
        width: imageWidth, 
        height: imageHeight,
        borderWidth: imageBorderWidth, 
        borderRadius: imageBorderRadius,  
        borderStyle: imageBorderStyle,
        float : imageFloat
    }
    
    const classes = useStyles();

   
 
    const handlePadding = (value, direction) => {  
        let newPadding = Object.assign({}, padding)
        newPadding[direction] = Number(value)
        setPadding(newPadding)  

        setIsDisableBtn(false);
    }
    const handleMargin = (value, direction) => {  
        let newMargin = Object.assign({}, margin)
        newMargin[direction] = Number(value)
        setMargin(newMargin)  

        setIsDisableBtn(false);
    }
    const handleImageMargin = (value, direction) => {  
        let newMargin = Object.assign({}, imageMargin)
        newMargin[direction] = Number(value)
        setImageMargin(newMargin)  

        setIsDisableBtn(false);
    }

    const handleSave = () => {   
        const sentData = Object.assign({}, props.data)

        sentData.classes = myClassName
        if (backgroundSelect === 'custom') { sentData.classes.backgroundColor = backgroundCustom }
        else { sentData.classes.backgroundColor = backgroundSelect }
        if (colorSelect === 'custom') { sentData.classes.color = colorCustom } 
        else { sentData.classes.color = colorSelect }
        if (borderColorSelect === 'custom') { sentData.classes.borderColor = borderColorCustom } 
        else { sentData.classes.borderColor = borderColorSelect }

        sentData.image = Object.assign(image, {
            title: imageTitle, 
            placement: imagePlacement,
            classes: imageClassName, 
            url: imageUrl,
            imageName: imageName
        })
        if (imageBorderColorSelect === 'custom') { sentData.classes.borderColor = imageBorderColorCustom } 
        else { sentData.classes.borderColor = imageBorderColorSelect }


        sentData.text = textInDumb

        props.reSaveChildren(props.data.id, sentData)
        setIsDisableBtn(true);  
    }
    const removeItem = () => {  
        let conf = window.confirm("Delete ?");
        if(conf) { 
            removeImage(imageName)
            props.removeItem(props.data.id)
        }
    };
    
    const handleOpen = () => {  
        setOpen(true);
    }
    const handleClose = () => {
        if(!isDisableBtn) handleSave()
        setOpen(false);
    }
     
    
    const handleImageUpload = async (e) => { 
        removeImage(imageName)

        const imageData = e.target.files[0]
        const generateImageName = `${imageData.name}-${props.data.id}`

        const storageRef = await firebase.storage.ref(generateImageName).put(imageData)
        const downloadURL = await storageRef.ref.getDownloadURL();
 
        setImageName(generateImageName)
        setImageUrl(downloadURL)  
         
        setIsDisableBtn(false)
        
        setIsLoading(false) 
    }

    const swapParagraph = (direction, id) => {
        props.swapChildrens(direction, id)
    }
    

    return ( 
            <Grid container style={{position: 'relative'}}> 
                <Modal 
                    open={open}  
                    aria-labelledby="draggable-dialog-title"
                    onClose={handleClose} 
                >
                    <DialogContent>
                        <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                        <div className={classes.menu}  >
                            <Typography 
                                component='p' 
                                className={classes.menuTitle}
                                id="draggable-dialog-title"
                            >
                                { !isDisableBtn && "Close to save - " } Image Paragraph Settings <OpenWithIcon/>
                            </Typography>
                            <Box mb={3} >
                                <InputChange
                                    id={null}
                                    fullWidth={true}
                                    multiline={true}
                                    type='text'
                                    size="medium" 
                                    label="Text input"
                                    variant='standard'
                                    value={textInDumb}
                                    setValue={setTextInDumb}
                                    setIsDisableBtn={setIsDisableBtn} 
                                />   
                            </Box> 

                            <Tooltip classes={{tooltip: classes.mobileTooltip}} title='Calculated styles for Mobile (>600px)' placement={'top'}>
                                <Box className={`${classes.responseValues} ${classes.responseMobile}`}>
                                    <PhoneIphoneIcon/>
                                    <Box>   
                                        <p>MarginTop: <b>{margin.top * 0.5 }</b>; MarginBottom: <b>{margin.bottom * 0.5 }</b> </p> 
                                        <p>flexDirection: <b> column</b>; alignItems: <b>center</b> </p>  
                                        <p>TextAlign:  <b>center</b> </p>     
                                    </Box>
                                </Box>
                            </Tooltip> 
 
                            <Accordion className={classes.imageAccordion}  >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="image-settings-content"
                                    id="panel1a-header" 
                                >
                                    <Typography >Image Settings</Typography>
                                </AccordionSummary>
                                <Box px={2} pt={1} pb={2}>
                                    <Grid container >
                                        <Grid item xs={4} className={classes.imagePreview}>
                                            <Button> 
                                                <ImageIcon color="action" />

                                                <label htmlFor='image-input-label' className={classes.imageLabel}></label>
                                                <input 
                                                    id="image-input-label"
                                                    type="file" 
                                                    onChange={handleImageUpload} 
                                                    style={{ display: "none" }}
                                                />
                                            </Button>
                                            <DumbImage
                                                imageUrl={imageUrl}
                                                image={props.data.image}   
                                            /> 
                                        </Grid>
                                        <Grid item xs={8}> 
                                            <Box ml={1}>
                                                <InputChange
                                                    id={null} 
                                                    fullWidth={true}
                                                    type='text'
                                                    size="small" 
                                                    label="Image title" 
                                                    variant='filled'
                                                    value={imageTitle}
                                                    setValue={setImageTitle}
                                                    setIsDisableBtn={setIsDisableBtn} 
                                                /> 
                                                 
                                                <Box mt={1}>
                                                    <FormControl 
                                                        variant='filled' 
                                                        size='small'    
                                                        fullWidth
                                                    >
                                                        <InputLabel id="image-placement-label">Title placement</InputLabel>
                                                        <Select
                                                            labelId="image-placement-label"
                                                            id="image-placement"
                                                            value={imagePlacement}
                                                            onChange={(e) => {setIsDisableBtn(false); setImagePlacement(e.target.value) }}
                                                        >
                                                            <MenuItem value={'top-start'}>Top Start</MenuItem>
                                                            <MenuItem value={'top'}>Top</MenuItem>
                                                            <MenuItem value={'top-end'}>Top End</MenuItem>
                                                            <MenuItem value={'left-start'}>Left Start</MenuItem>
                                                            <MenuItem value={'left'}>Left</MenuItem>
                                                            <MenuItem value={'left-end'}>Left End</MenuItem>
                                                            <MenuItem value={'right-start'}>Right Start</MenuItem>
                                                            <MenuItem value={'right'}>Right</MenuItem>
                                                            <MenuItem value={'right-end'}>Right End</MenuItem>
                                                            <MenuItem value={'bottom-start'}>Bottom Start</MenuItem>
                                                            <MenuItem value={'bottom'}>Bottom</MenuItem>
                                                            <MenuItem value={'bottom-end'}>Bottom End</MenuItem>

                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                                    
                                            </Box> 
                                        </Grid>
                                    </Grid>  
                                </Box>
                                
                                 {/* float */}
                                <Box className={classes.inputGroup}>
                                    <FormGroup row>
                                        <FormControl 
                                            variant='filled' 
                                            size='small'   
                                            className={classes.inputNumber}
                                            fullWidth
                                        >
                                            <InputLabel id="display-style-label">Float</InputLabel>
                                            <Select
                                                labelId="display-style-label"
                                                id="display-style"
                                                value={imageFloat}
                                                onChange={(e) => {setIsDisableBtn(false); setImageFloat(e.target.value) }}
                                            >
                                            <MenuItem value={'left'}>Left</MenuItem> 
                                            <MenuItem value={'right'}>Right</MenuItem> 
                                            <MenuItem value={'none'}>None</MenuItem>  
                                            </Select>
                                        </FormControl>
                                    </FormGroup>
                                </Box>                           
                           
                                {/* margin */}
                                <Box className={classes.inputGroup}>
                                    <Box display="flex" flexDirection="row"  > 
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'top'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label='Image Margin Top'
                                                variant='filled'
                                                value={imageMargin.top}
                                                setValue={handleImageMargin}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box> 
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'bottom'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label='Image Margin Bottom'
                                                variant='filled'
                                                value={imageMargin.bottom}
                                                setValue={handleImageMargin}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box> 
                                         
                                    </Box>
                                    <Box display="flex" flexDirection="row" > 
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'left'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label='Image Margin Left'
                                                variant='filled'
                                                value={imageMargin.left}
                                                setValue={handleImageMargin}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box>  
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={'right'}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label='Image Margin Right'
                                                variant='filled'
                                                value={imageMargin.right}
                                                setValue={handleImageMargin}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box> 
                                    </Box>
                                </Box>

                                {/* width height*/}
                                <Box className={classes.inputGroup}>
                                    <Typography variant={'caption'} display='block' align={"center"} color={'error'}>
                                        !! set only width, height will set auto
                                    </Typography>
                                    <Box display="flex" flexDirection="row"  > 
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={null} 
                                                type='number'
                                                size="small" 
                                                label='Image Width'
                                                variant='filled'
                                                value={imageWidth}
                                                setValue={setImageWidth}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box> 
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={null} 
                                                type='number'
                                                size="small" 
                                                label='Image Height'
                                                variant='filled'
                                                value={imageHeight}
                                                setValue={setImageHeight}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box>  
                                    </Box>
                                </Box>
                                
                                {/* border */}
                                <Box className={classes.inputGroup}> 
                                    <Box display="flex" flexDirection="row" > 
                                        <Box className={classes.inputNumber} > 
                                            <ColorSelecter
                                                label={'Border Color'}
                                                colorSelect={imageBorderColorSelect} 
                                                setColorSelect={setImageBorderColorSelect}
                                                colorCustom={imageBorderColorCustom}
                                                setColorCustom={setImageBorderColorCustom}
                                                setIsDisableBtn={setIsDisableBtn} 
                                                position = {'left'}
                                                noInherit={false}
                                            />  
                                        </Box> 
                                    </Box>
                                    <Box display="flex" flexDirection="row" > 
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={null} 
                                                type='number'
                                                size="small" 
                                                label="Border Radius" 
                                                variant='filled'
                                                value={imageBorderRadius}
                                                setValue={setImageBorderRadius}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box> 
                                        <Box className={classes.inputNumber}>
                                            <InputChange
                                                id={null} 
                                                type='number'
                                                size="small" 
                                                label="Border Width" 
                                                variant='filled'
                                                value={imageBorderWidth}
                                                setValue={setImageBorderWidth}
                                                setIsDisableBtn={setIsDisableBtn} 
                                            /> 
                                        </Box>  
                                    </Box>
                                    <Box display="flex" flexDirection="row" > 
                            
                                        
                                        <FormControl 
                                            variant='filled' 
                                            size='small'   
                                            className={classes.inputNumber}
                                        >
                                            <InputLabel id="image-border-style-label">Border Style</InputLabel>
                                            <Select
                                                labelId="image-border-style-label"
                                                id="image-border-style"
                                                value={imageBorderStyle}
                                                onChange={(e) => {setIsDisableBtn(false); setImageBorderStyle(e.target.value) }}
                                            >
                                            <MenuItem value={'solid'}>Solid</MenuItem>
                                            <MenuItem value={'dotted'}>Dotted</MenuItem>
                                            <MenuItem value={'dashed'}>Dashed</MenuItem>
                                            <MenuItem value={'double'}>Double</MenuItem>
                                            <MenuItem value={'groove'}>Groove</MenuItem>
                                            <MenuItem value={'inset'}>Inset</MenuItem>
                                            <MenuItem value={'outset'}>Outset</MenuItem>
                                            <MenuItem value={'ridge'}>Ridge</MenuItem>
                                            <MenuItem value={'none'}>None</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="paragraph-settings-content"
                                    id="panel2a-header" 
                                >
                                    <Typography >Paragraph Settings</Typography>
                                </AccordionSummary>
                            
                            {/* display */}
                            <Box className={classes.inputGroup}>
                                <FormGroup row>
                                    <FormControl 
                                        variant='filled' 
                                        size='small'   
                                        className={classes.inputNumber}
                                        fullWidth
                                    >
                                        <InputLabel id="display-style-label">Display</InputLabel>
                                        <Select
                                            labelId="display-style-label"
                                            id="display-style"
                                            value={display}
                                            onChange={(e) => {setIsDisableBtn(false); setDisplay(e.target.value) }}
                                        >
                                        <MenuItem value={'block'}>Block</MenuItem> 
                                        <MenuItem value={'inline-block'}>Inline-block</MenuItem> 
                                        <MenuItem value={'flex'}>Flex</MenuItem> 
                                        <MenuItem value={'inline-flex'}>Inline-flex</MenuItem> 
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                            </Box>                           
                           
                            {/* margin */}
                            <Box className={classes.inputGroup}>
                                <Box display="flex" flexDirection="row"  > 
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={'top'}
                                            fullWidth={false}
                                            type='number'
                                            size="small" 
                                            label='Margin Top'
                                            variant='filled'
                                            value={margin.top}
                                            setValue={handleMargin}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        /> 
                                    </Box> 
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={'bottom'}
                                            fullWidth={false}
                                            type='number'
                                            size="small" 
                                            label='Margin Bottom'
                                            variant='filled'
                                            value={margin.bottom}
                                            setValue={handleMargin}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        /> 
                                    </Box> 
                                </Box>
                                <Box display="flex" flexDirection="row" >
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={'left'}
                                            fullWidth={false}
                                            type='number'
                                            size="small" 
                                            label='Margin Left'
                                            variant='filled'
                                            value={margin.left}
                                            setValue={handleMargin}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        /> 
                                    </Box>
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={'right'}
                                            fullWidth={false}
                                            type='number'
                                            size="small" 
                                            label='Margin Right'
                                            variant='filled'
                                            value={margin.right}
                                            setValue={handleMargin}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        /> 
                                    </Box>
                                </Box>
                            </Box>
                             
                            
                            {/* padding */}
                            <Box className={classes.inputGroup}>
                                <Box display="flex" flexDirection="row" > 
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={'top'}
                                            fullWidth={false}
                                            type='number'
                                            size="small" 
                                            label="Padding Top" 
                                            variant='filled'
                                            value={padding.top}
                                            setValue={handlePadding}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        /> 
                                    </Box> 
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={'bottom'}
                                            fullWidth={false}
                                            type='number'
                                            size="small" 
                                            label="Padding Bottom" 
                                            variant='filled'
                                            value={padding.bottom}
                                            setValue={handlePadding}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        /> 
                                    </Box>  
                                </Box>
                                <Box display="flex" flexDirection="row" >
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={'left'}
                                            fullWidth={false}
                                            type='number'
                                            size="small" 
                                            label="Padding Left" 
                                            variant='filled'
                                            value={padding.left}
                                            setValue={handlePadding}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        /> 
                                    </Box>   
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={'right'}
                                            fullWidth={false}
                                            type='number'
                                            size="small" 
                                            label="Padding Right" 
                                            variant='filled'
                                            value={padding.right}
                                            setValue={handlePadding}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        /> 
                                    </Box>  
                                </Box>
            
                            </Box>
                          
                            {/* bg-color */}
                            <Box className={classes.inputGroup} display="flex" flexDirection="row" > 
                                <Box className={classes.inputNumber} >
                                    <ColorSelecter
                                        label={'Background'}
                                        colorSelect={backgroundSelect} 
                                        setColorSelect={setBackgroundSelect}
                                        colorCustom={backgroundCustom}
                                        setColorCustom={setBackgroundCustom}
                                        setIsDisableBtn={setIsDisableBtn} 
                                        position = {'left'}
                                        noInherit={false}
                                    />  
                                </Box>  
                            </Box>
                            <Box className={classes.inputGroup} display="flex" flexDirection="row" > 
                                 
                                <Box className={classes.inputNumber} >
                                    <ColorSelecter
                                        label={'Color'}
                                        colorSelect={colorSelect} 
                                        setColorSelect={setColorSelect}
                                        colorCustom={colorCustom}
                                        setColorCustom={setColorCustom}
                                        setIsDisableBtn={setIsDisableBtn} 
                                        position = {'right'}
                                        noInherit={false}
                                    />  
                                </Box>   
                            </Box>
                                                    
                            

                            {/* font */}
                            <Box className={classes.inputGroup}> 
                                <Box display="flex" flexDirection="row" >  
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={'right'}
                                            fullWidth={false}
                                            type='number'
                                            size="small" 
                                            label="Font Size" 
                                            variant='filled'
                                            value={fontSize}
                                            setValue={setFontSize}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        /> 
                                    </Box>  
                                
                                    <FormControl 
                                        variant='filled' 
                                        size='small'   
                                        className={classes.inputNumber}
                                    >
                                        <InputLabel id="weight-select-label">Font Weight</InputLabel>
                                        <Select
                                            labelId="weight-select-label"
                                            id="weight-select"
                                            value={fontWeight}
                                            onChange={(e) => {setIsDisableBtn(false); setFontWeight(Number(e.target.value)) }}
                                        >
                                        <MenuItem value={300}>Light</MenuItem>
                                        <MenuItem value={400}>Regular</MenuItem>
                                        <MenuItem value={700}>Bold</MenuItem>
                                        </Select>
                                    </FormControl>
                                
                                    
                                </Box>
                                <Box display="flex" flexDirection="row" >
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={'right'}
                                            fullWidth={false}
                                            type='number'
                                            size="small" 
                                            label="Line Height (em)" 
                                            variant='filled'
                                            value={lineHeight}
                                            setValue={setLineHeight}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        /> 
                                    </Box> 
                                    
                                    <FormControl 
                                            variant='filled' 
                                            size='small'   
                                            className={classes.inputNumber}
                                        >
                                            <InputLabel id="align-select-label">Text Align</InputLabel>
                                            <Select
                                                labelId="align-select-label"
                                                id="align-select"
                                                value={textAlign}
                                                onChange={(e) => {setIsDisableBtn(false); setTextAlign((e.target.value)) }}
                                            >
                                            <MenuItem value={'left'}>Left</MenuItem>
                                            <MenuItem value={'center'}>Center</MenuItem>
                                            <MenuItem value={'right'}>Right</MenuItem>
                                            </Select>
                                        </FormControl>
                                </Box>
                                <Box display="flex" flexDirection="row" >
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={'right'}
                                            fullWidth={false}
                                            type='number'
                                            size="small" 
                                            label="Border Radius" 
                                            variant='filled'
                                            value={borderRadius}
                                            setValue={setBorderRadius}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        /> 
                                    </Box> 
                                    <Box className={classes.inputNumber}>
                                        <InputChange
                                            id={'right'}
                                            fullWidth={false}
                                            type='number'
                                            size="small" 
                                            label="Border Width" 
                                            variant='filled'
                                            value={borderWidth}
                                            setValue={setBorderWidth}
                                            setIsDisableBtn={setIsDisableBtn} 
                                        /> 
                                    </Box>   
                                </Box>
                                <Box display="flex" flexDirection="row" >
                                    <FormControl 
                                        variant='filled' 
                                        size='small'   
                                        className={classes.inputNumber}
                                    >
                                        <InputLabel id="border-style-label">Border Style</InputLabel>
                                        <Select
                                            labelId="border-style-label"
                                            id="border-style"
                                            value={borderStyle}
                                            onChange={(e) => {setIsDisableBtn(false); setBorderStyle(e.target.value) }}
                                        >
                                        <MenuItem value={'solid'}>Solid</MenuItem>
                                        <MenuItem value={'dotted'}>Dotted</MenuItem>
                                        <MenuItem value={'dashed'}>Dashed</MenuItem>
                                        <MenuItem value={'double'}>Double</MenuItem>
                                        <MenuItem value={'groove'}>Groove</MenuItem>
                                        <MenuItem value={'inset'}>Inset</MenuItem>
                                        <MenuItem value={'outset'}>Outset</MenuItem>
                                        <MenuItem value={'ridge'}>Ridge</MenuItem>
                                        <MenuItem value={'none'}>None</MenuItem>
                                        </Select>
                                    </FormControl>  
                                </Box>
                                <Box display="flex" flexDirection="row" >
                                    <Box className={classes.inputNumber} >   
                                        <ColorSelecter
                                            label={'Border Color'}
                                            colorSelect={borderColorSelect} 
                                            setColorSelect={setBorderColorSelect}
                                            colorCustom={borderColorCustom}
                                            setColorCustom={setBorderColorCustom}
                                            setIsDisableBtn={setIsDisableBtn} 
                                            position = {'left'}
                                            noInherit={false}
                                        />  
                                    </Box> 
                                </Box>
                                 


                            </Box>

                           
                            </Accordion>   
                            
                            <Box mt={5} />
                            {/* <Box className={classes.btnSave}>
                                <Button 
                                    disabled={isDisableBtn} 
                                    variant="contained"
                                    color="primary"
                                    size={'medium'} 
                                    onClick={saveData}
                                >
                                    Save
                                </Button>  
                            </Box>                 */}
                        </div>
                    </Draggable>
                    </DialogContent>
                </Modal>
                
                <Grid item xs={12}  className={classes.dumbItemContainer } onClick={handleOpen}>  
                 
                      
                        <div 
                            className={classes.dumbItem } 
                            aria-controls="simple-menu" aria-haspopup="true"  
                        > 
                            <Tooltip  title={` paragraphImg margin top`}  placement={'top'}>
                                <div className={classes.mtView}></div>
                            </Tooltip>
                            <Tooltip  title={` paragraphImg margin bottom`}  placement={'top'}>
                                <div className={classes.mbView}></div>
                            </Tooltip> 
                            <Tooltip  title={` paragraphImg padding top`}  placement={'top'}>
                                <div className={classes.ptView}></div>
                            </Tooltip> 
                            <Tooltip  title={` paragraphImg padding bottom`}  placement={'top'}>
                                <div className={classes.pbView}></div>
                            </Tooltip> 
                            <DumbComponent 
                                data={props.data} 
                                className={props.data.classes}  
                                imageClassName={props.data.image.classes}
                                imageUrl={props.data.image.url}
                                prop={props.data.prop} 
                                textChildren={props.data.text} 
                            />
                           
                        </div>  
                        <Box className={ classes.dumbItemDelete} >
                            <ButtonGroup
                                orientation="horizontal"
                                color="primary"
                                aria-label="horizontal contained primary button group"
                                variant="contained" 

                            >  
                                { 
                                    !props.isFirst  && 
                                    <Tooltip title='Get Up' placement='top'>
                                        <Button   
                                            onClick={() => { swapParagraph('up', props.data.id) }}
                                            size='small'
                                            variant='contained'
                                            color='primary'  
                                        >  
                                            <ExpandLessOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>   
                                        </Button>
                                    </Tooltip> 
                                }
                                {
                                    !props.isLast &&
                                    <Tooltip title='Get Down' placement='top'>
                                        <Button   
                                            onClick={() => { swapParagraph('down', props.data.id) }} 
                                            size='small'
                                            variant='contained'
                                            color='primary' 
                                            // disabled={categories.indexOf(item) === categories.length - 1 ? true : false }
                                        >     
                                            <ExpandMoreOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>
                                        </Button>
                                    </Tooltip>  
                                }
 

                                <Tooltip  title="Delete Paragraph"  placement={'top'}> 
                                    <Button 
                                        size="small"
                                        variant='contained'
                                        color='secondary'
                                        aria-label="delete"
                                        onClick={removeItem}
                                    >
                                        <DeleteOutline style={{ color: '#fff'}}/>
                                    </Button> 
                                </Tooltip>
                                    
                            </ButtonGroup>
                            
                        </Box>
                         
 
                </Grid>
            </Grid>
           
 
    )
}

export default StyledComponent
