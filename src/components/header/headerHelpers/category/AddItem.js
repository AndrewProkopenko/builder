import React from 'react'
import { 
    Tooltip,
    Button,  
    TextField,  
    Box, 
    FormGroup,
    IconButton, 
} from '@material-ui/core' 
  
import InfoOutlined from '@material-ui/icons/InfoOutlined';


const AddItem = (props) => {

    
    const [newItemTitle, setNewItemTitle] = React.useState('')
    const [newItemSlug, setNewItemSlug] = React.useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(props.id !== null ) props.addItem(newItemTitle, newItemSlug, props.id)
        else props.addItem(newItemTitle, newItemSlug)
        
        
        setNewItemTitle('') 
        setNewItemSlug('')
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <Box mb={1}>
                    <TextField
                        required
                        fullWidth
                        label={`${props.title} title`} 
                        variant="outlined" 
                        value={newItemTitle}
                        onChange={(e) => { setNewItemTitle(e.target.value) }}
                    />
                </Box>
                <Box mb={1} style={{position: 'relative'}}>
                    <TextField
                        required
                        fullWidth
                        label={`${props.title} slug`} 
                        variant="outlined" 
                        value={newItemSlug}
                        onChange={(e) => { setNewItemSlug( e.target.value)}}
                            
                    />
                    <Tooltip title="You can't rewrite slug in future" placement='left'  >
                        <IconButton style={{position: 'absolute', top: 3, right: 3}}>
                            <InfoOutlined color={'secondary'}/>
                        </IconButton>
                    </Tooltip> 
                </Box>
                <Box mb={1}>
                    <Button 
                        type='submit'
                        color={'primary'} 
                        variant="contained"
                        fullWidth
                    >
                        Add New {props.title}
                    </Button> 
                </Box>
            </FormGroup>

        </form> 
    )
}

export default AddItem
