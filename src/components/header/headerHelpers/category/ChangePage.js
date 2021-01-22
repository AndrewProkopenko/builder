import React, { useState } from 'react'

import { Box , TextField, Tooltip, IconButton  } from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const ChangeCategory = (props) => {

    const [value, setValue] = useState(props.itemPages.title)
 
    const handleSave = () => {
        props.handleUpdatePage(value, props.item.id, props.itemPages.id)
    }

    return ( 
        <Box display='flex' alignItems="center">
            {
                value === props.itemPages.title ?
                <IconButton disabled={true} color={'primary'} >
                    <CheckCircleOutlineIcon />
                </IconButton> 
                :
                <Tooltip title={`Save Page ${value}`} placement='top'>
                    <IconButton onClick={handleSave} disabled={value === props.itemPages.title} color={'primary'} >
                        <CheckCircleOutlineIcon />
                    </IconButton> 
                </Tooltip>
            }
            
            <Box ml={1}>
                <TextField 
                    required
                    type='text' 
                    label="Page title"
                    fullWidth
                    variant='filled'
                    value={value} 
                    onChange={(e) => {setValue( e.target.value )}}
                />     
                <TextField  
                    type='text' 
                    label="Page slug"
                    fullWidth
                    variant='filled'
                    value={props.itemPages.slug} 
                    disabled={true}
                />  
            </Box>
            
        </Box>
    )
}

export default ChangeCategory
