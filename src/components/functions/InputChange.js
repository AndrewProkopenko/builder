import React, { memo, useState } from "react";

import {   
    Box,
    TextField,   
    IconButton, 
    Tooltip, 
    makeStyles
} from '@material-ui/core' 

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


const InputChange = memo(({ id, fullWidth, multiline,  type, size, label, variant, value, setValue, setIsDisableBtn, direction }) => {

    const [valueLocal, setValueLocal] = useState(value) 

    const save = () => { 
        if(valueLocal !== value) {
            if(id !== null ) setValue(valueLocal, id)
            else setValue(valueLocal)

            setIsDisableBtn(false) 
        } 
    } 
    
    const handleChange = (e) => {
        type === 'number' ? setValueLocal(Number(e.target.value)) : setValueLocal(e.target.value)
        setIsDisableBtn(false)
    }

    const useStyles = makeStyles( theme => {  
        return( {
             
            iconButton: {
                padding: theme.spacing(1)
            }, 
            iconButtonDisabled: {
            
            }
        })
    })
    const classes = useStyles() 

    return (
        // <Box display='flex' alignItems='center' flexDirection={direction} >
        //     {
        //         valueLocal !== value &&
        //         <Box mx={1}> 
        //             <Tooltip title="Save" placement='top'>
        //                 <IconButton onClick={save}  color={'primary'} className={classes.iconButton} >
        //                     <CheckCircleOutlineIcon />
        //                 </IconButton> 
        //             </Tooltip>
        //         </Box>
        //     }
            <TextField
                fullWidth={fullWidth}
                type={type}
                multiline={multiline}
                size={size}
                label={label}
                variant={variant}
                value={valueLocal}
                onChange={handleChange}
                onBlur={save}
            />
            
        // </Box>
    )
})

export default InputChange
