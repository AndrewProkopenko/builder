import React, { memo, useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { IconButton, Box, makeStyles, Button, Tooltip } from "@material-ui/core"
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


export const ColorPicker = memo(({ initialColor, changeColor, setIsDisableBtn, position, noInherit }) => { 
    const [color, setColor] = useState(initialColor);
    const [isOpen, setIsOpen] = useState(false); 
    const [isDisableSaveIcon, setIsDisableSaveIcon] = useState(true); 
 

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

    useEffect( () => {
        if(initialColor === 'inherit' ) setColor('#0000')
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
                top: position === 'top' ? 100 : -250, 
                left: position === 'left' ? 0 : 'auto',
                right: position === 'right' ? 0 : 'auto',
            }, 
            iconButton: {
                padding: theme.spacing(1)
            }, 
            iconButtonDisabled: {
                opacity: 0
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
                    <Box className={classes.boxPicker}>
                        <ChromePicker 
                            color={ color }
                            onChangeComplete={ handleChange } 
                        />
                    </Box>
                    
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
            
        </Box>
    );
});