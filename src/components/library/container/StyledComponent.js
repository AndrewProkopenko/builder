import React from 'react' 
import Draggable from 'react-draggable'; 

import StylesChangers from '../../../styles/changers'   
import StyledInputs from '../../../styles/inputs'   

import InputChange from '../../functions/InputChange';


import uuid from 'react-uuid' 
import ColorSelecter from '../../functions/colorChanger/ColorSelecter' 
import {isNoThemeColor} from '../../functions/colorChanger/ColorCalculation'
  
import { 
    MenuItem,   FormGroup,  Button,
    Box,  Menu, Tooltip,
    FormControl, InputLabel,
    Select, Typography, IconButton, 
    Modal, DialogContent, 
} from '@material-ui/core' 

import LibraryContext from '../../../context/libraryContext/LibraryContext' 

import { makeStyles } from '@material-ui/core/styles';  
import { InfoOutlined } from '@material-ui/icons';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import SelectShadow from '../../functions/SelectShadow';

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

    const [colorSelect,  setColorSelect] = React.useState(props.data.classes.color || 'inherit')
    const [colorCustom, setColorCustom] = React.useState(props.data.classes.color || 'inherit')

    const [backgroundSelect,  setBackgroundSelect] = React.useState(props.data.classes.backgroundColor || 'inherit')
    const [backgroundCustom, setBackgroundCustom] = React.useState(props.data.classes.backgroundColor || 'inherit')

    const [borderColorSelect,  setBorderColorSelect] = React.useState(props.data.classes.borderColor || 'inherit')
    const [borderColorCustom, setBorderColorCustom] = React.useState(props.data.classes.borderColor || 'inherit')
 
    const [shadow, setShadow] = React.useState(props.data.classes.boxShadow || 'none')
 
    const [borderStyle, setBorderStyle] = React.useState(props.data.classes.borderStyle ||  'solid')
    const [borderWidth, setBorderWidth] = React.useState(props.data.classes.borderWidth ||  0)
    const [borderRadius, setBorderRadius] = React.useState(props.data.classes.borderRadius ||  0)

    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 
  

    const [settingGutter, setSettingGutter] = React.useState(props.data.disableGutters)
    const [settingFixed, setSettingFixed] = React.useState(props.data.fixed)
    const [settingMaxWidth, setSettingMaxWidth] = React.useState(props.data.maxWidth)
    const [settingInnerContainer, setSettingInnerContainer] = React.useState(props.data.innerContainer || false ) 

    const [anchorEl, setAnchorEl] = React.useState(null); 
     

    const propsSettings = {
        maxWidth: settingMaxWidth,
        disableGutters: settingGutter,
        fixed: settingFixed,
        innerContainer: settingInnerContainer
    }

    const bgTheme = isNoThemeColor(props.data.classes.backgroundColor)
    const colorTheme = isNoThemeColor(props.data.classes.color)
    const borderTheme = isNoThemeColor(props.data.classes.borderColor)

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
        // eslint-disable-next-line
    }, [props.data.classes.backgroundColor, props.data.classes.color, props.data.classes.borderColor])

    const useStyles = makeStyles((theme) => {
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { btnSave, menu, menuTitle,  responseValues ,responseMobile , mobileTooltip, responseTablets, tabletTooltip, dialogContentUnstyle  } = commonClasses 
        const { inputNumber, inputGroup , settingsItem  } = commonStyle 
 
        
        return ({   
            dialogContentUnstyle:dialogContentUnstyle, 
            settingsItem: settingsItem,
            inputNumber: {...inputNumber, ...{
                // maxWidth: '50%'
            }}, 
            inputGroup: inputGroup,
            btnSave: btnSave,
            menu: {...menu, ...{
                left: "calc(50% - 300px)",
                width: 600, 
            } },
            menuTitle: menuTitle,

            responseValues: responseValues, 
            responseTablets: responseTablets,
            responseMobile: responseMobile,
            mobileTooltip: mobileTooltip,
            tabletTooltip: tabletTooltip,
        })
    })
    
    const classes = useStyles();
    
    const myClassName = {  
        paddingTop: padding.top,
        paddingBottom: padding.bottom, 
        marginTop: margin.top,
        marginBottom: margin.bottom,  
        borderStyle: borderStyle,
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        boxShadow: shadow, 
        display: display, 
        flexDirection: flexDirection  
    }  
     

    const handlePadding = (value, direction) => {  
        let newPadding = Object.assign({}, padding)
        newPadding[direction] = Number(value)
        setPadding(newPadding)  
 
    }
    const handleMargin = (value, direction) => {  
        let newMargin = Object.assign({}, margin)
        newMargin[direction] = Number(value)
        setMargin(newMargin)  
 
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
                newItem = JSON.parse(JSON.stringify(libraryHeading)); 
                newItem.id = uuid()
                newItem.variant = newItem.variant[variant] 
                newItem.text += " - " + newItem.variant 
                break;
            case 'paragraph' :   
                newItem = JSON.parse(JSON.stringify(libraryParagraph)); 
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
        if (backgroundSelect === 'custom') { myClassName.backgroundColor = backgroundCustom }
        else { myClassName.backgroundColor = backgroundSelect }
        
        if (colorSelect === 'custom') { myClassName.color = colorCustom } 
        else { myClassName.color = colorSelect }
        
        if (borderColorSelect === 'custom') { myClassName.borderColor = borderColorCustom } 
        else { myClassName.borderColor = borderColorSelect }

        props.reSaveContainerStyleSettings(props.data.id, myClassName, propsSettings)
        setIsDisableBtn(true);  
    } 

    const handleClose = () => {
        if(!isDisableBtn)reSaveClassesSettings()
        props.handleClose()
    } 
    
    
    
 
    return (
        <Box >    
            
            <Box style={{position: 'relative'}} >  
                <Modal 
                    open={props.open}  
                    aria-labelledby="draggable-dialog-title"
                    onClose={handleClose} 
                >
                    <DialogContent classes={{root: classes.dialogContentUnstyle}}>
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
                                <MenuItem value={'xl'}>xl - 1920 </MenuItem> 
                                <MenuItem value={'lg'}>lg - 1280 </MenuItem> 
                                <MenuItem value={'md'}>md - 960 </MenuItem> 
                                <MenuItem value={'sm'}>sm - 600 </MenuItem> 
                                <MenuItem value={'xs'}>xs - 0 </MenuItem>
                            </Select>
                        </FormControl>
                    </FormGroup>
                    
                    
                    <Typography  variant={'h6'} gutterBottom  >
                        Styles 
                    </Typography>
                    <React.Fragment>
                        <Tooltip classes={{tooltip: classes.tabletTooltip}} title='Calculated styles for Tablets (<960px)' placement={'top'}>
                            <Box className={`${classes.responseValues} ${classes.responseTablets}`}>
                                <TabletMacIcon/>
                                <Box>   
                                    <p> 
                                        MarginTop: <b> { margin.top*0.8 }</b>; 
                                        MarginBottom: <b>{margin.bottom * 0.8 }</b> ; 
                                        PaddingTop: <b>{padding.top * 0.8 }</b>  ; 
                                        PaddingBottom: <b>{padding.bottom * 0.8 }</b> 
                                    </p>     
                                </Box>
                            </Box>
                        </Tooltip>

                        <Tooltip classes={{tooltip: classes.mobileTooltip}} title='Calculated styles for Mobile (<600px)' placement={'top'}>
                            <Box className={`${classes.responseValues} ${classes.responseMobile}`}>
                                <PhoneIphoneIcon/>
                                <Box>  
                                    <p> 
                                        MarginTop: <b> { margin.top*0.5 }</b>; 
                                        MarginBottom: <b>{margin.bottom * 0.5 }</b> ; 
                                        PaddingTop: <b>{padding.top * 0.5 }</b>  ; 
                                        PaddingBottom: <b>{padding.bottom * 0.5 }</b> 
                                    </p>        
                                </Box>
                            </Box>
                        </Tooltip>
                        {/* display */}
                        <Box className={classes.inputGroup}>

                            <Tooltip title="For correct margin inside conteiner recomended:   display: flex, flexDirection: column"  >
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
                                <Box className={classes.inputNumber}>
                                    <InputChange
                                        id={'top'}
                                        fullWidth={true}
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
                                        fullWidth={true}
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
                        </Box>
                        
                        {/* padding */}
                        <Box className={classes.inputGroup}>
                            <Box display="flex" flexDirection="row" >
                                <Box className={classes.inputNumber}>
                                    <InputChange
                                        id={'top'}
                                        fullWidth={true}
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
                                        fullWidth={true}
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
                                    position = {'right'}
                                    noInherit={false}
                                />  
                            </Box>
                        </Box>
                        <Box  className={classes.inputGroup} display="flex" flexDirection="row" >  
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
                                    isContrastSelect={true}
                                />   
                                {colorSelect === 'contrast' && <Typography variant='caption' color='secondary' >Contast color don`t work with "inherit" background </Typography>}
                            </Box> 
                        </Box>
                        <Box className={classes.inputGroup} display="flex" flexDirection="row" >  
                            <Box className={classes.inputNumber} >
                                <ColorSelecter
                                    label={'Border Color'}
                                    colorSelect={borderColorSelect} 
                                    setColorSelect={setBorderColorSelect}
                                    colorCustom={borderColorCustom}
                                    setColorCustom={setBorderColorCustom}
                                    setIsDisableBtn={setIsDisableBtn} 
                                    position = {'right'}
                                    noInherit={false} 
                                />  
                            </Box> 
                        </Box>
                         
                        <Box className={classes.inputGroup} display="flex" flexDirection="row" > 
                            <SelectShadow
                                variant='filled' 
                                size='small'   
                                className={classes.inputNumber}
                                label='Shadow'
                                value={shadow}
                                setValue={setShadow}
                                setIsDisableBtn={setIsDisableBtn}
                            /> 
                        </Box>
                            
                        {/* border */}
                        <Box className={classes.inputGroup}> 
                            <Box display="flex" flexDirection="row" >  
                                <Box className={classes.inputNumber}>
                                    <InputChange
                                        id={'right'}
                                        fullWidth={true}
                                        type='number'
                                        size="small" 
                                        label="Border Radius" 
                                        variant='filled'
                                        value={borderRadius}
                                        setValue={setBorderRadius}
                                        setIsDisableBtn={setIsDisableBtn} 
                                    /> 
                                </Box> 
                            </Box>
                            <Box display="flex" flexDirection="row" >  
                                <Box className={classes.inputNumber}>
                                    <InputChange
                                        id={'right'}
                                        fullWidth={true}
                                        type='number'
                                        size="small" 
                                        label="Border Width" 
                                        variant='filled'
                                        value={borderWidth}
                                        setValue={setBorderWidth}
                                        setIsDisableBtn={setIsDisableBtn} 
                                    /> 
                                </Box> 
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

                        <Box mt={5} />
                        {/* <Box  className={classes.btnSave}>
                            <Button
                                disabled={isDisableBtn}
                            
                                variant="contained"
                                color="primary"
                                size={'medium'} 
                                onClick={reSaveClassesSettings}
                            >
                                Save
                            </Button> 
                        </Box> */}
                        
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
