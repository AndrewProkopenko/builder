import React from 'react' 

import StylesChangers from '../../../styles/changers'   
import StyledInputs from '../../../styles/inputs'   

import { makeStyles, Box, Tooltip, ButtonGroup, Button  } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import { DeleteOutline } from '@material-ui/icons';

import Modal from "./Modal"
import DumbComponent from "./DumbComponent"
  
 
import Confirm from '../../utilits/Confirm' 
import {RemoveImage} from '../../functions/RemoveImage' 

function StyledComponent(props) {
 

    const [open, setOpen] = React.useState(false)

    const [isVisibleConfirm, setIsVisibleConfirm] = React.useState(false)  
    
    const propsSettings = {
        maxWidth: props.data.maxWidth,
        disableGutters: props.data.disableGutters,
        fixed: props.data.fixed, 
        innerContainer: props.data.innerContainer, 
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
                    zIndex: 25,
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
        
        // save in firestore
        props.reSaveContainer(props.data.id, newArr)
 
    }

    const removeItem = async (id) => { 

        let filtered = props.data.children.filter((item) => (item.id !== id))   
        // save in firestore 
        props.reSaveContainer(props.data.id, filtered)   
    }

    const handleClose =  () => {  
        setOpen(!open)
    }; 
     
    const removeContainer = () => { 
        setIsVisibleConfirm(true) 
    }

    const handleConfirmClick = () => {
        let images = createArrayImages() 
        images.forEach( imageName => {
            RemoveImage(imageName)
        })
        props.removeContainer(props.data.id)
    }

    const swapChildrens = (direction, id) => {  

        let newChildren = props.data.children.slice() 
        let activeIndex  
        newChildren.map( (item) => { 
            if(item.id === id) {
              activeIndex = newChildren.indexOf(item) 
            }
            return 0 
        }) 
      
        if(direction === 'up' && activeIndex === 0) return  
        if(direction === 'down' && activeIndex === newChildren.length - 1 ) return
        
        if(direction === 'up') { 
          const movedItem = newChildren[activeIndex]
          const placeItem = newChildren[activeIndex - 1]
    
          newChildren[activeIndex] = placeItem
          newChildren[activeIndex - 1 ] = movedItem  
        }
        if(direction === 'down') {
          const movedItem = newChildren[activeIndex]
          const placeItem = newChildren[activeIndex + 1]
    
          newChildren[activeIndex] = placeItem
          newChildren[activeIndex + 1 ] = movedItem  
        } 
 
        props.reSaveContainer(props.data.id, newChildren)
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

    return (     
        <Box className={classes.containerWrapper}>
            
            <Confirm
                isVariable={false}
                show={isVisibleConfirm}
                setShow={setIsVisibleConfirm} 
                title={'Remove container'}
                text={"You can't cancel this action."}
                removeText={"remove"}
                handleRemoveClick={handleConfirmClick}
            />
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
                            onClick={handleClose} 
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

            <Modal   
                data={props.data} 
                reSaveContainer={props.reSaveContainer}
                reSaveContainerStyleSettings={props.reSaveContainerStyleSettings}  
                swapContainer={props.swapContainer}
                propsSettings={propsSettings}
                open={open}
                handleClose={handleClose}
            />
            <DumbComponent 
                data={props.data}  
                classes={props.data.classes}
                reSaveContainer={props.reSaveContainer} 
                settings={propsSettings}
                reSaveChildren={reSaveChildren}
                removeItem={removeItem}   
                swapChildrens={swapChildrens}
            />
        </Box>
            
    )
}

export default StyledComponent
