import React from 'react'

import { makeStyles, Typography } from '@material-ui/core'  
// import ModalContext from '../../../context/modalContext/ModalContext'

function DumbComponent(props) {

    // const { handleOpen } = React.useContext(ModalContext) 

    // const heading = props.data.heading 
    const heading = 'heading'
     
    // let colorMain = props.data.colorMain || '#f00' 

    const useStyles = makeStyles((theme) => {   
        // if(colorMain === 'primary')  colorMain = theme.palette.primary.main
        // if(colorMain === 'secondary') colorMain = theme.palette.secondary.main   
        return ({ 
            heading: {  
                marginRight: theme.spacing(3),
                color: theme.palette.text.primary,
                textAlign: 'center',  
            },
             
        })
    });

    const classes  = useStyles();

    // const openModal = () => {
    //     handleOpen(targetButton)
    // }

    return ( 
        <Typography variant={'h3'} className={classes.heading}>
            { heading }
        </Typography> 
    )
}

export default DumbComponent
