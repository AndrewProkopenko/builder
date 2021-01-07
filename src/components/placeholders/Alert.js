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
                left: 'calc(50% - 160px)',
                width: 320,
                maxWidth: "100%", 
            },
            alert: { 
                boxShadow: theme.shadows[9] ,
                alignItems: 'center'
            }
        }
    })

    const classes = useStyles()

    const handleClose = () => {
        props.closeAlert()
    }

    const alertText = () => {
        if(props.severity === 'success') return "Ваша заявка успешно принята"
        if(props.severity === 'error') return "Произошла ошибка :("
    }

    return (
        <div className={classes.alertContainer}>
            <Alert 
                severity={props.severity} 
                variant="filled"
                onClose={handleClose} 
                className={classes.alert}
            >
                { alertText() }
            </Alert>
        </div>
    )
}

export default AlertComponent
