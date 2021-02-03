import React from 'react' 

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
    IconButton, 
    Box,
    Tooltip, 
    Divider, 
    Typography,
    ButtonGroup,
    makeStyles,
    Modal,
    DialogContent,   
} from '@material-ui/core'

import OpenWithIcon from '@material-ui/icons/OpenWith';

import SettingsIcon from '@material-ui/icons/Settings';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import {DeleteOutline, InfoOutlined} from '@material-ui/icons'; 
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

import DumbComponent from "./DumbComponent"

import AddItem from './AddItem' 
import InputChange from '../../functions/InputChange';
  
import SelectPage from '../../functions/SelectPage';

function StyledComponent(props) {
    
    const [isDisableBtn, setIsDisableBtn] = React.useState(true)
    const [open, setOpen] = React.useState(false)
  
    const [heading, setHeading] = React.useState(props.data.heading)  
    const [slidesPerView, setSlidesPerView] = React.useState(props.data.slidesPerView || 4)
    const [slidesPerViewTablet, setSlidesPerViewTablet] = React.useState(props.data.slidesPerViewTablet || 3)
    const [slidesPerViewMobile, setSlidesPerViewMobile] = React.useState(props.data.slidesPerViewMobile || 1)
    const [spaceBetween, setSpaceBetween] = React.useState(props.data.spaceBetween || 30)
    const [speed, setSpeed] = React.useState(props.data.speed || 200)
    const [loop, setLoop] = React.useState(props.data.loop || false)
    const [freeMode, setFreeMode] = React.useState(props.data.freeMode || false)
    const [slides, setSlides] = React.useState(props.data.slides || []) 

    const [colorSelect,  setColorSelect] = React.useState(props.data.color || 'primary')
    const [colorCustom, setColorCustom] = React.useState(props.data.color || 'primary')

    const [marginTop, setMarginTop] = React.useState(props.data.marginTop || 50)
    const [marginBottom, setMarginBottom] = React.useState(props.data.marginBottom || 50)
    const [maxWidthContainer, setMaxWidthContainer] = React.useState(props.data.maxWidthContainer || 'lg') 
  
    const mobileMarginTopComputed = marginTop === 0 ? 0 : (marginTop > 50 ? marginTop*0.6 : 30)
    const mobileMarginBottomComputed = marginBottom === 0 ? 0 : (marginBottom > 50 ? marginBottom*0.6 : 30)

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

        const { menu, menuTitle, btnSetting, btnDrawerStyle, btnDrawerItem, containerWrapper, btnWithLabel, responseValues ,responseMobile , mobileTooltip, dialogContentUnstyle } = commonClasses 
 
        const { mtView, mbView } = commonStyle 

        return ({
            dialogContentUnstyle: dialogContentUnstyle,
            btnWithLabel: btnWithLabel, 
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
                left: 'calc( 50% - 450px )',
                maxWidth: 900,
                width: '100%',
            }}, 
            menuTitle: menuTitle,
            btnSetting: btnSetting,   
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
            slideContainer: { 
                display: 'inline-flex', 
                flexDirection: 'column', 

                padding: theme.spacing(1), 
                border: `1px solid ${theme.palette.divider}`, 
                marginRight: theme.spacing(0.5),
                marginBottom: theme.spacing(0.5), 
                maxWidth: 264,  
                '&:hover': {
                    "& $dumbSlideButtons" : {
                        opacity: 1
                    }
                }
            },
            dumbSlide: {
                display: 'inline-flex',
                flexDirection: 'column', 
                alignItems: 'center', 
                width: 250,   
                position: 'relative'
            },  
            dumbSlideButtons: {
                opacity: 0, 
                position: 'absolute', 
                top: 5, 
                right: 5, 
            },
            dumbSlideTitle: { 
                fontSize: 14, 
                lineHeight: 1.1,  
            }, 
            dumbSlideSvg: {
                width: 70, 
                height: 70, 
                borderRadius: 35, 
                padding: 10, 
                backgroundColor: theme.palette.text.disabled, 
                "& svg": {
                    width: '100%',
                    height: '100%',
                    fill: theme.palette.text.primary
                }
            },
            addSlide: { 
                padding: theme.spacing(1), 
                margin: theme.spacing(2, 0),
                border: `1px solid ${theme.palette.divider}`, 
            }, 
            tooltipReload: {
                fontSize: 14, 
                backgroundColor: theme.palette.warning.main
            }
        })
    })
    
    const classes = useStyles();

  
    const handleSave = () => {
        const newData = Object.assign({}, props.data)
        newData.heading = heading   
        newData.slidesPerView = slidesPerView   
        newData.slidesPerViewMobile = slidesPerViewMobile   
        newData.slidesPerViewTablet = slidesPerViewTablet   
        newData.spaceBetween = spaceBetween   
        newData.speed = speed   
        newData.loop = loop   
        newData.freeMode = freeMode   
        newData.slides = slides   

        newData.marginTop = marginTop   
        newData.marginBottom = marginBottom   
        newData.maxWidthContainer = maxWidthContainer   

        if (colorSelect === 'custom') {
            newData.color = colorCustom
        } else {
            newData.color = colorSelect
        }
 
        props.reSaveItem(props.data.id, newData) 
        setIsDisableBtn(true) 
    }
    const removeItem = () => {
        const conf = window.confirm('Delete? ') 

        if (conf)  {  
            props.removeContainer(props.data.id)
        }
            
    }

    const handleSlideSvg = (svg, index) => {
        let newSlides = slides.slice()

        newSlides[index].svg = svg 
        
        setSlides(newSlides) 
        setIsDisableBtn(false)
    }
     
    const handleChangeUrl = (activePage, index) => {  
        let newSlides = slides.slice()
   
        newSlides[index].activePage = activePage 
         
        setSlides(newSlides) 
        setIsDisableBtn(false)
    }
      
    const swipeSlide = (direction, index) => {
        let newSlides = []
        slides.forEach(element => {
            newSlides.push(JSON.parse(JSON.stringify(element)))
        });
        let activeIndex = index  
      
        if(direction === 'up' && activeIndex === 0) return  
        if(direction === 'down' && activeIndex === newSlides.length - 1 ) return
        
        if(direction === 'up') { 
          const movedItem = newSlides[activeIndex]
          const placeItem = newSlides[activeIndex - 1]
    
          newSlides[activeIndex] = placeItem
          newSlides[activeIndex - 1 ] = movedItem  
        }
        if(direction === 'down') {
          const movedItem = newSlides[activeIndex]
          const placeItem = newSlides[activeIndex + 1]
    
          newSlides[activeIndex] = placeItem
          newSlides[activeIndex + 1 ] = movedItem  
        }

        setSlides(newSlides) 
        setIsDisableBtn(false)
    }
    const removeSlide = (index) => { 
        const conf = window.confirm('Delete? ') 
        if(conf) {
            const newSlides = slides.slice() 
    
            newSlides.splice(index, 1)
            setSlides(newSlides) 
            setIsDisableBtn(false) 
        } 
    }
    const addSlide = ( svg, activePage ) => {
         
        const newSlides = slides.slice()
        const slide = {
            svg: svg,  
            activePage: activePage,   
            inner: []
        }
        newSlides.push(slide)
        setSlides(newSlides)
 
        setIsDisableBtn(false)

    }

    const slidesRender = () => (
        slides.map((item, index) => {   
            return (
                <Box key={index} className={classes.slideContainer}>  
                    <Box my={1}> 
                        <SelectPage value={item.activePage.id} setValue={handleChangeUrl} index={index} /> 
                    </Box> 
                    <Box my={2}>
                        <InputChange
                            id={index}
                            fullWidth={true}
                            type='text'
                            size="small"  
                            label="Set svg as html"
                            variant='outlined'
                            value={item.svg}
                            setValue={handleSlideSvg}
                            setIsDisableBtn={setIsDisableBtn} 
                        />  
                    </Box> 

                    {/* view */}
                    <Box  className={classes.dumbSlide}>
                        <Box className={classes.dumbSlideButtons}>
                            <ButtonGroup
                                orientation="horizontal"
                                color="primary"
                                aria-label="horizontal contained primary button group"
                                variant="contained"
                            >   
                                { 
                                    index !== 0  && 
                                    <Tooltip title='Get Left' placement='top'>
                                        <Button
                                            onClick={() => {  swipeSlide('up', index) }}
                                            size='medium'
                                            variant='contained' 
                                        >
                                            <KeyboardArrowLeftIcon
                                                style={{
                                                color: '#fff'
                                            }}
                                                fontSize='small'/>
                                        </Button>
                                    </Tooltip>
                                }
                                {
                                    index !== slides.length - 1 && 
                                    <Tooltip title='Get Right' placement='top'>
                                        <Button
                                            onClick={() => { swipeSlide('down', index) }}
                                            size='medium'
                                            variant='contained'
                                        >
                                            <KeyboardArrowRightIcon
                                                style={{
                                                color: '#fff'
                                            }}
                                                fontSize='small'/>
                                        </Button>
                                    </Tooltip>
                                }
                                <Tooltip title='Remove slide' placement='top'>
                                    <Button
                                        onClick={() => { removeSlide(index) }}
                                        size='medium'
                                        color='secondary'
                                        variant='contained'
                                    >
                                        <DeleteOutline
                                            style={{
                                            color: '#fff'
                                        }}
                                            fontSize='small'/>
                                    </Button>
                                </Tooltip>
                                
                            </ButtonGroup>
                        </Box> 
                        

                        <Box className={classes.dumbSlideSvg}>  
                            <span dangerouslySetInnerHTML={{__html: item.svg}}></span>
                        </Box>
                        <Box my={1} className={classes.dumbSlideTitle}>  
                             { item.activePage.title }
                        </Box>
                         
                    </Box>
                </Box>
                
            )
        })
    )

     
    return (
        <div className={classes.containerWrapper}>
            <Tooltip  title={`Swiper margin top`}  placement={'top'}>
                <div className={classes.mtView}></div>
            </Tooltip>
            <Tooltip  title={`Swiper margin bottom`}  placement={'top'}>
                <div className={classes.mbView}></div>
            </Tooltip>
            <Box style={{
                position: 'relative'
            }}>
                <Box className={classes.btnDrawerStyle}>
                    <Box display="flex" flexDirection="column">
                        <Box mb={1}>
                            <Tooltip title='Swiper Settings' placement='right'>
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
                                        id="draggable-dialog-title"
                                    >
                                        { !isDisableBtn && "Close to save - " } Settings Swiper
                                        <OpenWithIcon/>
                                    </Typography>
                                    <Box mt={2}>
                                        <InputChange
                                            id={null}
                                            fullWidth={true}
                                            type='text'
                                            size="medium" 
                                            label='Heading'
                                            variant='outlined'
                                            value={heading}
                                            setValue={setHeading}
                                            setIsDisableBtn={setIsDisableBtn}
                                            direction='row'
                                        />
                                    </Box>
                                    <Tooltip classes={{tooltip: classes.mobileTooltip}} title='Calculated styles for Mobile (<600px)' placement={'top'}>
                                        <Box className={`${classes.responseValues} ${classes.responseMobile}`}>
                                            <PhoneIphoneIcon/>
                                            <Box>  
                                                <p> 
                                                    MarginTop: <b>{mobileMarginTopComputed}</b>; 
                                                    MarginBottom: <b>{ mobileMarginBottomComputed}</b> ;   
                                                </p>        
                                            </Box>
                                        </Box>
                                    </Tooltip>
                                    <Box mr={1} my={2} display='inline-block' >
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
                                    <Box mr={1} my={2} display='inline-block' >
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
                                     
                                    <Box mb={2} display='flex'> 
                                        <Box mr={1}>
                                            <InputChange
                                                id={null}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label="Slides Per View Desktop"
                                                variant='outlined'
                                                value={slidesPerView}
                                                setValue={setSlidesPerView}
                                                setIsDisableBtn={setIsDisableBtn}
                                                direction='row'
                                            />  
                                        </Box>
                                        <Box mr={1}>
                                            <InputChange
                                                id={null}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label="Slides Per View Tablet"
                                                variant='outlined'
                                                value={slidesPerViewTablet}
                                                setValue={setSlidesPerViewTablet}
                                                setIsDisableBtn={setIsDisableBtn}
                                                direction='row'
                                            />   
                                        </Box>
                                        <Box mr={1}>
                                            <InputChange
                                                id={null}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label="Slides Per View Mobile"
                                                variant='outlined'
                                                value={slidesPerViewMobile}
                                                setValue={setSlidesPerViewMobile}
                                                setIsDisableBtn={setIsDisableBtn}
                                                direction='row'
                                            />   
                                        </Box>
                                        
                                    </Box>
                                    <Box mb={2} display='flex'>
                                        <Box mr={1}>
                                            <InputChange
                                                id={null}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label="Space Between"
                                                variant='outlined'
                                                value={spaceBetween}
                                                setValue={setSpaceBetween}
                                                setIsDisableBtn={setIsDisableBtn}
                                                direction='row'
                                            /> 
                                        </Box>
                                        <Box>
                                            <InputChange
                                                id={null}
                                                fullWidth={false}
                                                type='number'
                                                size="small" 
                                                label="Speed (ms)"
                                                variant='outlined'
                                                value={speed}
                                                setValue={setSpeed}
                                                setIsDisableBtn={setIsDisableBtn}
                                                direction='row'
                                            />  
                                        </Box>
                                    </Box>

                                    <Box my={2} display='flex'>
                                        <Box mr={1}> 
                                            <Tooltip classes={{tooltip: classes.tooltipReload}} title="After change Loop, Slides Per View, Space Between settings you need to reloading page" >
                                                <IconButton>
                                                    <InfoOutlined/>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        <Box mr={1}>
                                            <FormControl 
                                                variant='filled' 
                                                size='small'    
                                                style={{minWidth: 200}}
                                            >
                                                <InputLabel id="align-select-label">Loop</InputLabel>
                                                <Select
                                                    labelId="align-select-label"
                                                    id="align-select"
                                                    value={loop}
                                                    onChange={(e) => {setIsDisableBtn(false); setLoop((e.target.value)) }}
                                                >
                                                    <MenuItem value={true}>True</MenuItem>
                                                    <MenuItem value={false}>False</MenuItem> 
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box mr={1}>
                                            <FormControl 
                                                variant='filled' 
                                                size='small'   
                                                style={{minWidth: 200}} 
                                            >
                                                <InputLabel id="align-select-label">Free Mode</InputLabel>
                                                <Select
                                                    labelId="align-select-label"
                                                    id="align-select"
                                                    value={freeMode}
                                                    onChange={(e) => {setIsDisableBtn(false); setFreeMode((e.target.value)) }}
                                                >
                                                    <MenuItem value={true}>True</MenuItem>
                                                    <MenuItem value={false}>False</MenuItem> 
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box>
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
                                        </Box>

                                    </Box>

                                     
                                    <Box mt={2} display="flex" >
                                        <ColorSelecter
                                            label={'Color for Block'}
                                            colorSelect={colorSelect} 
                                            setColorSelect={setColorSelect}
                                            colorCustom={colorCustom}
                                            setColorCustom={setColorCustom}
                                            setIsDisableBtn={setIsDisableBtn} 
                                            position = {'top'}
                                            noInherit={true}
                                        /> 
                                    </Box>

                                    <Box my={2}> <Divider/> </Box>

                                    <Typography variant="h6">
                                        Slides
                                    </Typography>
                                    { !slides.length && <Typography variant='caption'> No Slides there </Typography> }
                                    {
                                        slidesRender()
                                    }

                                    <AddItem addSlide={addSlide} id={props.data.id} />
                                    
   
                                    <Box mt={5} />
                                    
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