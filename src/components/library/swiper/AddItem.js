import React from 'react'
import firebase from "../../../firebase/firebase"

import {  
    Button,  
    TextField,  
    Box, 
    FormGroup, 
    Typography, 
    makeStyles
} from '@material-ui/core' 
   

const AddItem = (props) => {
     
    const [newImageName, setNewImageName] = React.useState('')
    const [newImageUrl, setNewImageUrl] = React.useState('')
    const [newImageTitle, setNewImageTitle] = React.useState('')

    const handleImageUpload = async (e) => { 
        const imageData = e.target.files[0]
        const generateImageName = `${imageData.name}-${props.id}`

        const storageRef = await firebase.storage.ref(generateImageName).put(imageData)
        const downloadURL = await storageRef.ref.getDownloadURL();
 
        setNewImageUrl(downloadURL)
        setNewImageName(generateImageName)   
    }

    const handleSubmit = (e) => { 
        e.preventDefault()

        props.addSlide(newImageUrl, newImageName, newImageTitle)
        setNewImageName('')
        setNewImageUrl('') 
        setNewImageTitle('') 
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
            <Button color='primary' variant='contained' className={props.btnWithLabel}  >
                <label htmlFor='image-input-label'>
                    Set image
                </label>
                <input
                    id="image-input-label"
                    type="file"
                    onChange={(e) => {  handleImageUpload(e) }}
                    style={{
                    display: "none"
                }}/>
            </Button>
            <Typography variant='caption' > Image: { newImageName.replace(`-${props.id}`, '') }</Typography>
            <Box my={1}>
                <TextField 
                    type='text'
                    size="small" 
                    label='Set Title'
                    variant="outlined"
                    value={newImageTitle}
                    onChange={(e) => { setNewImageTitle(e.target.value) }}
                />
                <Box my={1}>
                    <Button
                        disabled={newImageName !== '' ? false : true }
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
