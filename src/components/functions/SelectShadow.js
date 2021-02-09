import React from 'react'

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

import { useTheme } from '@material-ui/core/styles';

const SelectShadow =  ({variant, size, className, label, value, setValue, setIsDisableBtn}) => {
    
   
    const theme = useTheme(); 
    const handleChange = (changedValue) => {
        setValue(changedValue)
        setIsDisableBtn(false)
    }
   
    return ( 
        <FormControl  
            variant={variant}
            size={size}   
            className={className}
        >
            <InputLabel id="Shadow-style-label">{label}</InputLabel>
            <Select
                labelId="Shadow-label"
                id="Shadow-style"
                defaultValue={'none'}
                value={value} 
                autoWidth={true}
                MenuProps={{style: {maxHeight: 400}}}
                onChange={(e) => {handleChange(e.target.value) }}
            > 
                {
                    theme.shadows.map( (item, index) => {
                        const title = item === 'none' ? 'None' : `Shadow - ${index}`
                        return <MenuItem key={index} value={item}>{title}</MenuItem>
                    })
                } 
            </Select>
        </FormControl> 
    )
}

export default SelectShadow
