import React, { memo, useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable'; 
import { ChromePicker } from "react-color";
import { IconButton, Box, makeStyles, Button, Tooltip, Typography } from "@material-ui/core"
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';


export const ColorPicker = memo(({ initialColor, changeColor, setIsDisableBtn, position, noInherit }) => { 
    const [color, setColor] = useState(initialColor);
    const [isOpen, setIsOpen] = useState(false); 
    const [isDisableSaveIcon, setIsDisableSaveIcon] = useState(true); 
 
    const [copyText, setCopyText] = useState('')

    const textAreaRef = useRef(null);

    const togglePicker = () => {
        setIsOpen(prevOpen => !prevOpen)
        setColor(initialColor)
        setIsDisableSaveIcon(true)
    };
    const handleChange = (newColor) => {
        setColor(newColor.hex)
        setIsDisableSaveIcon(false)
    }
    const save = () => {
        changeColor(color)
        setIsOpen(false)
        setIsDisableBtn(false)
        setIsDisableSaveIcon(true)
    };
    const setDefault = () => {
        setColor('inherit') 
        setIsDisableSaveIcon(false)
    }
    const handleCopy = (e) => { 
        textAreaRef.current.select();
        document.execCommand('copy'); 
        e.target.focus();
        setCopyText("Copied")
        setTimeout(() => {
            setCopyText("")
        }, 2500);
    }

    useEffect( () => {
        if(initialColor === 'inherit' || initialColor === 'transparent'  ) setColor('#0000')
    }, [initialColor])

    const useStyles = makeStyles( theme => { 
        const contrastColor = ( color !== 'transparent' && 
            color !== 'primary' && 
            color !== 'secondary' && 
            color !== 'warning' && 
            color !== 'error' && 
            color !== 'info' && 
            color !== 'success' && 
            color !== 'inherit' && 
            color !== 'transperent' && 
            color !== 'custom' && 
            color !== 'contrast' && 
            color !== 'default' && 
            color !== 'paper' ) ? 
            theme.palette.getContrastText(color) : theme.palette.text.primary
        return( {
            boxColor: { 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexGrow: 1, 
                minWidth: 90, 
                maxWidth: 200, 
                height: 40, 
                marginRight: theme.spacing(1),
                backgroundColor: color,  
                color: contrastColor , 
                border: `1px solid ${contrastColor}`, 
                borderRadius: theme.shape.borderRadius, 
                cursor: "pointer", 
                transition: `${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut} `, 
                '&:hover' : { 
                    boxShadow: theme.shadows[2]
                }
            }, 
            boxPicker: { 
                position: 'absolute',
                zIndex: 1510, 
                top: position === 'top' ? 60 : -290, 
                left: position === 'left' ? 0 : 'auto',
                right: position === 'right' ? 0 : 'auto',
            }, 
            iconButton: {
                padding: theme.spacing(1)
            }, 
            iconButtonDisabled: {
                opacity: 0
            }, 
            draggableColorTitle: {
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: theme.spacing(1, 2), 
                backgroundColor: theme.palette.background.default, 
                cursor: 'move'
            }, 
            btnCopy: {
                cursor: 'pointer', 
                borderColor: color, 
                textTransform: 'inherit', 
                backgroundColor: copyText === 'Copied' ? 'inherit' : color ,
                color: copyText === 'Copied' ? theme.palette.getContrastText(color) : 'inherit', 
                '&:hover': {
                    backgroundColor: copyText === 'Copied' ? 'inherit' : color ,
                    color: copyText === 'Copied' ? theme.palette.getContrastText(color) : 'inherit',  
                }
            }
        })
    })
    const classes = useStyles()

    return(
        <Box display="flex" flexDirection="column" >
            <Box display="flex" alignItems="center" position="relative" mb={1} >
                <Box className={classes.boxColor} onClick={togglePicker}>
                    { isOpen ? 'Close' : 'Set Color'}
                </Box>
                {   
                    isOpen &&  
                   
                        <Draggable  handle="#draggable-color"  >
                            <Box className={classes.boxPicker}> 
                                <Typography 
                                    component='p' 
                                    className={classes.draggableColorTitle}
                                    id="draggable-color"
                                >
                                    Set color <OpenWithIcon/>
                                </Typography>
                                <ChromePicker 
                                    color={ color }
                                    onChangeComplete={ handleChange } 
                                />
                            </Box>
                        </Draggable>
                    
                }
                {
                    isDisableSaveIcon ? 
                    <IconButton disabled={true} className={`${classes.iconButton} ${classes.iconButtonDisabled}`} >
                        <CheckCircleOutlineIcon />
                    </IconButton> 
                    :
                    <Tooltip title="Save color" placement='top'>
                        <IconButton onClick={save}  color={'primary'} className={classes.iconButton} >
                            <CheckCircleOutlineIcon />
                        </IconButton> 
                    </Tooltip>
                }
                
            </Box>
            {
                !noInherit && 
                <Button 
                    onClick={setDefault} 
                    size={'small'} 
                    variant={'outlined'}
                    color={'default'}
                >
                    Set Inherit
                </Button>
            }

            {
                    color !== 'inherit' &&
                    color !== 'transparent' && 
                    color !== 'primary' && 
                    color !== 'secondary' && 
                    color !== 'error' && 
                    color !== 'success' && 
                    color !== 'warning' && 
                    color !== 'info' && 
                    color !== 'default' && 
                    color !== 'paper' && 
                    color !== 'contrast' && 
                    <Box mt={1}>
                        <Button 
                            onClick={handleCopy} 
                            size='small'
                            variant='outlined'
                            endIcon={<FileCopyOutlinedIcon/>}
                            className={classes.btnCopy}
                        >
                            <form style={{opacity: 0, width: 1, height: 1, position: 'absolute'}}>
                                <textarea
                                    ref={textAreaRef}
                                    value={color} 
                                    readOnly
                                />
                            </form>
                            {copyText} {color}
                        </Button>   
                    </Box>
                }
        </Box>
    );
});