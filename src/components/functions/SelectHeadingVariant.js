
import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const SelectHeadingVariant = ({variant, size, className, fullWidth, label, value, setValue, setIsDisableBtn}) => {

    const handleChange = (event) => {
        setIsDisableBtn(false); 
        setValue(event.target.value)
    }

    return (
        <FormControl
            variant={variant} 
            size={size}   
            className={className}
            fullWidth={fullWidth}
            style={{minWidth: 200}}
        >
            <InputLabel id="variant-style-label">{label}</InputLabel>
            <Select
                labelId="variant-style-label"
                id="variant-style"
                value={value}
                onChange={handleChange}
            >
                <MenuItem value={'h1'}>H1</MenuItem> 
                <MenuItem value={'h2'}>H2</MenuItem> 
                <MenuItem value={'h3'}>H3</MenuItem> 
                <MenuItem value={'h4'}>H4</MenuItem> 
                <MenuItem value={'h5'}>H5</MenuItem> 
                <MenuItem value={'h6'}>H6</MenuItem> 
            </Select>
        </FormControl>
    )
}

export default SelectHeadingVariant
