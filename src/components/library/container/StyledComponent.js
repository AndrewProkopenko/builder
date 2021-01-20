import React from 'react' 

import StylesChangers from '../../../styles/changers'   
import StyledInputs from '../../../styles/inputs'   

import Draggable from 'react-draggable'; 

import uuid from 'react-uuid' 
import {ColorPicker} from '../colorPicker/ColorPicker'
  
import { 
    MenuItem,   FormGroup,  Button,
    Box,  Menu, Tooltip,
    TextField, FormControl, InputLabel,
    Select, Typography, IconButton, 
    Modal, DialogContent, 
} from '@material-ui/core' 

import LibraryContext from '../../../context/libraryContext/LibraryContext' 

import { makeStyles } from '@material-ui/core/styles';  
import { InfoOutlined } from '@material-ui/icons';
import OpenWithIcon from '@material-ui/icons/OpenWith';

function ContainerElement(props) { 
    console.log('styled Container work')
    const { layouts } = React.useContext(LibraryContext)
    const libraryHeading = layouts.heading
    const libraryParagraph = layouts.paragraph
    const libraryParagraphImage = layouts.paragraphImage
    const libraryList = layouts.list

  
    const [padding, setPadding] = React.useState({ 
        top:  props.data.classes.paddingTop ,  
        bottom: props.data.classes.paddingBottom ,  
    })
    const [margin, setMargin] = React.useState({
        top:  props.data.classes.marginTop ,  
        bottom: props.data.classes.marginBottom ,  
    })
    
    const [display, setDisplay] = React.useState(props.data.classes.display || 'flex')
    const [flexDirection, setFlexDirection] = React.useState(props.data.classes.flexDirection || 'column')

    const [color, setColor] = React.useState(props.data.classes.color || 'inherit')
    const [backgroundColor, setBackgroundColor] = React.useState(props.data.classes.backgroundColor ||  'transparent')
    const [shadow, setShadow] = React.useState(props.data.classes.boxShadow || 'none')

    const [borderColor, setBorderColor] = React.useState(props.data.classes.borderColor ||  'transperent')
    const [borderStyle, setBorderStyle] = React.useState(props.data.classes.borderStyle ||  'solid')
    const [borderWidth, setBorderWidth] = React.useState(props.data.classes.borderWidth ||  '0px')
    const [borderRadius, setBorderRadius] = React.useState(props.data.classes.borderRadius ||  '0px')

    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 
  

    const [settingGutter, setSettingGutter] = React.useState(props.data.disableGutters)
    const [settingFixed, setSettingFixed] = React.useState(props.data.fixed)
    const [settingMaxWidth, setSettingMaxWidth] = React.useState(props.data.maxWidth)
    const [settingInnerContainer, setSettingInnerContainer] = React.useState(props.data.innerContainer || false )
    const [settingIsPaper, setSettingIsPaper] = React.useState(props.data.isPaper || false )

    const [anchorEl, setAnchorEl] = React.useState(null); 
     

    const propsSettings = {
        maxWidth: settingMaxWidth,
        disableGutters: settingGutter,
        fixed: settingFixed,
        innerContainer: settingInnerContainer,
        isPaper :settingIsPaper
    }


    const useStyles = makeStyles((theme) => {
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { btnSave, menu, menuTitle } = commonClasses 
        const { inputNumber, inputGroup , settingsItem } = commonStyle 
 

        return ({   
            settingsItem: settingsItem,
            inputNumber: {...inputNumber, ...{
                maxWidth: '50%'
            }}, 
            inputGroup: inputGroup,
            btnSave: btnSave,
            menu: {...menu, ...{
                left: "calc(50% - 300px)",
                width: 600, 
            } },
            menuTitle: menuTitle,
        })
    })
    
    const classes = useStyles();
    
    const myClassName = {  
        paddingTop: padding.top,
        paddingBottom: padding.bottom, 
        marginTop: margin.top,
        marginBottom: margin.bottom, 
        color: color,
        backgroundColor: backgroundColor, 
        borderColor: borderColor,
        borderStyle: borderStyle,
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        boxShadow: shadow, 
        display: display, 
        flexDirection: flexDirection
    } 
  

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
  
    const handleHeadingMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleHeadingMenuClose = (variant, type) => {
        setAnchorEl(null); 
        props.handleClose()
        addHeading(variant, type)
    }; 
  
    const addHeading = async (variant, type) => { 
          
        let newChildren = props.data.children.slice()

        let newItem = {}
        

        switch(type) { 
            case 'heading' :  
                newItem = Object.assign({}, libraryHeading) 
                newItem.id = uuid()
                newItem.variant = newItem.variant[variant] 
                newItem.text += " - " + newItem.variant 
                break;
            case 'paragraph' :   
                newItem = Object.assign({}, libraryParagraph)
                newItem.id = uuid() 
                break;
            case 'paragraphImage' :   
                newItem = JSON.parse(JSON.stringify(libraryParagraphImage)); 
                newItem.id = uuid()  
                break;
            case 'list' :   
                newItem = JSON.parse(JSON.stringify(libraryList)); 
                newItem.id = uuid()  
                break;
            default: break;
        }  

        newChildren.push(newItem) 
   
        props.handleClose()

        // save in firestore
        props.reSaveContainer(props.data.id, newChildren)
 
    } 

    const reSaveClassesSettings = () => {    
        props.reSaveContainerStyleSettings(props.data.id, myClassName, propsSettings)
        setIsDisableBtn(true); 
        props.handleClose()
    } 
     
    
 
    return (
        <Box 
            maxWidth={props.propsSettings.maxWidth} 
            fixed={String(props.propsSettings.fixed)}   
        >    
            
            <Box style={{position: 'relative'}} >  
                <Modal 
                    open={props.open}  
                    aria-labelledby="draggable-dialog-title"
                    onClose={props.handleClose} 
                >
                    <DialogContent>
                        <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                            <div className={classes.menu}  >
                                <Typography 
                                    component='p' 
                                    className={classes.menuTitle}
                                    id="draggable-dialog-title"
                                >
                                    Container Settings<OpenWithIcon/>
                                </Typography>
                    <FormGroup > 
                        <Typography  variant={'h6'} gutterBottom  >
                            Add item from libs
                        </Typography>
                        <Box>
                                <Box mr={2} mb={1} clone={true} >
                                    <Button 
                                        aria-controls="heading-menu" 
                                        aria-haspopup="true" 
                                        onClick={handleHeadingMenuClick}
                                        variant='contained'
                                        color="primary"
                                    >
                                        Heading
                                    </Button>
                                </Box>
                                
                                <Menu
                                    id="heading-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleHeadingMenuClose}
                                >
                                    <MenuItem value={0} onClick={(e) => {handleHeadingMenuClose(e.target.value, "heading")}} >Heading h1</MenuItem>
                                    <MenuItem value={1} onClick={(e) => {handleHeadingMenuClose(e.target.value, "heading")}} >Heading h2</MenuItem>
                                    <MenuItem value={2} onClick={(e) => {handleHeadingMenuClose(e.target.value, "heading")}} >Heading h3</MenuItem>
                                    <MenuItem value={3} onClick={(e) => {handleHeadingMenuClose(e.target.value, "heading")}} >Heading h4</MenuItem>
                                    <MenuItem value={4} onClick={(e) => {handleHeadingMenuClose(e.target.value, "heading")}} >Heading h5</MenuItem>
                                    <MenuItem value={5} onClick={(e) => {handleHeadingMenuClose(e.target.value, "heading")}} >Heading h6</MenuItem> 
                                </Menu>

                                <Box mr={2} mb={1} clone={true} >
                                    <Button
                                        onClick={() => {addHeading('p', 'paragraph');}}
                                        variant='contained'
                                        color="primary"
                                    >
                                        Paragraph
                                    </Button>
                                </Box>
                                <Box mr={2} mb={1} clone={true} >
                                    <Button
                                        onClick={() => {addHeading('p', 'paragraphImage');  }}
                                        variant='contained'
                                        color="primary" 
                                    >
                                        Paragraph-Image
                                    </Button>
                                </Box> 
                                <Box mr={2} mb={1} clone={true} >
                                    <Button
                                        onClick={() => {addHeading('list', 'list');  }}
                                        variant='contained'
                                        color="primary" 
                                    >
                                        List
                                    </Button>
                                </Box> 
                        </Box>

                    </FormGroup>

                    <Typography  variant={'h6'} gutterBottom  >
                        Settings 
                    </Typography>
                    <FormGroup row>
                        <FormControl 
                            variant='filled' 
                            size='small'   
                            className={classes.settingsItem}
                        >
                            <InputLabel id="dis-gutters-style-label">Disable Gutters</InputLabel>
                            <Select
                                labelId="dis-gutters-label"
                                id="dis-gutters-style"
                                value={settingGutter}
                                onChange={(e) => {setIsDisableBtn(false); setSettingGutter(e.target.value) }}
                            >
                                <MenuItem value={false}>False</MenuItem>
                                <MenuItem value={true}>True</MenuItem> 
                            </Select>
                        </FormControl>

                        

                        <FormControl 
                            variant='filled' 
                            size='small'   
                            className={classes.settingsItem}
                        >
                            <InputLabel id="fixed-style-label">Fixed</InputLabel>
                            <Select
                                labelId="fixed-label"
                                id="fixed-style"
                                value={settingFixed}
                                onChange={(e) => {setIsDisableBtn(false); setSettingFixed(e.target.value) }}
                            >
                                <MenuItem value={false}>False</MenuItem>
                                <MenuItem value={true}>True</MenuItem> 
                            </Select>
                        </FormControl>  
                    </FormGroup>
                    
                    <FormGroup row> 
                        <FormControl 
                            variant='filled' 
                            size='small'   
                            className={classes.settingsItem}
                        >
                            <InputLabel id="maxWidth-style-label">Max-Width</InputLabel>
                            <Select
                                labelId="maxWidth-label"
                                id="maxWidth-style"
                                value={settingMaxWidth}
                                onChange={(e) => {setIsDisableBtn(false); setSettingMaxWidth(e.target.value) }}
                            >
                                <MenuItem value={false}>False</MenuItem>
                                <MenuItem value={'xl'}>xl - 1920 </MenuItem> 
                                <MenuItem value={'lg'}>lg - 1280 </MenuItem> 
                                <MenuItem value={'md'}>md - 960 </MenuItem> 
                                <MenuItem value={'sm'}>sm - 600 </MenuItem> 
                                <MenuItem value={'xs'}>xs - 0 </MenuItem> 
                            </Select>
                        </FormControl>

                        <FormControl 
                            variant='filled' 
                            size='small'   
                            className={classes.settingsItem}
                        >
                            <InputLabel id="inner-container-style-label">Inner Container</InputLabel>
                            <Select
                                labelId="inner-container-label"
                                id="inner-container-style"
                                value={settingInnerContainer}
                                onChange={(e) => {setIsDisableBtn(false); setSettingInnerContainer(e.target.value) }}
                            >
                                <MenuItem value={false}>False</MenuItem>
                                <MenuItem value={true}>True</MenuItem> 
                            </Select>
                        </FormControl>
                    </FormGroup>
                    <FormGroup row> 
                            
                        <FormControl 
                            variant='filled' 
                            size='small'   
                            className={classes.settingsItem}
                        >
                            <InputLabel id="inner-container-style-label">Inner Paper Component</InputLabel>
                            <Select
                                labelId="inner-paper-label"
                                id="inner-paper-style"
                                value={settingIsPaper}
                                onChange={(e) => {setIsDisableBtn(false); setSettingIsPaper(e.target.value) }}
                            >
                                <MenuItem value={false}>False</MenuItem>
                                <MenuItem value={true}>True</MenuItem> 
                            </Select>
                        </FormControl>
                    </FormGroup>
                    
                    <Typography  variant={'h6'} gutterBottom  >
                        Styles 
                    </Typography>
                    <React.Fragment>
                        {/* display */}
                        <Box className={classes.inputGroup}>

                            <Tooltip title="Для корректной работы margin у элементов внутри контейнера рекомендуется оставить display: flex, flexDirection: column"  >
                                <IconButton>
                                    <InfoOutlined/>
                                </IconButton>
                            </Tooltip>
                            <Box display="flex" flexDirection="row"  > 
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
                                        <MenuItem value={'flex'}>Flex</MenuItem>  
                                    </Select>
                                </FormControl>
                                {
                                    display === 'flex' &&
                                    <FormControl 
                                        variant='filled' 
                                        size='small'   
                                        className={classes.inputNumber}
                                        fullWidth
                                    >
                                        <InputLabel id="direction-style-label">Flex Direction</InputLabel>
                                        <Select
                                            labelId="direction-style-label"
                                            id="direction-style"
                                            value={flexDirection}
                                            onChange={(e) => {setIsDisableBtn(false); setFlexDirection(e.target.value) }}
                                        >
                                            <MenuItem value={'row'}>Row</MenuItem>  
                                            <MenuItem value={'column'}>Column</MenuItem>  
                                            <MenuItem value={'row-reverse'}>Row Reverse</MenuItem>  
                                            <MenuItem value={'column-reverse'}>Column Reverse</MenuItem>  
                                        </Select>
                                    </FormControl>   
                                }
                            </Box>
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
                                    onChange={ (e) => { setIsDisableBtn(false); handleMargin(e, 'top');  } }     
                                />
                                <TextField 
                                    className={classes.inputNumber}
                                    type='number'
                                    label="Margin Bottom" 
                                    variant="filled" 
                                    size='small'  
                                    value={margin.bottom}
                                    onChange={ (e) => { setIsDisableBtn(false); handleMargin(e, 'bottom') } }     
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
                                    onChange={ (e) => { setIsDisableBtn(false); handlePadding(e, 'top') } }     
                                />
                                <TextField 
                                    className={classes.inputNumber}
                                    type='number'
                                    label="Padding Bottom" 
                                    variant="filled" 
                                    size='small'  
                                    value={padding.bottom}
                                    onChange={ (e) => {setIsDisableBtn(false); handlePadding(e, 'bottom') } }     
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
                        
                        {/* color */}
                        <Box className={classes.inputGroup} display="flex" flexDirection="row" > 
                            <FormControl 
                                variant='filled' 
                                size='small'   
                                className={classes.inputNumber}
                            >
                                <InputLabel id="shadow-style-label">Box Shadow</InputLabel>
                                <Select
                                    labelId="shadow-style-label"
                                    id="shadow-style"
                                    value={shadow}
                                    onChange={(e) => {setIsDisableBtn(false); setShadow(e.target.value) }}
                                >
                                    <MenuItem value={'none'}>None</MenuItem>
                                    <MenuItem value={`0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),
                                    0px 1px 5px 0px rgba(0,0,0,0.12)`}>Small</MenuItem>
                                    <MenuItem value={`0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),
                                    0px 3px 16px 2px rgba(0,0,0,0.12)`}>Medium</MenuItem>
                                    <MenuItem value={`0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),
                                    0px 9px 46px 8px rgba(0,0,0,0.12)`}>Large</MenuItem> 
                                </Select>
                            </FormControl> 
                            
                        </Box>
                            
                        {/* border */}
                        <Box className={classes.inputGroup}> 
                            <Box display="flex" flexDirection="row" > 
                                <Box className={classes.inputNumber} >
                                    <Typography  component={'p'} gutterBottom  >
                                        Border Color  -  { borderColor }
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

                        <Box  className={classes.btnSave}>
                            <Button
                                disabled={isDisableBtn}
                            
                                variant="contained"
                                color="primary"
                                size={'medium'} 
                                onClick={reSaveClassesSettings}
                            >
                                Save
                            </Button> 
                        </Box>
                        
                    </React.Fragment> 
                            </div>
                        </Draggable>
                    </DialogContent>
                </Modal> 
            </Box>                        
             
        </Box>
    )
}

export default ContainerElement
