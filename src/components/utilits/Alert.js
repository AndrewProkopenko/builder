import React, {useContext} from 'react'

import { makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import SendFormContext from '../../context/sendFormContext/SendFormContext'

const  AlertComponent = () => { 
    
    const { isShowAlert, closeAlert, alertText  } = useContext(SendFormContext)  

    const useStyles = makeStyles( (theme) => { 
        return {
            alertContainer: {
                position: 'fixed',
                zIndex: 1050, 
                top: 30, 
                left: 'calc(50% - 200px)',
                width: "100%",
                maxWidth: 400, 
                [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                    left: 10,
                    right: 10, 
                    top: 15, 
                    width: 'auto', 
                    maxWidth: 'none'
                },
            },
            alert: { 
                boxShadow: theme.shadows[9] ,
                alignItems: 'center', 
            }, 
            message: {
                textAlign: 'center',
                width: "100%",

            }
        }
    })

    const classes = useStyles()

    const handleClose = () => {
        closeAlert() 
    }
   
    return (
        <div className={classes.alertContainer}>
            <Alert 
                severity={isShowAlert} 
                variant="filled"
                onClose={handleClose} 
                className={classes.alert}
                classes= {{ message: classes.message }}
            >
                { alertText }
            </Alert>
        </div>
    )
}

export default AlertComponent
