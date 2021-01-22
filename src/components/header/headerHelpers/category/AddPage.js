import React from 'react'

import { 
    Tooltip,
    Button,  
    TextField,  
    Box, 
    FormGroup,
    IconButton,
    Typography, 
} from '@material-ui/core' 
  
import InfoOutlined from '@material-ui/icons/InfoOutlined';

const AddPage = (props) => {
     
    const [newPageTitle, setNewPageTitle] = React.useState('')
    const [newPageSlug, setNewPageSlug] = React.useState('')

    const handleSubmit = (e) => { 
        e.preventDefault()

        props.addPage(newPageTitle, newPageSlug, props.id)
        setNewPageTitle('')
        setNewPageSlug('') 
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box display='flex' justifyContent={'flex-end'} >
                <FormGroup>
                    <Typography variant='caption' gutterBottom >Add new page</Typography>
                    <Box mb={1}>
                        <TextField
                            required 
                            fullWidth
                            label="New page title" 
                            variant="outlined" 
                            value={newPageTitle}
                            onChange={(e) => { setNewPageTitle(e.target.value)}}
                        />
                    </Box>
                    <Box mb={1} style={{position: 'relative'}}>
                        <TextField
                            required 
                            fullWidth
                            label="New page slug" 
                            variant="outlined" 
                            value={newPageSlug}
                            onChange={(e) => { setNewPageSlug(e.target.value)}}
                            
                        />
                        <Tooltip title="You can't rewrite slug in future" placement='left'  >
                            <IconButton style={{position: 'absolute', top: 3, right: 3}}>
                                <InfoOutlined size={10} color={'secondary'}/>
                            </IconButton>
                        </Tooltip> 
                    </Box>
                    <Box> 
                        <Button 
                            fullWidth
                            type={'submit'}
                            color={'primary'} 
                            variant="contained"  
                        >
                            Add New Page
                        </Button>
                    </Box>
                </FormGroup> 
            </Box>
        </form> 
    )
}

export default AddPage
