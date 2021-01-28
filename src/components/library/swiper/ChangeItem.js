import React, {useState} from 'react'


import { TextField } from '@material-ui/core' 


const ChangeItem = (props) => {
    const [name, setName] = useState(props.item.title) 
 
    const handleSave = () => { 
        props.reSave(name, props.index)
    }

    return ( 
        <TextField 
            fullWidth
            size='small'
            type='text' 
            variant="outlined"
            value={name}
            onChange={(e) => { 
                setName(e.target.value)
            }}
            onBlur={handleSave}
        /> 
    )
}

export default ChangeItem
