import React from 'react' 

import { makeStyles, Box, Tooltip, ButtonGroup, Button  } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import { DeleteOutline } from '@material-ui/icons';

import StyledComponent from "./StyledComponent"
import DumbComponent from "./DumbComponent"
 
import ModeContext from '../../../context/modeContext/ModeContext'

 
function ElementCreator(props) {

    const {modeDev} = React.useContext(ModeContext)   

    const [open, setOpen] = React.useState(false)
    
    const propsSettings = {
        maxWidth: props.data.maxWidth,
        disableGutters: props.data.disableGutters,
        fixed: props.data.fixed, 
        innerContainer: props.data.innerContainer,
        isPaper : props.data.isPaper
    } 

    const useStyles = makeStyles((theme) => ({
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
                '& $ptView' : { 
                    opacity: 1
                },
                '& $pbView' : { 
                    opacity: 1
                }, 
                '& $btnDrawerStyle' : { 
                    opacity: 1
                }, 
                 
            },    
        },
        btnDrawerStyle : {
            // backgroundColor: theme.palette.error.dark, 
            position: 'absolute',  
            top: 0, 
            left: 0, 
            zIndex: 1030,   
            minWidth: 50, 
            opacity: 0, 
            transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn} opacity`,
        }, 
        btnDrawerItem: { 
            backgroundColor: theme.palette.error.dark, 
            '&:hover': { 
                backgroundColor: theme.palette.secondary.dark,   
            }, 
        },
        mtView: {  
            position: 'absolute', 
            top: `-${props.data.classes.marginTop}px`, 
            left: 0, 
            right: 0,
            zIndex: 10, 
            backgroundColor: '#fff7003d',
            height: `${props.data.classes.marginTop}px`, 
            opacity: 0,
            transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeIn} opacity`
        },
        mbView: {  
            position: 'absolute', 
            bottom: `-${props.data.classes.marginBottom}px`, 
            left: 0, 
            right: 0,
            zIndex: 10, 
            backgroundColor: '#fff7003d',
            height: `${props.data.classes.marginBottom}px`, 
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
            height: `${props.data.classes.paddingTop}px`, 
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
            height: `${props.data.classes.paddingBottom}px`, 
            opacity: 0,
            transition: `180ms ${theme.transitions.easing.easeIn} opacity`
        },
    }))

    const classes = useStyles();

    const reSaveChildren = async (id, data) => {   
        let slicedChild = props.data.children.slice()
        slicedChild.forEach((item) => {
            if(item.id === id) {
                for( let key in item) { 
                    item[key] = data[key]
                } 
            }
        })  
        // save in firestore
        props.reSaveContainer(props.data.id, slicedChild)
 
    }

    const removeItem = async (id) => {
        let conf = window.confirm("Delete ?");
 
        if(conf) { 
            let filtered = props.data.children.filter((item) => (item.id !== id))  
            // setChildren(filtered) 
  
            // save in firestore 
            props.reSaveContainer(props.data.id, filtered)  
        }
    }

    const toggleDrawer =  () => {  
        setOpen(!open)
    }; 
     
    const removeContainer = () => { 
        const conf = window.confirm('Delete? ')
        if(conf) props.removeContainer(props.data.id)
    }
    
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
