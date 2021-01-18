import React, { memo, useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { IconButton, Box, makeStyles, Button, Tooltip } from "@material-ui/core"
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


export const ColorPicker = memo(({ initialColor, changeColor, setIsDisableBtn, position, noInherit }) => { 
    const [color, setColor] = useState(initialColor);
    const [isOpen, setIsOpen] = useState(false); 

    const togglePicker = () => setIsOpen(prevOpen => !prevOpen);
    const handleChange = (newColor) => setColor(newColor.hex);
    const save = () => {
        changeColor(color)
        setIsOpen(false)
        setIsDisableBtn(false)
    };
    const setDefault = () => {
        setColor('inherit')
        setIsDisableBtn(false)
    }

    useEffect( () => {
        if(initialColor === 'inherit' ) setColor('#000')
    }, [initialColor])

    const useStyles = makeStyles( theme => {
        const contrastColor = ( color !== 'transparent' && 
            color !== 'primary' && 
            color !== 'secondary' && 
            color !== 'inherit' && 
            color !== 'transperent' && 
            color !== 'custom' && 
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
                transition: `${theme.transitions.duration.shortest} ${theme.transitions.easing.easeInOut}ms`, 
                '&:hover' : { 
                    boxShadow: theme.shadows[4]
                }
            }, 
            boxPicker: { 
                position: 'absolute',
                zIndex: 1510, 
                top: position === 'top' ? 100 : -250, 
                left: position === 'left' ? 0 : 'auto',
                right: position === 'right' ? 0 : 'auto',
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
                    initialColor === color ? 
                    <IconButton onClick={save} disabled={initialColor === color} color={'primary'} >
                        <CheckCircleOutlineIcon />
                    </IconButton> 
                    :
                    <Tooltip title="Save color" placement='top'>
                        <IconButton onClick={save} disabled={initialColor === color} color={'primary'} >
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