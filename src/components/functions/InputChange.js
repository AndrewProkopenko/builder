import React, { memo, useState } from "react";

import { TextField } from '@material-ui/core' 
 


const InputChange = memo(({ id, fullWidth, required, multiline,  type, size, label, variant, value, setValue, setIsDisableBtn }) => {

   
    const [valueLocal, setValueLocal] = useState(value)   
   
    React.useEffect(() => {
        if(valueLocal !== value) {
            setValueLocal(value) 
        }
        // eslint-disable-next-line
    }, [value])

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

      
    return ( 
        <TextField
            required={required}
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
    )
})

export default InputChange
