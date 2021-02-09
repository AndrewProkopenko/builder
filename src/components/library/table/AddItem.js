import React, {useState} from 'react'

import {  
    Button,  
    TextField,  
    Box, 
    FormGroup, 
    Typography, 
} from '@material-ui/core' 
   

const AddItem = (props) => {
     
    const [newItemTitle, setNewItemTitle] = useState('')
    const [newItemPrice, setNewItemPrice] = useState('')

    const handleSubmit = (e) => { 
        e.preventDefault()

        props.addItem(newItemTitle, newItemPrice)
        setNewItemTitle('')
        setNewItemPrice('') 
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box width={'50%'} >
                <FormGroup>
                    <Typography variant='caption' gutterBottom >Add new row</Typography>
                    <Box mb={1}>
                        <TextField
                            required 
                            fullWidth
                            label="New item title" 
                            variant="outlined" 
                            value={newItemTitle}
                            onChange={(e) => { setNewItemTitle(e.target.value)}}
                        />
                    </Box>
                    <Box mb={1} style={{position: 'relative'}}>
                        <TextField
                            required 
                            fullWidth
                            label="New item price" 
                            variant="outlined" 
                            value={newItemPrice}
                            onChange={(e) => { setNewItemPrice(e.target.value)}}
                            
                        /> 
                    </Box>
                    <Box> 
                        <Button 
                            fullWidth
                            type={'submit'}
                            color={'primary'} 
                            variant="contained"  
                        >
                            Add New Row
                        </Button>
                    </Box>
                </FormGroup> 
            </Box>
        </form> 
    )
}

export default AddItem
