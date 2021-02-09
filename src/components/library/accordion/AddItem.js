import React , { useState} from 'react'

import {  
    Button,  
    TextField,  
    Box, 
    FormGroup, 
    Typography, 
} from '@material-ui/core' 
   

const AddItem = (props) => {
     
    const [newItemTitle, setNewItemTitle] = useState('')
    const [newItemBody, setNewItemBody] = useState('')

    const handleSubmit = (e) => { 
        e.preventDefault()

        props.addItem(newItemTitle, newItemBody)
        setNewItemTitle('')
        setNewItemBody('') 
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box width={'50%'} mt={3} mb={2}>
                <FormGroup>
                    <Typography variant='caption' gutterBottom >Add new item</Typography>
                    <Box mb={1}>
                        <TextField
                            required 
                            fullWidth
                            label="New item head" 
                            variant="outlined" 
                            value={newItemTitle}
                            onChange={(e) => { setNewItemTitle(e.target.value)}}
                        />
                    </Box>
                    <Box mb={1} style={{position: 'relative'}}>
                        <TextField
                            required 
                            fullWidth
                            label="New item body" 
                            variant="outlined" 
                            value={newItemBody}
                            onChange={(e) => { setNewItemBody(e.target.value)}}
                            
                        /> 
                    </Box>
                    <Box> 
                        <Button 
                            fullWidth
                            type={'submit'}
                            color={'primary'} 
                            variant="contained"  
                        >
                            Add New Item
                        </Button>
                    </Box>
                </FormGroup> 
            </Box>
        </form> 
    )
}

export default AddItem
