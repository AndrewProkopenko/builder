import React from 'react'  

import StylesChangers from '../../../styles/changers'   
import StyledInputs from '../../../styles/inputs'   

import firebase from '../../../firebase/firebase'

import LoadingContext from '../../../context/loadingContext/LoadingContext' 
import ImageContext  from '../../../context/imageContext/ImageContext'

import Draggable from 'react-draggable';
import {ColorPicker} from '../colorPicker/ColorPicker'

import { makeStyles } from '@material-ui/core/styles';

import { 
    FormGroup, 
    Grid, 
    TextField, 
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
    
    const [image, setImage] = React.useState(props.data.image || {})
    const [imageUrl, setImageUrl] = React.useState(props.data.image.url || '')
    const [imageName, setImageName] = React.useState(props.data.image.imageName || '')
    const [imageTitle, setImageTitle] = React.useState(props.data.image.title || '')
    const [imagePlacement, setImagePlacement] = React.useState(props.data.image.imagePlacement || 'top')
    
    const [color, setColor] = React.useState(props.data.classes.color || 'inherit')
    const [backgroundColor, setBackgroundColor] = React.useState(props.data.classes.backgroundColor ||  'transperent')

    const [borderColor, setBorderColor] = React.useState(props.data.classes.borderColor ||  'transperent')
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
    const [imageBorderColor, setImageBorderColor] = React.useState(props.data.image.classes.borderColor ||  'transperent')
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
         
    

    const useStyles = makeStyles((theme) => {
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { btnSave, menu, menuTitle,  responseValues, responseMobile, mobileTooltip  } = commonClasses 
        const { mtView, mbView, ptView, pbView, inputNumber, inputGroup, dumbItemContainer, dumbItem, dumbItemDelete } = commonStyle

        return ({
            inputNumber: inputNumber, 
            inputGroup: inputGroup,
            btnSave: btnSave,
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
                left: "calc(50% - 200px)",
                width: 400, 
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
        color: color,
        backgroundColor: backgroundColor,
        textAlign: textAlign,
        fontSize: fontSize,
        fontWeight: fontWeight, 
        lineHeight: lineHeight,
        borderColor: borderColor,
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
        borderColor: imageBorderColor, 
        borderStyle: imageBorderStyle,
        float : imageFloat
    }
    
    const classes = useStyles();

   
 
    const handlePadding = (e, direction) => {  
        let newPadding = Object.assign({}, padding)
        newPadding[direction] = Number(e.target.value)
        setPadding(newPadding)  

        setIsDisableBtn(false);
    }
    const handleMargin = (e, direction) => {  
        let newMargin = Object.assign({}, margin)
        newMargin[direction] = Number(e.target.value)
        setMargin(newMargin)  

        setIsDisableBtn(false);
    }
    const handleImageMargin = (e, direction) => {  
        let newMargin = Object.assign({}, imageMargin)
        newMargin[direction] = Number(e.target.value)
        setImageMargin(newMargin)  

        setIsDisableBtn(false);
    }

    const saveData = () => {   
        const sentData = Object.assign({}, props.data)

        sentData.classes = myClassName
        sentData.image = Object.assign(image, {
            title: imageTitle, 
            placement: imagePlacement,
            classes: imageClassName, 
            url: imageUrl,
            imageName: imageName
        })
        sentData.text = textInDumb

        props.reSaveChildren(props.data.id, sentData)
        setIsDisableBtn(true); 
        handleClose()
    }
    const removeItem = () => {  
        let conf = window.confirm("Delete ?");
        if(conf) { 
            removeImage(imageName)
            props.removeItem(props.data.id)
        }
    };
    
    const handleInputFocus = () => {  
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    // const handleImageSetting = (event) => {    
    //     uploadHandler(event.target.files[0])
    //     setIsLoading(true)
    // }
    
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
                                Задать параграфу текст, стили и картинки <OpenWithIcon/>
                            </Typography>
                            <Box mb={3} >
                                <TextField 
                                        type='text' 
                                        label="Text input"
                                        fullWidth
                                        value={textInDumb}
                                        multiline={true}
                                        rowsMax={6}
                                        variant="filled"
                                        onChange={(e) => { setIsDisableBtn(false); setTextInDumb(e.target.value) }}
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
                                                <TextField  
                                                    type='text'
                                                    label="Image title" 
                                                    variant="filled" 
                                                    size='small'  
                                                    value={imageTitle}
                                                    fullWidth
                                                    onChange={ (e) => {setIsDisableBtn(false);  setImageTitle(e.target.value) } }     
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
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Image Margin Top" 
                                            variant="filled" 
                                            size='small'  
                                            value={imageMargin.top}
                                            onChange={ (e) => { setIsDisableBtn(false); handleImageMargin(e, 'top') } }     
                                        />
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Margin Bottom" 
                                            variant="filled" 
                                            size='small'  
                                            value={imageMargin.bottom}
                                            onChange={ (e) => { setIsDisableBtn(false); handleImageMargin(e, 'bottom') } }     
                                        />
                                    </Box>
                                    <Box display="flex" flexDirection="row" > 
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Margin Left" 
                                            variant="filled" 
                                            size='small'  
                                            value={imageMargin.left}
                                            onChange={ (e) => { setIsDisableBtn(false); handleImageMargin(e, 'left') } }     
                                        />
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Margin Right" 
                                            variant="filled" 
                                            size='small'  
                                            value={imageMargin.right}
                                            onChange={ (e) => { setIsDisableBtn(false);handleImageMargin(e, 'right') } }     
                                        />
                                    </Box>
                                </Box>

                                {/* width height*/}
                                <Box className={classes.inputGroup}>
                                    <Typography variant={'caption'} display='block' align={"center"} color={'error'}>
                                        !! set only width, height will set auto
                                    </Typography>
                                    <Box display="flex" flexDirection="row"  > 
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Image Width" 
                                            variant="filled" 
                                            size='small'  
                                            value={imageWidth}
                                            onChange={ (e) => { setIsDisableBtn(false); setImageWidth(Number(e.target.value)) } }     
                                        />
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Image Height" 
                                            variant="filled" 
                                            size='small'  
                                            value={imageHeight}
                                            onChange={ (e) => {setIsDisableBtn(false); setImageHeight(Number(e.target.value)) } }     
                                        />
                                    </Box>
                                </Box>
                                
                                {/* border */}
                                <Box className={classes.inputGroup}> 
                                    <Box display="flex" flexDirection="row" > 
                                        <Box className={classes.inputNumber} >
                                            <Typography  component={'p'} gutterBottom  >
                                                Border  -  { imageBorderColor }
                                            </Typography> 
                                            <ColorPicker 
                                                initialColor={imageBorderColor} 
                                                changeColor={setImageBorderColor} 
                                                setIsDisableBtn={setIsDisableBtn}
                                                position={'left'}
                                            /> 
                                        </Box>
                                         
                                        <TextField 
                                                className={classes.inputNumber}
                                                type='number'
                                                label="Border Radius" 
                                                variant="filled" 
                                                size='small'  
                                                value={imageBorderRadius}
                                                onChange={ (e) => { setIsDisableBtn(false);  setImageBorderRadius(Number(e.target.value)) } }     
                                        />

                                    </Box>
                                    <Box display="flex" flexDirection="row" > 
                            
                                        <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Border Width" 
                                            variant="filled" 
                                            size='small'  
                                            value={imageBorderWidth}
                                            onChange={ (e) => { setIsDisableBtn(false); setImageBorderWidth(Number(e.target.value))} }     
                                        />
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
                                    <TextField 
                                        className={classes.inputNumber}
                                        type='number'
                                        label="Margin Top" 
                                        variant="filled" 
                                        size='small'  
                                        value={margin.top}
                                        onChange={ (e) => { handleMargin(e, 'top') } }     
                                    />
                                    <TextField 
                                        className={classes.inputNumber}
                                        type='number'
                                        label="Margin Bottom" 
                                        variant="filled" 
                                        size='small'  
                                        value={margin.bottom}
                                        onChange={ (e) => { handleMargin(e, 'bottom') } }     
                                    />
                                </Box>
                                <Box display="flex" flexDirection="row" > 
                                    <TextField 
                                        className={classes.inputNumber}
                                        type='number'
                                        label="Margin Left" 
                                        variant="filled" 
                                        size='small'  
                                        value={margin.left}
                                        onChange={ (e) => { handleMargin(e, 'left') } }     
                                    />
                                    <TextField 
                                        className={classes.inputNumber}
                                        type='number'
                                        label="Margin Right" 
                                        variant="filled" 
                                        size='small'  
                                        value={margin.right}
                                        onChange={ (e) => { handleMargin(e, 'right') } }     
                                    />
                                </Box>
                            </Box>
                            
                            {/* padding */}
                            <Box className={classes.inputGroup}>
                                <Box display="flex" flexDirection="row" > 
                                    <TextField 
                                        className={classes.inputNumber}
                                        type='number'
                                        label="Padding Top" 
                                        variant="filled" 
                                        size='small'  
                                        value={padding.top}
                                        onChange={ (e) => { handlePadding(e, 'top') } }     
                                    />
                                    <TextField 
                                        className={classes.inputNumber}
                                        type='number'
                                        label="Padding Bottom" 
                                        variant="filled" 
                                        size='small'  
                                        value={padding.bottom}
                                        onChange={ (e) => { handlePadding(e, 'bottom') } }     
                                    />
                                </Box>
                                <Box display="flex" flexDirection="row" > 
                                    <TextField 
                                        className={classes.inputNumber}
                                        type='number'
                                        label="Padding Left" 
                                        variant="filled" 
                                        size='small'  
                                        value={padding.left}
                                        onChange={ (e) => { handlePadding(e, 'left') } }     
                                    />
                                    <TextField 
                                        className={classes.inputNumber}
                                        type='number'
                                        label="Padding Right" 
                                        variant="filled" 
                                        size='small'  
                                        value={padding.right}
                                        onChange={ (e) => { handlePadding(e, 'right') } }     
                                    />
                                </Box>
            
                            </Box>
                          
                            {/* bg-color */}
                            <Box className={classes.inputGroup} display="flex" flexDirection="row" > 
                                <Box className={classes.inputNumber} >
                                    <Typography  component={'p'} gutterBottom  >
                                        Background  -  { backgroundColor }
                                    </Typography> 
                                    <ColorPicker 
                                        initialColor={backgroundColor} 
                                        changeColor={setBackgroundColor} 
                                        setIsDisableBtn={setIsDisableBtn}
                                        position={'left'}
                                    /> 
                                </Box>
                                <Box className={classes.inputNumber} >
                                    <Typography  component={'p'} gutterBottom  >
                                        Color  -  { color }
                                    </Typography> 
                                    <ColorPicker 
                                        initialColor={color} 
                                        changeColor={setColor} 
                                        setIsDisableBtn={setIsDisableBtn}
                                        position={'right'}
                                    /> 
                                </Box>   
                            </Box>
                                                    
                            {/* border */}
                            <Box className={classes.inputGroup}> 
                                <Box display="flex" flexDirection="row" > 
                                    <Box className={classes.inputNumber} >
                                        <Typography  component={'p'} gutterBottom  >
                                            Border  -  { borderColor }
                                        </Typography> 
                                        <ColorPicker 
                                            initialColor={borderColor} 
                                            changeColor={setBorderColor} 
                                            setIsDisableBtn={setIsDisableBtn}
                                            position={'right'}
                                        /> 
                                    </Box>   
                                    <TextField 
                                            className={classes.inputNumber}
                                            type='number'
                                            label="Border Radius" 
                                            variant="filled" 
                                            size='small'  
                                            value={borderRadius}
                                            onChange={ (e) => { setIsDisableBtn(false);  setBorderRadius(Number(e.target.value)) } }     
                                    />

                                </Box>
                                <Box display="flex" flexDirection="row" > 
                        
                                <TextField 
                                    className={classes.inputNumber}
                                    type='number'
                                    label="Border Width" 
                                    variant="filled" 
                                    size='small'  
                                    value={borderWidth}
                                    onChange={ (e) => { setIsDisableBtn(false);setBorderWidth(Number(e.target.value))} }     
                                />
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
                            </Box>

                            {/* font */}
                            <Box className={classes.inputGroup}> 
                                <Box display="flex" flexDirection="row" >  
                                    <TextField 
                                        className={classes.inputNumber}
                                        type='number'
                                        label="Font Size" 
                                        variant="filled" 
                                        size='small'  
                                        value={fontSize}
                                        onChange={ (e) => {setIsDisableBtn(false); setFontSize(Number(e.target.value))} }     
                                    /> 
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
                                <TextField 
                                    className={classes.inputNumber}
                                    type='number'
                                    label="Line Height (em)" 
                                    variant="filled" 
                                    size='small'  
                                    value={lineHeight}
                                    onChange={ (e) => {setIsDisableBtn(false); setLineHeight(Number(e.target.value))} }     
                                />
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
                            </Box>

                           
                            </Accordion>   
                            <Box className={classes.btnSave}>
                                <Button 
                                    disabled={isDisableBtn} 
                                    variant="contained"
                                    color="primary"
                                    size={'medium'} 
                                    onClick={saveData}
                                >
                                    Save
                                </Button>  
                            </Box>                
                        </div>
                    </Draggable>
                    </DialogContent>
                </Modal>
                
                <Grid item xs={12}  className={classes.dumbItemContainer } onClick={handleInputFocus}>  
                 
                      
                        <div 
                            className={classes.dumbItem }
                            // onClick={handleInputFocus}
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
