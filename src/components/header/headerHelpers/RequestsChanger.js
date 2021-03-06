import React, { useEffect, useContext, useState} from 'react' 

import StylesChangers from '../../../styles/changers'  
 
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

import Confirm from '../../utilits/Confirm'

function RequestsChanger() {
    
    const { setIsLoading } = useContext(LoadingContext)     
    const { requests, updateRequests } = useContext(SendFormContext)     
 
    const [isVisibleConfirm, setIsVisibleConfirm] = useState({show: false, index: null}) 
  
    const [localRequests, setLocalRequests] = useState(requests)

    const [open, setOpen] = useState(false)
    const [isOnlyUncheked, setIsOnlyUncheked] = useState(false)
    const [isDisableBtn, setIsDisableBtn] = useState(true) 

    useEffect( () => {
        setLocalRequests(requests)
    }, [requests])
     
    const handleOpen = () => {  
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }; 
    const handleCheckSetting = () => {
        setIsOnlyUncheked(!isOnlyUncheked)
    }; 


    const useStyles = makeStyles((theme) => {
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle, btnSetting, btnSave, dialogContentUnstyle } = commonClasses
        
        return ({ 
            dialogContentUnstyle: dialogContentUnstyle,
            menu: {...menu, ...{
                left: "calc(50% - 400px)",
                maxWidth: 800,   
            }},
            menuTitle: {...menuTitle, ...{ 
                borderColor: isDisableBtn ? '#0000' : theme.palette.secondary.main
            }},
            btnSetting: {...btnSetting, ...{
                backgroundColor: amber[500], 
                '&>span' :{
                    flexDirection: 'row',
                    fontSize: 10
                },
                '&:hover': {
                    backgroundColor: amber[700],  
                }
            }}, 
            btnSave: btnSave, 
            cardRoot: {
                display: 'inline-block', 
                width: 'calc( 50% - 20px)',
                marginBottom: 20,
                marginRight: 20, 
                border: `1px solid ${theme.palette.divider}`
            },
            checkbox: {
                display: 'flex',
                alignItems: 'center' ,
                marginBottom: theme.spacing(2),
                marginLeft:  theme.spacing(1), 
                borderBottom: `1px solid ${theme.palette.divider}`
            }
        
        })
    })
    
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
            return false
        })

        setLocalRequests(newReq)
        setIsDisableBtn(false)
 
    }  
    const handleRemove = (id) => {    
        setIsVisibleConfirm({show: true, index: id})  
    }  

     
    const renderRequests = () => { 
        return (
            localRequests.map( (request, index) => { 
                if(!isOnlyUncheked) {
                    return (
                        OnceCard(request, index) 
                    )
                }
                if(isOnlyUncheked) {
                    if(!request.isCheck) return (
                        OnceCard(request, index) 
                    )
                }
                return false
            })
        )
    }

    const OnceCard = (card, index) => (
        <Card key={index} className={classes.cardRoot} >
            <CardContent>
                {
                    Object.keys(card).map((item, innerIndex) => {  
                        return(
                            <Typography key={innerIndex} component='h6' gutterBottom>
                                {item} &nbsp;  -  &nbsp;
                                <Typography component='span' color="textSecondary">
                                        { String(card[item]) }
                                </Typography> 
                            </Typography>
                        )
                    })
                }
                
            </CardContent>
            <CardActions>
                <Button variant='outlined'  size="small" onClick={() => { handleOnceCheck(card.time) }}>
                    { 
                        card.isCheck ? <span>Uncheck</span> : <span>Check</span>
                    }
                </Button>
                <Button variant='contained' color={'secondary'} size="small" onClick={() => { handleRemove(card.time) }}>
                    Remove
                </Button>
            </CardActions>
        </Card>
    )
 
    const handleConfirmClick = (id) => { 
        const filtered = localRequests.filter(item => ( item.time !== id ))
    
        setLocalRequests(filtered)
        setIsDisableBtn(false) 
    } 
     
    return (
        <div className={classes.dumbWrapper}>
            
            <Confirm
                isVariable={true}
                show={isVisibleConfirm}
                setShow={setIsVisibleConfirm} 
                title={'Remove request?'}
                text={"You can't cancel this action."}
                removeText={"remove"}
                handleRemoveClick={handleConfirmClick}
            />
            <Tooltip title='Requests List' placement='bottom'>
                <Button  
                    onClick={handleOpen} 
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
                <DialogContent classes={{root: classes.dialogContentUnstyle}}> 
                    <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                        <div className={classes.menu}>
                            <Typography 
                                component='p' 
                                className={classes.menuTitle}
                                id="draggable-dialog-title"
                            >
                                { !isDisableBtn && " Don't forget to save - " } Requests from form  <OpenWithIcon/>
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