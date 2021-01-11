import React from 'react'
import firebase from '../../../firebase/firebase'
import Draggable from 'react-draggable';  
 
import { 
    Button, Box, Tooltip, TextField, Typography, ButtonGroup, makeStyles, Modal, DialogContent
} from '@material-ui/core'

import OpenWithIcon from '@material-ui/icons/OpenWith';

import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'; 
import { DeleteOutline } from '@material-ui/icons';

import DumbComponent from "./DumbComponent"

function StyledComponent(props) {
 
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 
    const [open, setOpen] = React.useState(false)

    const [location, setLocation] = React.useState(props.data.location)
    const [phone, setPhone] = React.useState(props.data.phone)
    const [paragraph, setParagraph] = React.useState(props.data.paragraph || '')
    const [inputName, setInputName] = React.useState(props.data.inputName || '')
    const [inputPhone, setInputPhone] = React.useState(props.data.inputPhone || '')
    const [inputComment, setInputComment] = React.useState(props.data.inputComment || '')
    const [buttonText, setButtonText] = React.useState(props.data.buttonText || '')
    const [policy, setPolicy] = React.useState(props.data.policy || '')

    const [mapFrame, setMapFrame] = React.useState(props.data.mapFrame) 


    
    const handleOpen = () => {  
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    

    const useStyles = makeStyles((theme) => ({
        btnDrawerStyle : { 
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
        containerWrapper: {
            position: 'relative', 
            outline: "1px solid #ffffff00", 
            transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn} outline`,
            '&:hover' : {
                outlineColor: `${theme.palette.error.main}`,
                 
                '& $btnDrawerStyle': {
                    opacity: 1
                }
            },   
            
        },
        menu: {    
            position: "absolute", 
            left: 50,
            top: 50, 
            backgroundColor: theme.palette.background.paper, 
            padding: 10 , 
            paddingBottom: 0, 
            maxWidth: '100% ',  
            width: 'calc( 100% - 100px )',
            maxHeight: 'calc(100vh - 100px)', 
            minHeight: 500,
            overflowY: 'scroll',  
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
        btnSave: { 
            position: 'sticky', 
            zIndex: theme.zIndex.tooltip,
            bottom: 0, 
            left: 0, 
            right: 0,
            height: 80, 
            backgroundColor: theme.palette.background.paper, 
            
            '&>button': {
                marginTop: 20, 
                marginBottom: 30, 
                opacity: 1,  
                paddingLeft: 40, 
                paddingRight: 40
            }
        },
      
    }))
    
    const classes = useStyles();
 
    const handleSave = () => {
        const newData = Object.assign({}, props.data) 
        newData.location = location
        newData.phone = phone 
        newData.paragraph = paragraph 
        newData.inputName = inputName 
        newData.inputPhone = inputPhone 
        newData.inputComment = inputComment 
        newData.buttonText = buttonText 
        newData.policy = policy 
        newData.mapFrame = mapFrame === '' ? null : mapFrame 
  
        props.reSaveItem(props.data.id, newData) 
        handleClose()
    }
    const removeItem = () => {
        const conf = window.confirm('Delete? ')
        if(conf) props.removeContainer(props.data.id)
    }

    return (
        <div className={classes.containerWrapper}>
            <Box style={{position: 'relative'}} >  
                <Box className={classes.btnDrawerStyle}> 
                    <Box display="flex" flexDirection="column"> 
                        <Box mb={1}>
                            <Tooltip title='Contacts Map Settings' placement='right'>
                                <Button  
                                    onClick={handleOpen} 
                                    size='medium'
                                    variant='contained' 
                                    className={classes.btnDrawerItem}
                                >   
                                    <SettingsIcon style={{ color: '#fff' }} fontSize='small'/>
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
                                        onClick={() => { props.swapContainer('up', props.data.id) }}
                                        size='medium'
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
                                    onClick={removeItem}
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
                        open={open}  
                        aria-labelledby="draggable-dialog-title"
                        onClose={handleClose} 
                    > 
                        <DialogContent> 
                            <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                                <div className={classes.menu}>
                                    <Typography 
                                        component='p' 
                                        className={classes.menuTitle}
                                        id="draggable-dialog-title"
                                    >
                                        Настройки контактов  <OpenWithIcon/>
                                    </Typography> 
                                    <Box mt={2}>  
                                        <TextField  
                                            fullWidth
                                            type='text'
                                            label="Location" 
                                            size='small'
                                            variant="outlined"  
                                            value={location}
                                            onChange={ (e) => { setIsDisableBtn(false); setLocation(e.target.value) } }     
                                        />
                                    </Box>  
                                    <Box mt={2} >   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Phone" 
                                            size='small'
                                            variant="outlined"  
                                            value={phone}
                                            onChange={ (e) => { setIsDisableBtn(false);  setPhone(e.target.value)  } }     
                                        />
                                    </Box> 
                                    <Box mt={2} >   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Paragraph" 
                                            size='small'
                                            variant="outlined"  
                                            value={paragraph}
                                            onChange={ (e) => { setIsDisableBtn(false);  setParagraph(e.target.value)  } } 
                                              
                                        />
                                    </Box> 
                                    <Box mt={2} >   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Input Name Placeholder" 
                                            size='small'
                                            variant="outlined"      
                                            value={inputName}
                                            onChange={ (e) => { setIsDisableBtn(false);  setInputName(e.target.value)  } }   
                                        />
                                    </Box> 
                                    <Box mt={2} >   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Input Phone Placeholder" 
                                            size='small'
                                            variant="outlined"  
                                            value={inputPhone}
                                            onChange={ (e) => { setIsDisableBtn(false);  setInputPhone(e.target.value)  } }     
                                        />
                                    </Box> 
                                    <Box mt={2} >   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Input Comment Placeholder" 
                                            size='small'
                                            variant="outlined" 
                                            value={inputComment}
                                            onChange={ (e) => { setIsDisableBtn(false);  setInputComment(e.target.value)  } }     
                                        />
                                    </Box> 
                                    <Box mt={2} >   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Button Text" 
                                            size='small'
                                            variant="outlined"  
                                            value={buttonText}
                                            onChange={ (e) => { setIsDisableBtn(false);  setButtonText(e.target.value)  } }     
                                        />
                                    </Box> 
                                    <Box mt={2} >   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Policy Text" 
                                            size='small'
                                            variant="outlined"  
                                            value={policy}
                                            onChange={ (e) => { setIsDisableBtn(false);  setPolicy(e.target.value)  } }     
                                        />
                                    </Box> 
                                    <Box mt={2} mb={2}>   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Map Frame" 
                                            variant="outlined"  
                                            value={mapFrame}
                                            onChange={ (e) => { setIsDisableBtn(false);  setMapFrame(e.target.value)  } }     
                                        />
                                    </Box> 
                                    { 
                                        !mapFrame && 
                                        <Typography color='secondary'>
                                            If <b>Map Frame</b> is null layout have another view!
                                        </Typography>
                                    } 
                                    <Box className={classes.btnSave}>
                                        <Button
                                            disabled={isDisableBtn}
                                        
                                            variant="contained"
                                            color="primary"
                                            size={'medium'} 
                                            onClick={handleSave}
                                        >
                                            Save
                                        </Button> 
                                    </Box>
                                </div>
                            </Draggable>
                        </DialogContent> 
                    </Modal>  
                </Box>
            </Box>
            <DumbComponent data={props.data} />
        </div>
    )
}

export default StyledComponent
