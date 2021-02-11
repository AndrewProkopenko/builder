
import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

const  Confirm = ({isVariable, show, setShow, title, text, removeText, handleRemoveClick}) => {
   
    const handleClose = () => {
        if(isVariable) setShow({show: false, index: null }) 
        else setShow(false)
         
    };
    const handleRemove = () => {
        if(isVariable) {
            handleRemoveClick(show.index)
            setShow({show: false, index: null })
        } 
        else { 
            handleRemoveClick()
            setShow(false)
        } 
    }

    const styleTitle = {
        minWidth: 250,  
    }
  
    return ( 
        <Dialog 
            maxWidth={'sm'}
            open={isVariable ? show.show : show }
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title" 
        >
            <DialogTitle style={styleTitle} id="max-width-dialog-title">{title}</DialogTitle>
            {
                text.length > 0 &&
                <DialogContent>
                    <DialogContentText>
                        {text}
                    </DialogContentText>
                    
                </DialogContent>
            }
            <Box px={2} pb={1} >
                <DialogActions>
                    <Button 
                        variant='outlined'
                        onClick={handleClose} 
                        color="default"
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant={'contained'}
                        onClick={handleRemove} 
                        color="secondary">
                        {removeText}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default Confirm
