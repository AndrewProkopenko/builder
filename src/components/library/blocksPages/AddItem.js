import React from 'react'
import firebase from "../../../firebase/firebase"

import {  
    Button,  
    TextField,  
    Box,  
    Typography, 
    FormControl, 
    InputLabel, 
    Select, 
    makeStyles
} from '@material-ui/core' 
   

const AddItem = (props) => {
     
    const [newSvg, setNewSvg] = React.useState('') 
    const [idActive, setIdActive] = React.useState('') 
 
    const handleSubmit = (e) => { 
        e.preventDefault()

        props.addSlide(newSvg, idActive)
        setNewSvg('') 
        setIdActive('')
    }
    const handleChangeUrl = (id) => {  

        console.log(id)
        setIdActive(id)
        // let newSlides = slides.slice()
 
        // let activeItem
        // categories.forEach( item => {
        //     if(item.id === id) activeItem = item
        //     else {
        //         if(item.pages.length > 0) {
        //             item.pages.forEach(innerItem => {
        //                 if(innerItem.id === id) activeItem = innerItem
        //             })
        //         }
        //     }
        // })
 
        // console.log(activeItem)
 
        // newSlides[index].name = activeItem.title
        // newSlides[index].idActive = id
        
        // setSlides(newSlides) 
        // setIsDisableBtn(false)
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
                    <FormControl 
                        variant='filled' 
                        size='small'    
                        // style={{width: '100%'}}
                        fullWidth
                    >
                        <InputLabel id={`url-new`}>Choice page</InputLabel>
                        <Select
                            labelId={`url-new`}
                            id="url-select"
                            value={idActive}  
                            fullWidth
                            style={{maxWidth: '100%'}}
                            onChange={(e) => {   
                                handleChangeUrl(e.target.value); 
                            }}
                        >   
                            {
                                props.renderLinkList()
                            }
                                
                        </Select>
                    </FormControl>
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
