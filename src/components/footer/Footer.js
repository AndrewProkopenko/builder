import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles, Box, Typography, Button, Container, Switch , FormControlLabel } from '@material-ui/core'

import CategoryContext from '../../context/headerContext/CategoryContext'

function Footer() {

    const { setThemeMode, themeMode } = React.useContext(CategoryContext)

    const useStyles = makeStyles( (theme) => ({
        subHeading: { 
            color: theme.palette.primary.main,
            '&>svg' : {
                fill: theme.palette.primary.main
            }
        },
        footer: {
            backgroundColor: theme.palette.primary.dark, 
            padding: '10px 0'
        },
        footerHeading: { 
            color: "#fff",
            display: 'block', 
            marginBottom : 15
        }
    }))
    const classes = useStyles()

    const checked = themeMode === 'dark' ? true : false

    const handleChange = () => {
        let newMode = themeMode === 'dark' ? 'light' : 'dark' 
        setThemeMode(newMode)
    }

    return (
        <Box className={classes.footer}>
            <Container maxWidth={'lg'}>
                <Typography 
                    variant='h6'
                    className={classes.footerHeading} 
                > 
                    Footer
                </Typography>

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
