import React, {useState} from 'react'
 
import { TextField , Box } from '@material-ui/core' 


const ChangeItem = (props) => {

    console.log('change item accordion')

    const [head, setHead] = useState(props.head)
    const [body, setBody] = useState(props.body)
 
    const handleSave = () => { 
        props.handleUpdateItem(props.index, head, body)

    }

    return (
        <Box display='flex' alignItems="center" width="100%">
            
            <Box width="100%">
                <Box mt={1} >
                    <TextField  
                        fullWidth
                        size='small'
                        type='text'
                        label="Head" 
                        variant="outlined"  
                        value={head}
                        onChange={ (e) => {  setHead(e.target.value) } }     
                        onBlur={handleSave}
                    /> 
                </Box>
                
                <Box mt={2}  >
                    <TextField  
                        fullWidth
                        size='small'
                        type='text'
                        label="Body" 
                        variant="outlined"  
                        value={body}
                        onChange={ (e) => {  setBody(e.target.value) } }     
                        onBlur={handleSave}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default ChangeItem
