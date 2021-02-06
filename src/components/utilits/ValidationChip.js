import React , { useEffect, useContext } from 'react'

import { Box, makeStyles, IconButton, Typography, darken, Fade  } from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close'; 
 
import SendFormContext from '../../context/sendFormContext/SendFormContext'  

import { getColorByPalette} from '../../components/functions/colorChanger/ColorCalculation'

const  ValidationChip = ({ isValid, handleClose, place, absolute, closeOnFirstClick, style, textForView, variantView, colorView}) => {
  
    const { validationSettings } = useContext(SendFormContext)    

    const variant = variantView ? variantView : validationSettings.variant

    useEffect(() => {
        const setCloseClick = () => { 
            if(closeOnFirstClick) handleCloseChip() 
        }  

        window.addEventListener("click", setCloseClick); 
        window.addEventListener("scroll", setCloseClick); 

        return function cleanupListener() { 
            window.removeEventListener('click', setCloseClick)   
            window.removeEventListener('scroll', setCloseClick)   
        }
        // eslint-disable-next-line
    }, [])
    const useStyles = makeStyles( theme => {
         
        const chipColor = colorView ? getColorByPalette(theme, colorView) : getColorByPalette(theme, validationSettings.color)
        return({
            chipContainer: {
                position: absolute ? 'absolute' : 'relative', 
                top:  absolute ? -42 : 'auto', 
                left: absolute ? 0 : 'auto', 
                right: absolute ? 0 : 'auto', 
                display: isValid ? 'none' : 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                borderRadius: 16, 
                width: '100%', 
                marginTop: 8, 
                marginBottom: 8, 
                transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`,
                transformOrigin: 'bottom', 
                minHeight: 30,   
                [theme.breakpoints.down('sm')] : {
                    position: 'relative', 
                    top: absolute ? 0 : "inherit",
                    marginTop: 0 
                }
            },
            chipFilled: {
                backgroundColor: chipColor,
                color: theme.palette.getContrastText(chipColor),
                '& $closeChip': { 
                    backgroundColor: theme.palette.action.selected, 
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover, 
                    }
                }
            },
            chipOutlined: {
                backgroundColor: 'inherit', 
                border: `1px solid ${chipColor}`,  
                color: chipColor,
                '& $closeChip': { 
                    backgroundColor: chipColor, 
                    '&:hover': {
                        backgroundColor: darken(chipColor), 
                    }
                }
            },
            chipLabel: {
                fontSize: "0.8125rem", 
                lineHeight: 1.15,
                paddingTop: 3, 
                paddingBottom: 3, 
                paddingLeft: 25,
                paddingRight: 25,
                marginRight: 0, 
                flexGrow: 1, 
                [theme.breakpoints.down('sm')]: {
                    textAlign: 'center'
                }
            }, 
            closeChip: {
                position: 'absolute',
                top: 'calc(50% - 9px)', 
                right: 6,  
                zIndex: 5, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',   
                width: 18,
                cursor: "pointer",
                height: 18, 
                fontSize: 15, 
                '& svg': {
                    fill: theme.palette.getContrastText(chipColor)
                }
                
            }
        })
    })
    
    const classes = useStyles()
  
    const handleCloseChip = () => { 
        handleClose(place)
    }
    const renderText = () => {
        if(textForView) return textForView
        switch(place) {
            case('name') : {
                return validationSettings.name
            }
            case('phone') : {
                return validationSettings.phone
            }
            default: return "Incorrect field"
        }
    }

    return (
        <Fade in={!isValid} timeout={{enter: 300, exit: 0}}>
            <Box className={`${classes.chipContainer} ${variant === 'outlined' ? classes.chipOutlined : classes.chipFilled}`} style={style} >
                <Typography component="span" className={classes.chipLabel}>
                    {renderText()}    
                </Typography>
                <IconButton 
                    aria-label="close" 
                    onClick={handleCloseChip} 
                    size={'small'}
                    className={classes.closeChip}
                >
                    <CloseIcon fontSize={'inherit'} />
                </IconButton>
            </Box>
        </Fade>
    )
}

export default ValidationChip
