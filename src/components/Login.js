import React from 'react'
import {Redirect} from 'react-router-dom'
import firebase from '../firebase/firebase'

import ImageManager from './header/headerHelpers/ImageManager'

import LoadingContext from '../context/loadingContext/LoadingContext'
import ImageContext from '../context/imageContext/ImageContext'
 
import { Avatar, Button, TextField, Typography, Container } from '@material-ui/core'; 
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'; 
import { makeStyles } from '@material-ui/core/styles';  
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    const { imageList } = React.useContext(ImageContext)

    const classes = useStyles();

    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [error, setError] = React.useState(null)
    const [isRedirect, setIsRedirect] = React.useState(false)
    
    React.useEffect( () => {
        setIsLoading(false)
        console.log(imageList)
    }, [])

    const hendlerSubmit = (e) => {
        e.preventDefault() 
        firebase.loginWithEmail(name, password).then( (res) => {
            setIsRedirect(true)
        }).catch(function(err) { 
            setError(err)
        })
        
    } 
 
 
    return (
        <Container component="main" maxWidth="xs">
    
            {/* Redirect при авторизации */}
            { isRedirect ? (<Redirect push to="/"/>) : null }
 
            {/* <ImageManager/> */}
     
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <form className={classes.form} onSubmit={hendlerSubmit}>
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
                        onChange={ (e)=>{setName(e.target.value)} }
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
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    {
                        error && 
                        <Alert severity="error">{error.message}</Alert>
                    }
                
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Войти
                    </Button>
                
                </form>
            </div>
           
        </Container>
    )
}

export default Login
