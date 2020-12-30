import React from 'react'  

import firebase from '../../../firebase/firebase'
import LoadingContext from '../../../context/loadingContext/LoadingContext' 

import Draggable from 'react-draggable';
import { TwitterPicker } from 'react-color';

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
    IconButton, 
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

const StyledComponent = (props) => {  
    const { setIsLoading } = React.useContext(LoadingContext)
 
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
    const [imageBorderRadius, setImageBorderRadius] = React.useState(props.data.image.classes.borderRadius ||  '0px')
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
         

    const useStyles = makeStyles((theme) => ({
     
        inputNumber: {
            flexGrow: 1, 
            margin: 5, 
            width: "100%"
        }, 
        inputGroup: {
            border: `1px solid ${theme.palette.divider}`, 
            padding: 3, 
            inputNumber: { 
                maxWidth: "100%"

            }
        },
        btnSave: { 
            position: 'sticky', 
            zIndex: theme.zIndex.tooltip,
            bottom: 0, 
            left: 0, 
            right: 0,
            height: 80, 
            marginTop: 10, 
            backgroundColor: theme.palette.background.paper, 
            
            '&>button': {
                marginTop: 20, 
                marginBottom: 30, 
                marginLeft: 5, 
                opacity: 1,  
                paddingLeft: 40, 
                paddingRight: 40
            }
        },
        dumbItemContainer: { 
            position: 'relative', 
            outline: '1px solid #f000',
            transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn} outline`,
            '&:hover' : {   
                boxShadow: theme.shadows[10], 
                cursor: 'pointer',
                outlineColor: `${theme.palette.error.light}`,
                '&>button' : { 
                    opacity: 1
                }, 
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
                '& $btnDrawerStyle': {
                    opacity: 1
                } 
            }, 
        }, 
        mtView: {  
            position: 'absolute', 
            top: `-${margin.top}px`, 
            left: 0, 
            right: 0,
            zIndex: 10, 
            backgroundColor: '#fff7003d',
            height: `${margin.top}px`, 
            opacity: 0,
            transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeIn} opacity`
        },
        mbView: {  
            position: 'absolute', 
            bottom: `-${margin.bottom}px`, 
            left: 0, 
            right: 0,
            zIndex: 10, 
            backgroundColor: '#fff7003d',
            height: `${margin.bottom}px`, 
            opacity: 0,
            transition: `180ms ${theme.transitions.easing.easeIn} opacity`
        },
        ptView: {  
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0,
            zIndex: 10, 
            backgroundColor: '#400e575e',
            height: `${padding.top}px`, 
            opacity: 0,
            transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeIn} opacity`
        },
        pbView: {  
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0,
            zIndex: 10, 
            backgroundColor: '#400e575e',
            height: `${padding.bottom}px`, 
            opacity: 0,
            transition: `180ms ${theme.transitions.easing.easeIn} opacity`
        },
        dumbItem: { 
            position: 'relative',
            transition: "300ms cubic-bezier(0.4, 0, 1, 1)", 
        }, 
        dumbItemDelete : { 
            opacity: 0,
            position: 'absolute', 
            zIndex: 9, 
            top: 3, 
            right: 5,
            backgroundColor: theme.palette.secondary.dark,
            transition: "100ms cubic-bezier(0.4, 0, 1, 1)",
            '&:hover' : { 
                backgroundColor: theme.palette.error.light
            }
        },  
        menu: {    
            position: "absolute", 
            left: "calc(50% - 200px)",
            top: 50, 
            backgroundColor: theme.palette.background.paper, 
            padding: 10 , 
            paddingBottom: 0, 
            maxWidth: 400,  
            width: 400, 
            maxHeight: 'calc(100vh - 100px)', 
            minHeight: 500,
            overflowY: 'scroll'
        },
        menuTitle: {
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            fontSize: 14, 
            borderBottom: '1px solid #eaeaea',
            paddingBottom: 6,
            marginBottom: 10, 
            cursor: 'move'
        },
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
        }
      }));
    
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

    //const dataNew - props for Dumb Component
    const dataNew = {...props.data, ...{
        classes: myClassName,
    }} 
 
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
            url: imageUrl
        })
        sentData.text = textInDumb

        props.reSaveChildren(props.data.id, sentData)
        setIsDisableBtn(true); 
    }
    const removeItem = () => {  
        props.removeItem(props.data.id)
    };
    
    const handleInputFocus = () => {  
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleImageSetting = (event) => {    
        uploadHandler(event.target.files[0])
        setIsDisableBtn(false)
        setIsLoading(true)
    }
    
    const uploadHandler = (imageData) => { 
        const storageRef = firebase.storage.ref(`${imageData.name}`).put(imageData)
        storageRef.on('state-changed', 
          snapshot => {
            console.log( snapshot )
          }, 
          error => {
            console.log(error.message)
          },
          () => {
            setIsLoading(false)
            storageRef.snapshot.ref.getDownloadURL()
              .then( url => {
                setImageUrl(url) 
              })
          }
        )
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
                                                    onChange={handleImageSetting} 
                                                    style={{ display: "none" }}
                                                />
                                            </Button>
                                            <DumbImage
                                                imageUrl={imageUrl}
                                                image={dataNew.image}   
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
                                        <TextField 
                                                className={classes.inputNumber}
                                                type='color'
                                                label="Border Color" 
                                                variant="filled" 
                                                size='small'  
                                                value={imageBorderColor}
                                                onChange={ (e) => { setIsDisableBtn(false);  setImageBorderColor(e.target.value)} }     
                                        />
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
                                <Box 
                                    className={classes.inputNumber}
                                >
                                    <Typography  component={'h6'} gutterBottom  >
                                        Background  
                                    </Typography>
                                    <TwitterPicker
                                        width={'100%'}
                                        triangle={'hide'}
                                        color={backgroundColor}
                                        colors={[ '#4e36f4', '#36f477', 'rgb(244, 214, 54)']} 
                                        onChangeComplete={(newColor) => {
                                            setIsDisableBtn(false);
                                            setBackgroundColor(newColor.hex) 
                                        }}

                                    /> 
                                </Box> 
                                <Box 
                                    className={classes.inputNumber}
                                >
                                    <Typography  component={'h6'} gutterBottom  >
                                        Color  
                                    </Typography>
                                    <TwitterPicker
                                        width={'100%'}
                                        triangle={'hide'}
                                        colors={[ '#4e36f4', '#36f477', 'rgb(244, 214, 54)']} 
                                        color={color}
                                        onChangeComplete={(newColor) => {
                                            setIsDisableBtn(false);
                                            setColor(newColor.hex) 
                                        }}

                                    /> 
                                </Box>  
                            </Box>
                                                    
                            {/* border */}
                            <Box className={classes.inputGroup}> 
                                <Box display="flex" flexDirection="row" > 
                                    <TextField 
                                            className={classes.inputNumber}
                                            type='color'
                                            label="Border Color" 
                                            variant="filled" 
                                            size='small'  
                                            value={borderColor}
                                            onChange={ (e) => { setIsDisableBtn(false);  setBorderColor(e.target.value)} }     
                                    />
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
                
                <Grid item xs={12}  className={classes.dumbItemContainer }>  
                 
                      
                        <div 
                            className={classes.dumbItem }
                            onClick={handleInputFocus}
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
                                data={dataNew} 
                                className={myClassName}  
                                imageClassName={imageClassName}
                                imageUrl={imageUrl}
                                prop={props.data.prop} 
                                textChildren={textInDumb} 
                            />
                           
                        </div>  
                        <Tooltip  title="Delete Paragraph"  placement={'top'}> 
                            <IconButton 
                                className={ classes.dumbItemDelete}
                                size="small"
                                aria-label="delete"
                                onClick={removeItem}
                            > 
                                <DeleteOutline style={{ color: '#fff'}}/>
                            </IconButton>
                        </Tooltip>
 
                </Grid>
            </Grid>
           
 
    )
}

export default StyledComponent
