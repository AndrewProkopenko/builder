import React from 'react'
import {Redirect} from 'react-router-dom'
import firebase from '../firebase/firebase' 

import LoadingContext from '../context/loadingContext/LoadingContext' 
 
import { Avatar, Button, TextField, Typography, Container } from '@material-ui/core'; 
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'; 
import { makeStyles } from '@material-ui/core/styles';  
import { Alert } from '@material-ui/lab';

import Dumb from '../components/library/banner/DumbComponent'

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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {

    
    const { setIsLoading } = React.useContext(LoadingContext) 

    const classes = useStyles();

    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [error, setError] = React.useState(null)
    const [isRedirect, setIsRedirect] = React.useState(false)
    
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 
    
    React.useEffect( () => {
        setIsLoading(false) 
        // eslint-disable-next-line
    }, [])

    const disableCheck = () => {
        if(name !== '' && password !== '') setIsDisableBtn(false)
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
        disableCheck()
    } 
    const handleSubmit = (e) => {
        e.preventDefault() 
        setIsDisableBtn(true)
        firebase.loginWithEmail(name, password).then( (res) => {
            setIsRedirect(true)
        }).catch(function(err) { 
            setError(err)
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="text"
                            label="User"
                            name="user"
                            autoComplete='true'
                            autoFocus
                            value={name}
                            onChange={  (e)=>{handleChange(e.target.value, "name")} }
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password" 
                            value={password}
                            onChange={  (e)=>{handleChange(e.target.value, "password")} }
                        />
                        {
                            error && 
                            <Alert severity="error">{error.message}</Alert>
                        }
                    
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size='medium'
                            color="primary"
                            className={classes.submit}
                            disabled={isDisableBtn} 
                        >
                            Войти
                        </Button>
                    
                    </form>
                </div>
            
            </Container> 
        </React.Fragment>
    )
}

export default Login
