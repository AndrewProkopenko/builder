import React, {useState} from 'react'


import { Box , TextField, Tooltip, IconButton  } from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


const ChangeItem = (props) => {
    const [name, setName] = useState(props.item.name)
    const [price, setPrice] = useState(props.item.price)
 
    const handleSave = () => { 
        props.handleRowChange(props.index, name, price)
    }

    return (
        <Box display='flex' alignItems="center" width="100%">
            {
                (name !== props.item.name || price !== props.item.price) && 
                <Box mr={1}>
                    <Tooltip title={`Save row`} placement='top'>
                        <IconButton onClick={handleSave} color={'primary'} >
                            <CheckCircleOutlineIcon />
                        </IconButton> 
                    </Tooltip>
                </Box>
            }
            <Box mr={1} flexGrow={1}>
                <TextField 
                    fullWidth
                    size='small'
                    type='text'
                    label={`Table Row Name ${props.index + 1}`}
                    variant="outlined"
                    value={name}
                    onChange={(e) => { 
                        setName(e.target.value)
                    }}
                />
            </Box>
            <Box >
                <TextField 
                    fullWidth
                    size='small'
                    type='text'
                    label={`Table Row Price ${props.index + 1}`}
                    variant="outlined"
                    value={price}
                    onChange={(e) => { 
                        setPrice(e.target.value)
                    }}
                />
            </Box>
        </Box>
    )
}

export default ChangeItem
