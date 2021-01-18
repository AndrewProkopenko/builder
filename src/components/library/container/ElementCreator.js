import React from 'react' 

import StylesChangers from '../../../styles/changers'   
import StyledInputs from '../../../styles/inputs'   

import { makeStyles, Box, Tooltip, ButtonGroup, Button  } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import { DeleteOutline } from '@material-ui/icons';

import StyledComponent from "./StyledComponent"
import DumbComponent from "./DumbComponent"
 
import ModeContext from '../../../context/modeContext/ModeContext'
import ImageContext from '../../../context/imageContext/ImageContext'

 
function ElementCreator(props) {

    const {modeDev} = React.useContext(ModeContext)   
    const {removeImage} = React.useContext(ImageContext)   

    const [open, setOpen] = React.useState(false)
    
    const propsSettings = {
        maxWidth: props.data.maxWidth,
        disableGutters: props.data.disableGutters,
        fixed: props.data.fixed, 
        innerContainer: props.data.innerContainer,
        isPaper : props.data.isPaper
    } 

    const useStyles = makeStyles((theme) => {
        const styleRef = StyledInputs()
        const commonStyle = styleRef(theme)
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { containerWrapper, btnDrawerItem, btnDrawerStyle } = commonClasses 
        const { mtView, mbView, ptView, pbView } = commonStyle 
        return ({
            containerWrapper: {
                 ...containerWrapper, ...{
                '&:hover' : {
                    outlineColor: `${theme.palette.error.main}`,
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
                    '& $btnDrawerStyle' : { 
                        opacity: 1
                    },  
                }}    
            },
            btnDrawerStyle : btnDrawerStyle, 
            btnDrawerItem: btnDrawerItem,
            mtView: { ...mtView, ...{
                top: `-${props.data.classes.marginTop}px`,  
                height: `${props.data.classes.marginTop}px`
                } 
            },
            mbView: { ...mbView, ...{
                bottom: `-${props.data.classes.marginBottom}px`,
                height: `${props.data.classes.marginBottom}px`,  
                } 
            }, 
            ptView: { ...ptView, ...{
                height: `${props.data.classes.paddingTop}px`} 
            }, 
            pbView: { ...pbView, ...{
                height: `${props.data.classes.paddingBottom}px`} 
            }, 
              
        })
    })

    const classes = useStyles();

   
    const reSaveChildren = (id, data) => {   
        const newArr =  props.data.children.map((item) => item.id === id ? { ...data} : item);
        // let slicedChild = props.data.children.slice()
        // slicedChild.forEach((item) => {
        //     if(item.id === id) {
        //         for( let key in item) { 
        //             item[key] = data[key]
        //         } 
        //     }
        // })  
        // save in firestore
        props.reSaveContainer(props.data.id, newArr)
 
    }

    const removeItem = async (id) => { 

        let filtered = props.data.children.filter((item) => (item.id !== id))  
        console.log(props.data.children, filtered)
        // save in firestore 
        props.reSaveContainer(props.data.id, filtered)   
    }

    const toggleDrawer =  () => {  
        setOpen(!open)
    }; 
     
    const removeContainer = () => { 
        const conf = window.confirm('Delete? ')
        if(conf) {
            let images = createArrayImages() 
            images.forEach( imageName => {
                removeImage(imageName)
            })
            props.removeContainer(props.data.id)
        }
    }
    
    const createArrayImages = () => {
        let images = []
        props.data.children.forEach( item => {
            if(item.type === 'paragraphImage') {
                images.push(item.image.imageName)
            }
        })
        return images
    }
    createArrayImages()
    return (    
        <React.Fragment>   
            { 
                modeDev ? 
                <Box className={classes.containerWrapper}>
                    <Tooltip  title={` container margin top`}  placement={'top'}>
                        <div className={classes.mtView}></div>
                    </Tooltip>
                    <Tooltip  title={` container margin bottom`}  placement={'top'}>
                        <div className={classes.mbView}></div>
                    </Tooltip> 
                    <Tooltip  title={` container padding top`}  placement={'top'}>
                        <div className={classes.ptView}></div>
                    </Tooltip> 
                    <Tooltip  title={` container padding bottom`}  placement={'top'}>
                        <div className={classes.pbView}></div>
                    </Tooltip>

                    <Box className={classes.btnDrawerStyle}> 
                        <ButtonGroup
                            orientation="vertical"
                            color="secondary"
                            aria-label="vertical contained primary button group"
                            variant="contained"
                        > 
                            <Tooltip title='Container Settings' placement='right'>
                                <Button  
                                    onClick={toggleDrawer} 
                                    size='medium'
                                    variant='contained' 
                                    className={classes.btnDrawerItem}
                                >   
                                    <SettingsIcon style={{ color: '#fff' }} fontSize='small'/>
                                </Button>
                            </Tooltip> 
                            { 
                                !props.isFirst  &&
                                <Tooltip title='Get Up' placement='right'>
                                    <Button   
                                        onClick={() => { props.swapContainer('up', props.data.id) }}
                                        size='medium'
                                        color='secondary'
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
                                    onClick={ removeContainer }
                                    size='medium'
                                    variant='contained' 
                                    className={classes.btnDrawerItem}
                                >     
                                    <DeleteOutline style={{ color: '#fff' }} fontSize='small'/>
                                </Button>
                            </Tooltip> 
                        </Box>
                    </Box>

                    <StyledComponent   
                        data={props.data} 
                        reSaveContainer={props.reSaveContainer}
                        reSaveContainerStyleSettings={props.reSaveContainerStyleSettings}  
                        swapContainer={props.swapContainer}
                        propsSettings={propsSettings}
                        open={open}
                        toggleDrawer={toggleDrawer}
                    />
                    <DumbComponent 
                        data={props.data}  
                        classes={props.data.classes}
                        reSaveContainer={props.reSaveContainer} 
                        settings={propsSettings}
                        reSaveChildren={reSaveChildren}
                        removeItem={removeItem}   
                    />
                </Box>
                :
                <DumbComponent 
                    data={props.data}  
                    classes={props.data.classes}
                    reSaveContainer={props.reSaveContainer} 
                    settings={propsSettings}
                />
            }
        </React.Fragment> 
    )
}

export default ElementCreator
