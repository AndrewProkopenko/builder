import React, { useState } from 'react'

import { Box , TextField, Tooltip, IconButton  } from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const ChangeCategory = (props) => {

    const [value, setValue] = useState(props.item.title)
 
    const handleSave = () => {
        props.handleUpdateCategory(value, props.item.id)
    }

    return ( 
        <Box display='flex' alignItems="center">
            {
                value === props.item.title ?
                <IconButton disabled={true} color={'primary'} >
                    <CheckCircleOutlineIcon />
                </IconButton> 
                :
                <Tooltip title={`Save Category ${value}`} placement='top'>
                    <IconButton onClick={handleSave} disabled={value === props.item.title} color={'primary'} >
                        <CheckCircleOutlineIcon />
                    </IconButton> 
                </Tooltip>
            }
            
            <Box ml={1}>
                <TextField  
                    required
                    type='text' 
                    label="Category title"
                    fullWidth
                    variant='filled'
                    value={value} 
                    onChange={(e) => {setValue(e.target.value)}}
                />     
                <TextField 
                    type='text' 
                    label="Category slug (read only)"
                    fullWidth
                    variant='filled'
                    value={props.item.slug} 
                    disabled={true} 
                />  
            </Box> 
            
        </Box>
    )
}

export default ChangeCategory
