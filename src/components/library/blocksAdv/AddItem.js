import React, {useState} from 'react' 

import {  
    Button,  
    TextField,  
    Box,   
    makeStyles
} from '@material-ui/core'
 
   

const AddItem = (props) => {
     
    const [newSvg, setNewSvg] = useState('') 
    const [newTitle, setNewTitle] = useState('') 
    const [newTarget, setNewTarget] = useState('') 
    
    const handleSubmit = (e) => { 
        e.preventDefault()

        props.addSlide(newSvg, newTitle, newTarget)
        setNewSvg('') 
        setNewTitle('') 
        setNewTarget('')
    } 

    const useStyles = makeStyles((theme) => { 

        return ({ 
            addSlide: { 
                padding: theme.spacing(1), 
                margin: theme.spacing(2, 0),
                border: `1px solid ${theme.palette.divider}`, 
            }
        })
    })
    
    const classes = useStyles();
 

    return (
        <Box className={classes.addSlide}>
             
            
            <Box my={1} maxWidth={300} >
                <Box my={1}>
                    <TextField 
                        fullWidth
                        type='text'
                        size="small" 
                        label='Set Title'
                        variant="outlined"
                        value={newTitle}
                        onChange={(e) => { setNewTitle(e.target.value) }}
                    /> 
                </Box>
                <Box my={1}>
                    <TextField 
                        fullWidth
                        type='text'
                        size="small" 
                        label='Set Target Modal'
                        variant="outlined"
                        value={newTarget}
                        onChange={(e) => { setNewTarget(e.target.value) }}
                    /> 
                </Box>
                <Box my={1}>
                    <TextField 
                        fullWidth
                        type='text'
                        size="small" 
                        label='Set Svg'
                        variant="outlined"
                        value={newSvg}
                        onChange={(e) => { setNewSvg(e.target.value) }}
                    /> 
                </Box>
                
                <Box my={1}>
                    <Button 
                        variant="contained"
                        color="primary" 
                        onClick={handleSubmit}>
                        Add Slide
                    </Button> 
                </Box>
            </Box>
        </Box>
    )
}

export default AddItem
