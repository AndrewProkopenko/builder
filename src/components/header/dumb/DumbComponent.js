import React, {useState, useEffect} from 'react'
import { NavLink } from "react-router-dom";

import firebase from '../../../firebase/firebase'

import ModeContext from '../../../context/modeContext/ModeContext'  
import ModalContext from '../../../context/modalContext/ModalContext'  
import CategoryContext from '../../../context/headerContext/CategoryContext'
import SendFormContext from '../../../context/sendFormContext/SendFormContext'

import ThemeSwitcher from './ThemeSwitcher'

import Desktop from './desktop'
import Mobile from './mobile'
   
import { 
    AppBar, 
    Typography,
    makeStyles, 
    Container, 
    Box, 
    Button, 
} from "@material-ui/core"; 
import { darken } from '@material-ui/core/styles';


import { getColorByPalette } from '../../functions/colorChanger/ColorCalculation'

function DumbComponent() { 

    console.log('dumb header')

    const { setCustomAlert } = React.useContext(SendFormContext)
    const { user } = React.useContext(ModeContext)
    const { handleOpen  } = React.useContext(ModalContext)
    const {categories, logo, modal,  settings } = React.useContext(CategoryContext)    
    
    const [mobileView, setMobileView] = useState(true); 
   
    let backgroundHeader
    let colorHeader 
    let hoverActiveLinkColor 
  
    let modalBtnColor = modal.color  

    let widthMobile 
     
    const headerRef = React.useRef(null);
    const topHeaderRef = React.useRef(null);
  
    const useStyles = makeStyles((theme) => {
        widthMobile = theme.breakpoints.values[`${settings.breakpoint}`] 
        modalBtnColor= getColorByPalette(theme, modal.color)  

        backgroundHeader = getColorByPalette(theme, settings.classes.backgroundColor) 

        hoverActiveLinkColor = darken(backgroundHeader, 0.3)
        colorHeader =  theme.palette.getContrastText(backgroundHeader)  
 
        if(settings.classes.backgroundColor === 'paper' || settings.classes.backgroundColor === 'default') {  
            hoverActiveLinkColor = theme.palette.primary.main 
        }  
 
        return ({
            header: { 
                display: 'flex', 
                justifyContent: 'center',   

                backgroundColor: backgroundHeader, 
                color: `${colorHeader} !important`,  
  
                position: settings.classes.position,   
                boxShadow: settings.classes.boxShadow, 

                transition: `200ms ${theme.transitions.easing.easeInOut} `, 
               
                top: 0,  
                zIndex: 1000,

                [`@media (max-width: ${widthMobile}px)`]: {
                    paddingTop: settings.classes.paddingY * 0.5,  
                    paddingBottom: settings.classes.paddingY * 0.5,  
                }, 
                '&.sticky' : {
                    transform: "translateY(-41px)",
                    [`@media (max-width: ${widthMobile}px)`]: {
                        transform: "translateY(0px)",
                    }
                }
            },
            fixedPadding: { 
                minHeight: 100 + settings.classes.paddingY*2 , 
                [`@media (max-width: ${widthMobile}px)`]: {
                    minHeight: 60 + settings.classes.paddingY , 
                },
            },
            topHeader: {   
                height: '100%', 
                paddingTop: 5, 
                paddingBottom: 5,  
                backgroundColor:  "rgba(0, 0, 0, 0.16)" , 
                transition: `200ms ${theme.transitions.easing.easeInOut} `,  
                '&.sticky' : {
                    // transform: 'scaleY(0)',
                    // transformOrigin: 'top', 
                    height: 0, 
                    opacity: 0
                }
            },
            logoMain: { 
                fontWeight: 700,
                fontSize: 22,
                color: colorHeader , 
                textDecoration: 'none',
                textAlign: "left",
                whiteSpace: 'nowrap',
                [`@media (max-width: ${widthMobile}px)`]: {
                    fontSize: 16,
                    lineHeight: 1.2
                },
            },
            logoSub: { 
                fontWeight: 400,
                fontSize: 12,
                margin: 0,
                color: colorHeader ,
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
                [`@media (max-width: ${widthMobile}px)`]: {
                    width: 60, 
                    height: 50, 
                },
            }, 
            buttonModal: { 
                backgroundColor: modalBtnColor,   
                color: theme.palette.getContrastText(modalBtnColor), 
                transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`,
                textTransform: 'inherit', 
                padding: theme.spacing(1, 3), 
                cursor: 'pointer', 
                '&:hover': {  
                    backgroundColor: darken(modalBtnColor, .3) , 
                }
            }, 
            linkModal: {  
                textTransform: 'inherit', 
                color: colorHeader, 
                padding: theme.spacing(0.5, 1.2),
                '&:hover': { 
                    backgroundColor: modalBtnColor, 
                    color: theme.palette.getContrastText(modalBtnColor), 
                    cursor: 'pointer'
                }
            }
        })
    });
    const { header, logoImage ,logoMain , logoSub, fixedPadding, buttonModal, linkModal, topHeader} = useStyles();
  
    useEffect(() => {  
        const setResponsiveness = () => {  
            return window.innerWidth < widthMobile ? setMobileView(true)  : setMobileView(false) 
        }; 
        const setScrollHeader = () => { 
            if(mobileView) {
                const headerTop =  window.pageYOffset 
                try {
                    if( headerTop > 1 ) {
                        headerRef.current.classList.add('sticky')
                    } else {
                        headerRef.current.classList.remove('sticky')
                    }
                }
                catch (err) {
                    console.log(err)
                } 
            }
        } 
        setResponsiveness(); 
        setScrollHeader();

        window.addEventListener("resize", setResponsiveness);
        window.addEventListener("scroll", setScrollHeader);

        return function cleanupListener() { 
            window.removeEventListener('resize', setResponsiveness) 
            window.removeEventListener('scroll', setScrollHeader) 
        }
        // eslint-disable-next-line 
    }, []);
     

    const openModal = () => { 
        handleOpen(modal.target) 
    }

    const handleSignOut = () => { 
        firebase.logout()
        setCustomAlert('warning', 'You are logged out successfully', 3000)
    }
  
    const createLogo = (
        <NavLink to={'/'} style={{textDecoration: 'none'}} >
            <Box display="flex" alignItems="center">
                <img className={logoImage} src={logo.image} alt={'logo'}/>
                <Box display="flex" flexDirection="column">
                    <Typography component="h1" className={logoMain}>
                        {logo.mainText}
                    </Typography>
                    <Typography  component="p" className={logoSub}>
                        {logo.subText}
                    </Typography>
                </Box>
            </Box>
            
        </NavLink> 
    );

    const createModalBtn = ( 
        <Button 
            variant="contained"
            size='small' 
            className={buttonModal}
        >
            { modal.text }
        </Button>
    ) 
    const topHeaderModalBtn = () => ( 
        <Button
            onClick={() => { openModal(modal.target) }} 
            className={linkModal}
            size='small' 
        >
            { modal.text }
        </Button>
    ) 
        
    const renderModal = modal.isModal ? createModalBtn : ( <span></span> )
 

    return (
        <React.Fragment>
            
                 
            {
                settings.classes.position === 'fixed' &&
                <div className={fixedPadding}></div>
            } 
            <AppBar className={header} ref={headerRef}  id='header'>
                    { 
                        !mobileView &&
                        <Box className={topHeader} ref={topHeaderRef} >
                            <Container 
                                disableGutters={settings.disableGutters}
                                fixed={settings.fixed} 
                                maxWidth={settings.maxWidth}  
                            > 
                                <Box display='flex' alignItems='center' justifyContent='space-between'>
                                    {  modal.isModal ? topHeaderModalBtn() : ( <span></span> ) }
                                    <Box display='flex' alignItems='center' >
                                        
                                        <ThemeSwitcher/>
                                        
                                        {
                                            user ?
                                            <Button 
                                                size='small'
                                                color='secondary' 
                                                variant={'contained'} 
                                                onClick={handleSignOut}
                                            >
                                                Sign Out
                                            </Button>
                                            :
                                            <NavLink to='/login'>
                                                <Button 
                                                    color='default' 
                                                    variant="outlined"
                                                    size='small'
                                                >
                                                    Login
                                                </Button>
                                            </NavLink>
                                        }
                                        
                                    </Box>
                                </Box>
                            </Container>
                        </Box>
                    }
                <Container 
                    disableGutters={settings.disableGutters}
                    fixed={settings.fixed} 
                    maxWidth={settings.maxWidth} 
                    className='link-in-header' 
                > 
                    {   !mobileView ? 
                        <Desktop   
                            logo={createLogo}  
                            categories={categories} 
                            settings={settings}
                            colorHeader={colorHeader}
                            backgroundHeader={backgroundHeader}
                            hoverActiveLinkColor={hoverActiveLinkColor}
                        /> 
                        : 
                        <Mobile 
                            openModal={openModal}
                            iconColor={colorHeader}  
                            menuColor={backgroundHeader}  
                            modalBtn={renderModal}
                            logo={createLogo}  
                            categories={categories}  
                            user={user}
                            handleSignOut={handleSignOut}
                        /> }
                </Container>
            </AppBar> 
        </React.Fragment>
    )
}

export default DumbComponent
