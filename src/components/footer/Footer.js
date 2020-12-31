import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles, Box, Typography, Button, Container } from '@material-ui/core'

function Footer() {

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
            </Container>
        </Box>
    ) 
}

export default Footer
