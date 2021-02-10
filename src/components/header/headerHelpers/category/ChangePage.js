import React, { useState, useEffect } from 'react'

import { Box , TextField } from '@material-ui/core' 

const ChangeCategory = (props) => {

    const [value, setValue] = useState(props.itemPages.title)
 
    useEffect(() => {
        if(props.itemPages.title !== value) {
            setValue(props.itemPages.title) 
        }
        // eslint-disable-next-line
    }, [props.itemPages.title])

    const handleSave = () => {
        props.handleUpdatePage(value, props.item.id, props.itemPages.id)
    }

    return ( 
        <Box display='flex' alignItems="center">
             
            <Box ml={1}>
                <TextField 
                    required
                    type='text' 
                    label="Page title"
                    fullWidth
                    variant='filled'
                    value={value} 
                    onChange={(e) => {setValue( e.target.value )}}
                    onBlur={handleSave}
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
