import React from 'react'
import firebase from '../../../firebase/firebase'
import Draggable from 'react-draggable';
import {ColorPicker} from '../colorPicker/ColorPicker'

import {
    Select, 
    FormControl,  
    MenuItem, 
    InputLabel, 
    Button,
    Box,
    Tooltip,
    TextField,
    FormControlLabel,
    Switch,
    Typography,
    ButtonGroup,
    makeStyles,
    Modal,
    DialogContent
} from '@material-ui/core'

import OpenWithIcon from '@material-ui/icons/OpenWith';

import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import {DeleteOutline} from '@material-ui/icons';

import DumbComponent from "./DumbComponent"

function StyledComponent(props) {

    const [isDisableBtn, setIsDisableBtn] = React.useState(true)
    const [open, setOpen] = React.useState(false)

    const [heading, setHeading] = React.useState(props.data.heading)
    const [paragraph, setParagraph] = React.useState(props.data.paragraph)

    const [imageUrl, setImageUrl] = React.useState(props.data.image)

    const [isButton, setIsButton] = React.useState(props.data.isButton || false)
    const [textButton,  setTextButton] = React.useState(props.data.textButton || '')
    const [targetButton, setTargetButton] = React.useState(props.data.targetButton || '')

    const [colorSelect,  setColorSelect] = React.useState(props.data.colorButton || '')
    const [colorCustom, setColorCustom] = React.useState(props.data.colorButton || '')

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    React.useEffect(() => {
        if(props.data.colorButton !== 'primary' && props.data.colorButton !== 'secondary' ) {  
            setColorSelect('custom')
        }
    }, [props.data.colorButton]) 

    const useStyles = makeStyles((theme) => ({
        btnDrawerStyle: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1030,
            minWidth: 50,
            opacity: 0,
            transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn} opacity`
        },
        btnDrawerItem: {
            backgroundColor: theme.palette.error.dark,
            '&:hover': {
                backgroundColor: theme.palette.secondary.dark
            }
        },
        containerWrapper: {
            position: 'relative',
            outline: "1px solid #ffffff00",
            transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn} outline`,
            '&:hover': {
                outlineColor: `${theme.palette.error.main}`,
                 
                '& $btnDrawerStyle': {
                    opacity: 1
                }
            }
        },
        menu: {
            position: "absolute",
            left: 50,
            top: 50,
            backgroundColor: theme.palette.background.paper,
            padding: 10,
            paddingBottom: 0,
            maxWidth: '100% ',
            width: 'calc( 100% - 100px )',
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

    const handleImageUpload = async(e) => {
        const imageData = e.target.files[0]
        const storageRef = firebase
            .storage
            .ref(`${imageData.name}`)
            .put(imageData)
        storageRef.on('state-changed', snapshot => {
            console.log(snapshot)
        }, error => {
            console.log(error.message)
        }, () => {
            storageRef
                .snapshot
                .ref
                .getDownloadURL()
                .then(url => {
                    setImageUrl(url)
                })
        })
        setIsDisableBtn(false)
    }
    const handleSave = () => {
        const newData = Object.assign({}, props.data)
        newData.heading = heading
        newData.paragraph = paragraph
        newData.image = imageUrl
        newData.isButton = isButton
        newData.textButton = textButton
        newData.targetButton = targetButton

        if (colorSelect === 'custom') {
            newData.colorButton = colorCustom
        } else {
            newData.colorButton = colorSelect
        }

        props.reSaveItem(props.data.id, newData)
        handleClose()
    }
    const removeItem = () => {
        const conf = window.confirm('Delete? ')
        if (conf) 
            props.removeContainer(props.data.id)
    }
    const handleChange = () => {
        setIsButton(!isButton)
    }

    return (
        <div className={classes.containerWrapper}>
            <Box style={{
                position: 'relative'
            }}>
                <Box className={classes.btnDrawerStyle}>
                    <Box display="flex" flexDirection="column">
                        <Box mb={1}>
                            <Tooltip title='Main Banner Settings' placement='right'>
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
                        <DialogContent>
                            <Draggable
                                handle="#draggable-dialog-title"
                                cancel={'[class*="MuiDialogContent-root"]'}>
                                <div className={classes.menu}>
                                    <Typography
                                        component='p'
                                        className={classes.menuTitle}
                                        id="draggable-dialog-title">
                                        Настройки банера
                                        <OpenWithIcon/>
                                    </Typography>
                                    <Box mt={2}>
                                        <TextField
                                            fullWidth
                                            type='text'
                                            label="Main Heading"
                                            variant="outlined"
                                            value={heading}
                                            onChange={(e) => {
                                            setIsDisableBtn(false);
                                            setHeading(e.target.value)
                                        }}/>
                                    </Box>

                                    <Box mt={3}>
                                        <TextField
                                            multiline
                                            fullWidth
                                            type='text'
                                            label="Paragraph"
                                            variant="outlined"
                                            value={paragraph}
                                            onChange={(e) => {
                                            setIsDisableBtn(false);
                                            setParagraph(e.target.value)
                                        }}/>
                                    </Box>

                                    <Box display='flex' mt={3} mb={3}>
                                        <FormControlLabel
                                            control={
                                                < Switch checked = { isButton }
                                                        onChange = { handleChange }
                                                            name = "checkedB" 
                                                            color = "primary" />
                                            }
                                            label="Add Modal Button"/> 
                                            {
                                                isButton && 
                                                <Box display='flex' flexDirection='column' ml={2}>
                                                    <Box mb={1}>
                                                        <Box display='flex'>
                                                            <Box mr={1}>
                                                                <TextField
                                                                    type='text'
                                                                    label="Text for Button"
                                                                    variant="outlined"
                                                                    value={textButton}
                                                                    onChange={(e) => {
                                                                    setIsDisableBtn(false);
                                                                    setTextButton(e.target.value)
                                                                }}/>
                                                            </Box>
                                                            <TextField
                                                                type='text'
                                                                label="Target for Button"
                                                                variant="outlined"
                                                                value={targetButton}
                                                                onChange={(e) => { setIsDisableBtn(false); setTargetButton(e.target.value) }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                    <Box mt={2} display="flex" >
                                                        <FormControl variant='filled' style={{minWidth: '250px' }}>
                                                            <InputLabel id="color-select-label">Color for Button</InputLabel>
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
                                                                <ColorPicker
                                                                    initialColor = {colorCustom}
                                                                    changeColor = {setColorCustom}
                                                                    setIsDisableBtn = {setIsDisableBtn}
                                                                    position = {'right'}
                                                                />  
                                                            }
                                                            
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            }
                                    </Box>

                                    <Box mt={3} display="flex" alignItems='flex-start'>
                                        <Button color='primary' variant='contained'>
                                            <label htmlFor='image-input-label'>
                                                Set image</label>
                                            <input
                                                id="image-input-label"
                                                type="file"
                                                onChange={(e) => {
                                                handleImageUpload(e)
                                            }}
                                                style={{
                                                display: "none"
                                            }}/>
                                        </Button>
                                        <Box ml={1} maxWidth={300}>
                                            <img src={imageUrl} alt='main' width={'100%'}/>
                                        </Box>
                                    </Box>

                                    <Box className={classes.btnSave}>
                                        <Button
                                            disabled={isDisableBtn}
                                            variant="contained"
                                            color="primary"
                                            size={'medium'}
                                            onClick={handleSave}>
                                            Save
                                        </Button>
                                    </Box>
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
