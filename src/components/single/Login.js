import React, { useEffect, useState, useContext } from 'react'
import {Redirect} from 'react-router-dom'
import firebase from '../../firebase/firebase' 

import LoadingContext from '../../context/loadingContext/LoadingContext' 
import ModeContext from '../../context/modeContext/ModeContext' 
import SendFormContext from '../../context/sendFormContext/SendFormContext' 
 
import { Avatar, Button, TextField, Box, Container, CircularProgress, Typography, Tooltip } from '@material-ui/core'; 
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'; 
import { makeStyles } from '@material-ui/core/styles';  
import { Alert, AlertTitle } from '@material-ui/lab'; 



function Login() {

    
    const { setCustomAlert } = useContext(SendFormContext)
    const { setIsLoading } = useContext(LoadingContext) 
    const { user } = useContext(ModeContext) 
 
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(null)
    const [isRedirect, setIsRedirect] = useState(false)
    
    const [isSubmit, setIsSubmit] = useState(false)

    const [isDisableBtn, setIsDisableBtn] = useState(true) 
    
    useEffect( () => {
        setIsLoading(false) 
        if(user) setIsRedirect(true)
        // eslint-disable-next-line
    }, [])

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          marginBottom: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: isSubmit ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submitBtn: {  
            minHeight: 55
        },
        forgotTitle: {
            textAlign: 'center'
        }
      }));
    const classes = useStyles();

    const disableCheck = ({value1, value2}) => { 
        console.log(value1, value2)
        if(value1 !== '' && value2 !== '') setIsDisableBtn(false)
        else setIsDisableBtn(true)   
    }

    const handleChange = (value, place) => {
        switch(place) {
            case ('name') : { 
                setName(value)
                break;
            }
            case ('password'): {
                setPassword(value)
                break;
            }
            default: break;
        } 
        setError(null)
        disableCheck({
            value1: value, 
            value2: place === 'name' ? password : name
        })
    } 
    const handleSubmit = (e) => {
        e.preventDefault() 
        setIsLoading(true)
        setIsDisableBtn(true)
        setIsSubmit(true)
        firebase.loginWithEmail(name, password).then( (res) => {
            setIsRedirect(true)
            setIsSubmit(false) 
            setCustomAlert('success', `Hello, ${res.user.email}. Now you can change site`, 7000)
        }).catch(function(err) { 
            setError(err)
            setIsSubmit(false)
            setIsLoading(false)
        })
        
    } 
 
 
    return ( 
        <React.Fragment>  
            {/* <Dumb/> */}
            <Container component="main" maxWidth="xs">
                
                {/* Redirect при авторизации */}
                { isRedirect ? (<Redirect push to="/"/>) : null }
  
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        { isSubmit ? <CircularProgress size={25} style={{color: '#fff'}} /> : <LockOutlinedIcon /> }
                    </Avatar> 
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Box mb={2} >
                            <TextField
                                variant="outlined" 
                                required
                                fullWidth
                                id="text"
                                label="User"
                                name="user"
                                autoComplete='true'
                                autoFocus
                                value={name}
                                onChange={  (e)=>{handleChange(e.target.value, 'name')} }
                            />
                        </Box>
                        <Box mb={2} >
                            <TextField
                                variant="outlined" 
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password" 
                                value={password}
                                onChange={  (e)=>{handleChange(e.target.value, 'password')} }
                            />
                        </Box>
                        {
                            error && 
                            <Box mb={2} >
                                <Alert severity="error"> 
                                    <AlertTitle>Error</AlertTitle>
                                    {error.message}
                                </Alert>
                            </Box>
                        }
                    
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size='medium'
                            color="primary"
                            className={classes.submitBtn}
                            disabled={isDisableBtn} 
                        >
                            Login
                        </Button>
                    
                    </form>
                        
                    <Box mt={2} >
                        <Tooltip title="It's your problem" placement='top'>
                            <Typography variant='caption' className={classes.forgotTitle}>
                                Forgot Password? 
                            </Typography>
                        </Tooltip>
                    </Box>
                </div>
            
            </Container> 
        </React.Fragment>
    )
}

export default Login
