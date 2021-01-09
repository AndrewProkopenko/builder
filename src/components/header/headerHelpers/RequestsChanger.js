import React from 'react' 
import firebase from '../../../firebase/firebase'
 
import LoadingContext from '../../../context/loadingContext/LoadingContext' 
import SendFormContext from '../../../context/sendFormContext/SendFormContext'  
import { 
    Tooltip,
    Button, 
    Modal, 
    DialogContent , 
    Typography,  
    Box,
    makeStyles,   
    FormControlLabel,  
    Card,
    CardActions,
    CardContent,
    Checkbox 
} from '@material-ui/core' 

import { amber } from '@material-ui/core/colors'
import SaveIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import OpenWithIcon from '@material-ui/icons/OpenWith'; 
 
import Draggable from 'react-draggable';  

function RequestsChanger() {
    
    const { setIsLoading } = React.useContext(LoadingContext)     
    const { requests, updateRequests } = React.useContext(SendFormContext)     
 
  
    const [localRequests, setLocalRequests] = React.useState(requests)

    const [open, setOpen] = React.useState(false)
    const [isOnlyUncheked, setIsOnlyUncheked] = React.useState(false)
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 

    React.useEffect( () => {
        setLocalRequests(requests)
    }, [requests])
     
    const handleInputFocus = () => {  
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }; 
    const handleCheckSetting = () => {
        setIsOnlyUncheked(!isOnlyUncheked)
    }; 


    const useStyles = makeStyles((theme) => ({ 
        
        menu: {    
            position: "absolute", 
            left: "calc(50% - 400px)",
            top: 50, 
            backgroundColor: theme.palette.background.paper, 
            padding: 10 , 
            paddingBottom: 0, 
            maxWidth: 800,  
            width: '100%',
            maxHeight: 'calc(100vh - 100px)', 
            minHeight: 500,
            overflowY: 'scroll',  
        },
        menuTitle: {
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            fontSize: 14, 
            borderBottom: '1px solid #eaeaea',
            paddingBottom: 6,
            marginBottom: 10, 
            cursor: 'move'
        },
        btnSetting: { 
            backgroundColor: amber[500], 
            minWidth: 80, 
            maxHeight: 50, 
            transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms `, 
            '&:hover': {
                backgroundColor: amber[700], 
            }, 
            '&>span': {
                display: 'flex',  
                fontSize: 10
            }
        },
        
        btnSave: {
            position: 'sticky', 
            zIndex: 15,
            bottom: 0, 
            left: 0, 
            right: 0,
            height: 70, 
            paddingTop: 10, 
            backgroundColor: theme.palette.background.paper, 
        },
        cardRoot: {
            display: 'inline-block', 
            width: 'calc( 50% - 20px)',
            marginBottom: 20,
            marginRight: 20
        },
        checkbox: {
            display: 'flex',
            alignItems: 'center' ,
            marginBottom: theme.spacing(2),
            marginLeft:  theme.spacing(1), 
            borderBottom: `1px solid ${theme.palette.divider}`
        }
    
    }))
    
    const classes = useStyles();
 
    const handleSave = () => {   
        setIsDisableBtn(true)
        setIsLoading(true)
        handleClose()
        updateRequests(localRequests)
        setIsLoading(false)
    }  
    const handleOnceCheck = (id) => {  
        const newReq = localRequests.slice()
        newReq.map(item => {
            if(item.time === id) item.isCheck = !item.isCheck
        })

        setLocalRequests(newReq)
        setIsDisableBtn(false)
 
    }  
    const handleRemove = (id) => {  

        const newReq = localRequests.slice()
        const filtered = newReq.filter(item => ( item.time !== id ))

        setLocalRequests(filtered)
        setIsDisableBtn(false)
    }  

     
    const renderRequests = () => { 
        return (
            localRequests.map( (request, index) => { 
                if(!isOnlyUncheked) {
                    return (
                        <Card key={index} className={classes.cardRoot} >
                            <CardContent>
                                {
                                    Object.keys(request).map((item, innerIndex) => { 
    
                                        return(
                                            <Typography key={innerIndex} component='h6' gutterBottom>
                                                {item} &nbsp;  -  &nbsp;
                                                <Typography component='span' color="textSecondary">
                                                     { String(request[item]) }
                                                </Typography> 
                                            </Typography>
                                        )
                                    })
                                }
                                
                            </CardContent>
                            <CardActions>
                                <Button variant='outlined' size="small" onClick={() => {handleOnceCheck(request.time)}}>
                                    { 
                                        request.isCheck &&
                                        <span>Uncheck</span>
                                    }
                                    { 
                                        !request.isCheck &&
                                        <span>Check</span>
                                    }
                                </Button>
                                <Button variant='contained' color={'secondary'} size="small" onClick={() => {handleRemove(request.time)}}>
                                    Remove
                                </Button>
                            </CardActions>
                        </Card>
                    )
                }
                if(isOnlyUncheked) {
                    if(!request.isCheck) return (
                        <Card key={index} className={classes.cardRoot} >
                            <CardContent>
                                {
                                    Object.keys(request).map((item, innerIndex) => { 
    
                                        return(
                                            <Typography key={innerIndex} component='h6' gutterBottom>
                                                {item} &nbsp;  -  &nbsp;
                                                <Typography component='span' color="textSecondary">
                                                     { String(request[item]) }
                                                </Typography> 
                                            </Typography>
                                        )
                                    })
                                }
                                
                            </CardContent>
                            <CardActions>
                                <Button variant='outlined' size="small" onClick={() => {handleOnceCheck(request.time)}}>
                                    { 
                                        request.isCheck &&
                                        <span>Uncheck</span>
                                    }
                                    { 
                                        !request.isCheck &&
                                        <span>Check</span>
                                    }
                                </Button>
                                <Button variant='contained' color={'secondary'} size="small" onClick={() => {handleRemove(request.time)}}>
                                    Remove
                                </Button>
                            </CardActions>
                        </Card>
                    )
                }
            })
        )
    }
     
     
    return (
        <div className={classes.dumbWrapper}>
            <Tooltip title='Requests List' placement='bottom'>
                <Button  
                    onClick={handleInputFocus} 
                    size='medium'
                    variant='contained'
                    color='primary' 
                    className={classes.btnSetting}
                >   
                    <span>Requests</span>
                    <SettingsIcon style={{ color: '#fff' }} fontSize='small'/>
                </Button>
            </Tooltip>

            <Modal 
                open={open}  
                aria-labelledby="draggable-dialog-title"
                onClose={handleClose} 
            > 
                <DialogContent> 
                    <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                        <div className={classes.menu}>
                            <Typography 
                                component='p' 
                                className={classes.menuTitle}
                                id="draggable-dialog-title"
                            >
                                Requests from form  <OpenWithIcon/>
                            </Typography>
                             
                            {
                                localRequests.length > 0 && 
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isOnlyUncheked}
                                            onChange={handleCheckSetting}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Show only unchecked"
                                    className={classes.checkbox}
                                />
                            }
                            {
                                localRequests.length === 0 && 
                                <Typography component='h3'>
                                    No request
                                </Typography>
                            }
                            

                            { renderRequests() }
                           


                            <Box className={classes.btnSave} mt={2}>
                                <Button 
                                    color={'primary'} 
                                    variant="contained"
                                    onClick={handleSave}
                                    startIcon={<SaveIcon/>}
                                    disabled={isDisableBtn}
                                >
                                    Save
                                </Button>
                            </Box>
                        </div>
                    </Draggable>
                </DialogContent> 
            </Modal> 
        </div>
    )
}

export default RequestsChanger 