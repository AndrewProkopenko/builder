import React from 'react'
import { NavLink } from 'react-router-dom'

import { makeStyles, Box, Typography, Container, IconButton, Tooltip, darken } from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import CategoryContext from '../../context/headerContext/CategoryContext'

import { getColorByPalette } from '../functions/colorChanger/ColorCalculation'

function Footer() {

    const { logo, settings } = React.useContext(CategoryContext)
 
    let backgroundFooter = settings.classes.backgroundColor
    let contrastFooter
    let hoverActiveLinkColor
     
    const useStyles = makeStyles( (theme) => {

        backgroundFooter = getColorByPalette(theme, backgroundFooter) 
        contrastFooter = theme.palette.getContrastText(backgroundFooter)
        hoverActiveLinkColor = darken(backgroundFooter, 0.3)

        if(settings.classes.backgroundColor === 'paper' || settings.classes.backgroundColor === 'default') {  
            hoverActiveLinkColor = theme.palette.primary.main 
        } 

        return({ 
            footer: {
                backgroundColor: backgroundFooter, 
                padding: theme.spacing(3, 0)
            }, 
            logoMain: { 
                color: contrastFooter,
                fontWeight: 700,
                fontSize: 25, 
                textDecoration: 'none',
                textAlign: "left",
                whiteSpace: 'nowrap',
                [theme.breakpoints.down('sm')]: {
                    fontSize: 16,
                    lineHeight: 1.2
                },
            },
            logoSub: { 
                color: contrastFooter,
                fontWeight: 400,
                fontSize: 12,
                margin: 0, 
                textDecoration: 'none',
                textAlign: "left",
                whiteSpace: 'nowrap'
                
            },
            logoImage: { 
                width: 70, 
                height: 50, 
                marginRight: 4, 
                '&>img': { 
                    width: '100%',
                    height: '100%'
                },
                [theme.breakpoints.down('sm')]: {
                    width: 45, 
                    height: 30, 
                },
            },  
            buttonToTop: {
                '&:hover': {
                    backgroundColor: hoverActiveLinkColor
                }
            }
        })
    })
    const classes = useStyles()
 
    const createLogo = () => (
        <NavLink to={'/'} style={{textDecoration: 'none', display: 'inline-block'}} >
            <Box display="flex" alignItems="center">
                {
                    logo.imageUrl.length > 0 && 
                    <img className={classes.logoImage} src={logo.imageUrl} alt={'logo'}/>
                }
                <Box display="flex" flexDirection="column">
                    {
                        logo.mainText.length > 0 &&
                        <Typography component="h1" className={classes.logoMain}>
                            {logo.mainText}
                        </Typography>
                    }
                    {
                        logo.subText.length > 0 && 
                        <Typography  component="p" className={classes.logoSub}>
                            {logo.subText}
                        </Typography>
                    }
                </Box>
            </Box>
            
        </NavLink> 
    );
    const buttonToTop = () => (
        <Tooltip title='To Top' placement='top' >
            <IconButton 
                className={classes.buttonToTop}  
                onClick={handleClickToTop}
            >
                <KeyboardArrowUpIcon style={{fill: contrastFooter}}/>
            </IconButton>
        </Tooltip>
    )
    const handleClickToTop = () => {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        })
    }

    return (
        <Box className={classes.footer}>
            <Container 
                maxWidth={settings.maxWidth}
                fixed={settings.fixed}
                disableGutters={settings.disableGutters}
            > 
                <Box display='flex' alignItems="center" justifyContent='space-between'>
                    { createLogo() }
                    { buttonToTop() }
                </Box>
                 
            </Container>
        </Box>
    ) 
}

export default Footer
