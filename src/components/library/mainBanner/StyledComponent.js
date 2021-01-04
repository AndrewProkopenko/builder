import React from 'react'
import firebase from '../../../firebase/firebase'
import Draggable from 'react-draggable';  

import { 
    MenuItem,Button, Box, Tooltip, TextField, FormControl, InputLabel,
    Select, Typography, ButtonGroup, makeStyles, Modal, DialogContent
} from '@material-ui/core'

import OpenWithIcon from '@material-ui/icons/OpenWith';

import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import DumbComponent from "./DumbComponent"

function StyledComponent(props) {

        
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 
    const [open, setOpen] = React.useState(false)

    const [heading, setHeading] = React.useState(props.data.heading)
    const [subHeading, setSubHeading] = React.useState(props.data.headingIcon.title)
    const [paragraph, setParagraph] = React.useState(props.data.paragraph)
    const [inputLabel, setInputLabel] = React.useState(props.data.form.inputLabel)
    const [buttonLabel, setButtonLabel] = React.useState(props.data.form.buttonLabel)
    const [policy, setPolicy] = React.useState(props.data.form.policy)

    const [colorSelect, setColorSelect] = React.useState(props.data.color)
    const [colorCustom, setColorCustom] = React.useState(props.data.color)

    const [imageUrl, setImageUrl] = React.useState(props.data.image)
    const [iconUrl, setIconUrl] = React.useState(props.data.headingIcon.icon)


    
    const handleOpen = () => {  
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if(props.data.color !== 'primary' && props.data.color !== 'secondary' ) { 
            console.log(props.data.color)
            setColorSelect('custom')
        }
    }, []) 

    const useStyles = makeStyles((theme) => ({
        btnDrawerStyle : {
            backgroundColor: theme.palette.error.dark, 
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
        }
    }))
    
    const classes = useStyles();

    const handleImageUpload = async (e, imageType) => { 
        const imageData = e.target.files[0]
        const storageRef = firebase.storage.ref(`${imageData.name}`).put(imageData)
        storageRef.on('state-changed', 
          snapshot => {
            console.log( snapshot )
          }, 
          error => {
            console.log(error.message )
          },
          () => {  
            storageRef.snapshot.ref.getDownloadURL()
              .then( url => {
                  if(imageType === 'icon') setIconUrl(url)

                  if(imageType === 'mainImage') setImageUrl(url) 
              })
          }
        ) 
        setIsDisableBtn(false)
    }
    const handleSave = () => {
        const newData = Object.assign({}, props.data) 
        newData.heading = heading
        newData.paragraph = paragraph
        newData.headingIcon = {
            title: subHeading,
            icon : iconUrl
        }  
        newData.form = {
            inputLabel: inputLabel,
            buttonLabel: buttonLabel,
            policy: policy 
        }
        newData.image = imageUrl

        if(colorSelect === 'custom') {
            newData.color = colorCustom
        } else {
            newData.color = colorSelect
        }
  
        props.reSaveItem(props.data.id, newData) 
        handleClose()
    }

    return (
        <div className={classes.containerWrapper}>
            <Box style={{position: 'relative'}} >  
                <Box className={classes.btnDrawerStyle}> 
                    <ButtonGroup
                        orientation="vertical"
                        color="secondary"
                        aria-label="vertical contained primary button group"
                        variant="contained"
                    > 
                        <Tooltip title='Main Banner Settings' placement='right'>
                            <Button  
                                onClick={handleOpen} 
                                size='medium'
                                variant='contained' 
                                className={classes.btnDrawerItem}
                            >   
                                <SettingsIcon style={{ color: '#fff' }} fontSize='small'/>
                            </Button>
                        </Tooltip>
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
 
                    </ButtonGroup>
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
                                        Настройки банера <OpenWithIcon/>
                                    </Typography> 
                                    <Box mt={2}>  
                                        <TextField  
                                            fullWidth
                                            type='text'
                                            label="Main Heading" 
                                            variant="outlined"  
                                            value={heading}
                                            onChange={ (e) => { setIsDisableBtn(false); setHeading(e.target.value) } }     
                                        />
                                    </Box> 
                                    <Box display="flex" mt={3}>   
                                        <Box display="flex" mr={2} minWidth={150} >
                                            <Button> 
                                                <label htmlFor='imageIcon-input-label'> Set Icon </label>
                                                <input 
                                                    id="imageIcon-input-label"
                                                    type="file" 
                                                    onChange={(e) => { handleImageUpload(e, 'icon')}} 
                                                    style={{ display: "none" }}
                                                />
                                            </Button>
                                            <img src={iconUrl} alt='icon' width={35} />
                                            
                                        </Box> 
                                        <TextField  
                                            fullWidth
                                            type='text'
                                            label="Sub Heading" 
                                            variant="outlined" 
                                            size='small'  
                                            value={subHeading}
                                            onChange={ (e) => { setIsDisableBtn(false); setSubHeading(e.target.value)  } }     
                                        />
                                    </Box> 
                                    <Box mt={3} mb={3}>   
                                        <TextField  
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Paragraph" 
                                            variant="outlined"  
                                            value={paragraph}
                                            onChange={ (e) => { setIsDisableBtn(false);  setParagraph(e.target.value)  } }     
                                        />
                                    </Box> 
                                    <Typography 
                                        component='p' 
                                        className={classes.menuTitle}
                                        id="draggable-dialog-title"
                                    >
                                        Форма
                                    </Typography> 
                                    <Box display='flex' mt={2}>
                                        <Box mr={1} flexGrow='1' >   
                                            <TextField   
                                                fullWidth
                                                type='text'
                                                label="Form Input Label" 
                                                size='small'  
                                                variant="outlined"  
                                                value={inputLabel}
                                                onChange={ (e) => { setIsDisableBtn(false); setInputLabel(e.target.value) } }     
                                            />
                                        </Box> 
                                        <Box flexGrow='1' >   
                                            <TextField   
                                                fullWidth
                                                type='text'
                                                label="Form Button Label" 
                                                size='small'  
                                                variant="outlined"  
                                                value={buttonLabel}
                                                onChange={ (e) => { setIsDisableBtn(false); setButtonLabel(e.target.value) } }     
                                            />
                                        </Box> 
                                    </Box>
                                    <Box mt={2}>   
                                        <TextField   
                                            fullWidth
                                            type='text'
                                            label="Form Policy" 
                                            size='small'  
                                            variant="outlined"  
                                            value={policy}
                                            onChange={ (e) => { setIsDisableBtn(false);  setPolicy(e.target.value) } }     
                                        />
                                    </Box> 

                                    <Box mt={2} display="flex" >
                                        <FormControl variant='filled' style={{minWidth: '250px' }}>
                                            <InputLabel id="color-select-label">Color for Form and SubHeading</InputLabel>
                                            <Select
                                                labelId="color-select-label"
                                                id="color-select"
                                                value={colorSelect}
                                                onChange={(e) => {setIsDisableBtn(false); setColorSelect(e.target.value)   }}
                                            >
                                                <MenuItem value={'primary'}>Primary</MenuItem>
                                                <MenuItem value={'secondary'}>Secondary</MenuItem>
                                                <MenuItem value={'custom'}>Custom</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Box ml={1} >
                                            {
                                                colorSelect === 'custom' &&
                                                <TextField    
                                                    type='text'
                                                    label="Set Custom Color on #hex"  
                                                    variant="outlined"  
                                                    value={colorCustom}
                                                    onChange={ (e) => { setIsDisableBtn(false); setColorCustom(e.target.value)  } }     
                                                />
                                            }
                                            
                                        </Box>
                                    </Box>

                                    <Box mt={3} display="flex" alignItems='flex-start' >
                                        <Tooltip title='recomended size 515x340' placement='top'> 
                                            <Button color='primary' variant='contained'> 
                                                <label htmlFor='image-input-label'> Set main image</label>
                                                <input 
                                                    id="image-input-label"
                                                    type="file" 
                                                    onChange={(e) => { handleImageUpload(e, 'mainImage')}} 
                                                    style={{ display: "none" }}
                                                />
                                            </Button> 
                                        </Tooltip>
                                        <Box ml={1} maxWidth={300}>
                                            <img src={imageUrl} alt='main' width={'100%'} />
                                        </Box>
                                    </Box>

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
