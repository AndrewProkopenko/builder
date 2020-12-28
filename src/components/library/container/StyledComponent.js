import React from 'react' 
import uuid from 'react-uuid' 
import { TwitterPicker } from 'react-color';
 
import DumbComponent from './DumbComponent' 
  
import { 
    MenuItem,   FormGroup,  Button,
    Box,  Menu,   Drawer,  Tooltip,
    TextField, FormControl, InputLabel,
    Select,  Container, Typography, ButtonGroup, IconButton
} from '@material-ui/core'

import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
  
import LibraryContext from '../../../context/libraryContext/LibraryContext' 

import { makeStyles } from '@material-ui/core/styles';  
import { InfoOutlined } from '@material-ui/icons';

function ContainerElement(props) { 
    console.log('styled Container work')
    const { layouts } = React.useContext(LibraryContext)
    const libraryHeading = layouts.heading
    const libraryParagraph = layouts.paragraph
    const libraryParagraphImage = layouts.paragraphImage
  
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
 
    const [children, setChildren] = React.useState(props.data.children) 

    const [settingGutter, setSettingGutter] = React.useState(props.data.disableGutters)
    const [settingFixed, setSettingFixed] = React.useState(props.data.fixed)
    const [settingMaxWidth, setSettingMaxWidth] = React.useState(props.data.maxWidth)
    const [settingInnerContainer, setSettingInnerContainer] = React.useState(props.data.innerContainer || false )

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false)
     

    const propsSettings = {
        maxWidth: settingMaxWidth,
        disableGutters: settingGutter,
        fixed: settingFixed,
        innerContainer: settingInnerContainer
    }


    const useStyles = makeStyles((theme) => {
         
        console.log(theme)
        return ( {  
            btnDrawerStyle : {
                position: 'absolute', 
                top: 0, 
                left: 0, 
                zIndex: 10,   
                minWidth: 50, 
                opacity: 0, 
                transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn} opacity`,
            }, 
            containerWrapper: {
                position: 'relative', 
                outline: "1px solid #ffffff00", 
                transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn} outline`,
                '&:hover' : {
                    outlineColor: `${theme.palette.error.main}`,
                    '& $mtView' : { 
                        opacity: 1
                    },
                    '& $mbView' : { 
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
            settingsItem: {
                marginRight: 5, 
                marginBottom: 10, 
                flexGrow: 1
            },
            inputNumber: {
                flexGrow: 1, 
                margin: 5, 
                width: "100%", 
                maxWidth: '50%'
            }, 
            inputGroup: {
                border: "1px solid #f5f5f5", 
                padding: 3, 
                inputNumber: { 
                    maxWidth: "100%"
    
                }
            },
            btnSave: { 
                position: 'sticky', 
                zIndex: theme.zIndex.tooltip,
                bottom: 0, 
                left: 20, 
                right: 0,
                height: 80, 
                backgroundColor: '#fff', 
                
                '&>button': {
                    marginTop: 20, 
                    marginBottom: 30, 
                    opacity: 1,  
                    paddingLeft: 40, 
                    paddingRight: 40
                }
            }
            
        } )
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
     
    const toggleDrawer =  () => {  
        setOpen(!open)
    }; 

    const handleHeadingMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleHeadingMenuClose = (variant, type) => {
        setAnchorEl(null); 
        addHeading(variant, type)
    }; 
  
    const addHeading = async (variant, type) => { 
          
        let newChildren = children.slice()

        let newItem = {}
        

        switch(type) { 
            case 'heading' :  
                newItem = Object.assign({}, libraryHeading) 
                newItem.id = uuid()
                newItem.variant = newItem.variant[variant] 
                newItem.text += " - " + newItem.variant 
                break;
            case 'paragraph' :  
                console.log('paragraph')
                newItem = Object.assign({}, libraryParagraph)
                newItem.id = uuid() 
                break;
            case 'paragraphImage' :  
                console.log('paragraphImage')
                newItem = Object.assign({}, libraryParagraphImage)
                newItem.id = uuid() 
                break;
            default: break;
        }  

        newChildren.push(newItem) 
  
        setChildren(newChildren) 
 
        // save in firestore
        props.reSaveContainer(props.data.id, newChildren)
 
    } 

    const reSaveClassesSettings = () => {    
        props.reSaveContainerStyleSettings(props.data.id, myClassName, propsSettings)
        setIsDisableBtn(true); 
    } 
    
    const reSaveChildren = async (id, data) => {   
        let slicedChild = children.slice()
        slicedChild.forEach((item) => {
            if(item.id === id) {
                for( let key in item) { 
                    item[key] = data[key]
                } 
            }
        }) 
        // console.log(slicedChild)
        // save in firestore
        props.reSaveContainer(props.data.id, slicedChild)
 
    }

    const removeItem = async (id) => {
        let conf = window.confirm("Delete ?");
 
        if(conf) {
            
            let filtered = children.filter((item) => (item.id !== id))  
            setChildren(filtered) 
            
            // save in firestore
            props.reSaveContainer(props.data.id, filtered) 
        }
    }

    const removeContainer = () => { 
        props.removeContainer(props.data.id)
    }

    const swapContainer = (direction, id) => { 
        props.swapContainer(direction, id)
    }
    

    return (
        <Container 
            maxWidth={propsSettings.maxWidth} 
            fixed={propsSettings.fixed} 
            disableGutters={true}
            className={classes.containerWrapper} 
        >    
            <div className={classes.mtView}></div>
            <div className={classes.mbView}></div>
            <Box style={{position: 'relative'}} > 
                {/*  DrawerContainer */}
                <Box className={classes.btnDrawerStyle}>
                    
                    <ButtonGroup
                        orientation="vertical"
                        color="primary"
                        aria-label="vertical contained primary button group"
                        variant="contained"
                    > 
                        <Tooltip title='Container Settings' placement='right'>
                            <Button  
                                onClick={toggleDrawer} 
                                size='medium'
                                variant='contained'
                                color='primary'
                                
                            >  
                                <SettingsIcon style={{ color: '#fff' }} fontSize='small'/>
                            </Button>
                        </Tooltip>
                        <Tooltip title='Get Up' placement='right'>
                            <Button   
                                onClick={() => { swapContainer('up', props.data.id) }}
                                size='medium'
                                variant='contained'
                                color='primary' 
                            >  
                                <ExpandLessOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>   
                            </Button>
                        </Tooltip> 
                        <Tooltip title='Get Down' placement='right'>
                            <Button   
                                onClick={() => { swapContainer('down', props.data.id) }}
                                size='medium'
                                variant='contained'
                                color='primary' 
                            >     
                                <ExpandMoreOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>
                            </Button>
                        </Tooltip> 
 
                    </ButtonGroup>
                </Box>
                     
                    <Drawer anchor={'left'} open={open} onClose={toggleDrawer}>
                         
                            <Box  
                                pt={3}
                                pb={10} 
                                px={2}
                                maxWidth={600}    
                                position={'relative'}
                            > 
                                <FormGroup> 
                                    <Typography   variant={'h6'} gutterBottom  >
                                        Container actions 
                                    </Typography>
                                   <Box mb={2}> 
                                        {/* <Button
                                            // onClick={addContainer}
                                            variant='outlined'
                                            color="primary" 
                                            disabled={true}
                                            
                                        >
                                            Add Container
                                        </Button>   */}
                                        <Button
                                            onClick={removeContainer}
                                            variant='outlined'
                                            color="secondary" 
                                            // disabled={true}
                                        >
                                            Remove Container
                                        </Button> 
                                   </Box>
                                </FormGroup>
                                
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
                                                    variant='outlined'
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
                                                    onClick={() => {addHeading('p', 'paragraph')}}
                                                    variant='outlined'
                                                    color="primary"
                                                >
                                                    Paragraph
                                                </Button>
                                            </Box>
                                            <Box mr={2} mb={1} clone={true} >
                                                <Button
                                                    onClick={() => {addHeading('p', 'paragraphImage')}}
                                                    variant='outlined'
                                                    color="primary" 
                                                >
                                                    Paragraph-Image
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
                                
                                        <Box 
                                            className={classes.inputNumber}
                                        >
                                             <Typography  component={'h6'} gutterBottom  >
                                                Background  
                                            </Typography>
                                            <TwitterPicker
                                                width={'100%'}
                                                triangle={'hide'}
                                                colors={[   '#f44336', '#4e36f4', '#36f477', 'rgb(244, 214, 54)']} 
                                                onChangeComplete={(newColor) => {
                                                    setIsDisableBtn(false);
                                                    setBackgroundColor(newColor.hex) 
                                                }}

                                            /> 
                                        </Box> 
                                        <Box 
                                            className={classes.inputNumber}
                                        >
                                            <Typography component={'h6'} gutterBottom  >
                                                Color text
                                            </Typography>
                                            <TwitterPicker
                                                width={'100%'}
                                                triangle={'hide'}
                                                colors={[   '#f44336', '#4e36f4', '#36f477', 'rgb(244, 214, 54)']} 
                                                onChangeComplete={(newColor) => {
                                                    setIsDisableBtn(false);
                                                    setColor(newColor.hex) 
                                                }} 
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

                            </Box> 
                    </Drawer>
                {/*  DrawerContainer */} 
            </Box>                        
                <DumbComponent
                    reSaveChildren={reSaveChildren}
                    removeItem={removeItem}
                    data={props.data} 
                    classes={myClassName}
                    settings={propsSettings}
                />  
           
        </Container>
    )
}

export default ContainerElement
