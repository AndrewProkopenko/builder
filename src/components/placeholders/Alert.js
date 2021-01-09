import React from 'react'

import { makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'


function AlertComponent(props) {
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
        props.closeAlert()
    }

    const alertText = () => {
        if(props.severity === 'success') return "Your request was accepted successfully"
        if(props.severity === 'info') return "Your request is being processed"
        if(props.severity === 'error') return "An error has occurred :("
    }
    const severityText = () => { 
        return props.severity
    }

    return (
        <div className={classes.alertContainer}>
            <Alert 
                severity={props.severity} 
                variant="filled"
                onClose={handleClose} 
                className={classes.alert}
                classes= {{ message: classes.message }}
            >
                { alertText() }
            </Alert>
        </div>
    )
}

export default AlertComponent
