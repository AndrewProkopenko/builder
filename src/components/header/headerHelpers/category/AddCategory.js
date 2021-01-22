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


const AddCategory = (props) => {

    
    const [newCategoryTitle, setNewCategoryTitle] = React.useState('')
    const [newCategorySlug, setNewCategorySlug] = React.useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addCategory(newCategoryTitle, newCategorySlug)
        
        setNewCategoryTitle('') 
        setNewCategorySlug('')
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <Box mb={1}>
                    <TextField
                        required
                        fullWidth
                        label="Category title" 
                        variant="outlined" 
                        value={newCategoryTitle}
                        onChange={(e) => { setNewCategoryTitle(e.target.value) }}
                    />
                </Box>
                <Box mb={1} style={{position: 'relative'}}>
                    <TextField
                        required
                        fullWidth
                        label="Category slug" 
                        variant="outlined" 
                        value={newCategorySlug}
                        onChange={(e) => { setNewCategorySlug( e.target.value)}}
                            
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
                        Add New Category
                    </Button> 
                </Box>
            </FormGroup>

        </form> 
    )
}

export default AddCategory
