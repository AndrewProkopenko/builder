import React, {useState} from 'react'
 
import { Box , TextField, Tooltip, IconButton  } from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


const ChangeItem = (props) => {
    const [head, setHead] = useState(props.item.head)
    const [body, setBody] = useState(props.item.body)
 
    const handleSave = () => { 
        props.handleUpdateItem(props.index, head, body)
    }

    return (
        <Box display='flex' alignItems="center" width="100%">
            {
                (head !== props.item.head || body !== props.item.body) && 
                <Box mr={1}>
                    <Tooltip title={`Save item`} placement='top'>
                        <IconButton onClick={handleSave} color={'primary'} >
                            <CheckCircleOutlineIcon />
                        </IconButton> 
                    </Tooltip>
                </Box>
            }
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
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default ChangeItem
