import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles, Box, Typography, Button, Container, Switch , FormControlLabel, darken } from '@material-ui/core'

import CategoryContext from '../../context/headerContext/CategoryContext'

function Footer() {

    const { setThemeMode, themeMode, logo} = React.useContext(CategoryContext)

    const useStyles = makeStyles( (theme) => ({
        subHeading: { 
            color: theme.palette.primary.main,
            '&>svg' : {
                fill: theme.palette.primary.main
            }
        },
        footer: {
            backgroundColor: darken(theme.palette.background.paper, 0.5), 
            padding: '10px 0'
        },
        footerHeading: { 
            color: "#fff",
            display: 'block', 
            marginBottom : 15
        },
        logoMain: { 
            fontWeight: 600,
            fontSize: 24, 
            textDecoration: 'none',
            textAlign: "left",
            whiteSpace: 'nowrap',
            [`@media (max-width: ${960}px)`]: {
                fontSize: 18,
                lineHeight: 1.2
            },
        },
        logoSub: { 
            fontWeight: 400,
            fontSize: 12,
            margin: 0, 
            textDecoration: 'none',
            textAlign: "left",
            whiteSpace: 'nowrap'
            
        },
        logoImage: { 
            width: 80, 
            height: 60, 
            marginRight: 4, 
            '&>img': { 
                width: '100%',
                height: '100%'
            },
            [`@media (max-width: ${960}px)`]: {
                width: 60, 
                height: 50, 
            },
        }, 
    }))
    const classes = useStyles()

    const checked = themeMode === 'dark' ? true : false

    const handleChange = () => {
        let newMode = themeMode === 'dark' ? 'light' : 'dark' 
        setThemeMode(newMode)
    }

    const createLogo = () => (
        <NavLink to={'/'} style={{textDecoration: 'none'}} >
            <Box display="flex" alignItems="center">
                <img className={classes.logoImage} src={logo.image} alt={'logo'}/>
                <Box display="flex" flexDirection="column">
                    <Typography component="h1" className={classes.logoMain}>
                        {logo.mainText}
                    </Typography>
                    <Typography  component="p" className={classes.logoSub}>
                        {logo.subText}
                    </Typography>
                </Box>
            </Box>
            
        </NavLink> 
    );

    return (
        <Box className={classes.footer}>
            <Container maxWidth={'lg'}>
                { createLogo() }

                <NavLink to='/login'>
                    <Button color='secondary' variant="contained">
                        Login
                    </Button>
                </NavLink>

                <Box>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={checked}
                                onChange={handleChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Dark Theme"
                    />
                </Box>
            </Container>
        </Box>
    ) 
}

export default Footer
