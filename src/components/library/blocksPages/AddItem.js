import React, { useState } from 'react' 

import {  
    Button,  
    TextField,  
    Box,   
    makeStyles
} from '@material-ui/core'

import SelectPage from '../../functions/SelectPage'
   

const AddItem = (props) => {
     
    const [newSvg, setNewSvg] = useState('') 
    const [idActive, setIdActive] = useState('none') 
    const [activePage, setActivePage] = useState({}) 
 
    const handleSubmit = (e) => { 
        e.preventDefault()

        props.addSlide(newSvg, activePage)
        setNewSvg('') 
        setIdActive('')
        setActivePage({})
    }
    function handleChangeUrl(selectedPage) {  
     
        setIdActive(selectedPage.id)
        setActivePage(selectedPage)
      
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
                <TextField 
                    fullWidth
                    type='text'
                    size="small" 
                    label='Set Svg'
                    variant="outlined"
                    value={newSvg}
                    onChange={(e) => { setNewSvg(e.target.value) }}
                />
                <Box my={1}> 
                    <SelectPage value={idActive} setValue={handleChangeUrl} />
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
