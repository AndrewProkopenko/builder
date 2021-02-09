
import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

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
  
    return ( 
        <Dialog 
            maxWidth={'sm'}
            open={isVariable ? show.show : show }
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title" 
        >
            <DialogTitle style={{minWidth: 350}} id="max-width-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
                
            </DialogContent>
            <DialogActions>
                <Button 
                    variant='outlined'
                    onClick={handleClose} 
                    color="primary"
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
        </Dialog>
    )
}

export default Confirm
