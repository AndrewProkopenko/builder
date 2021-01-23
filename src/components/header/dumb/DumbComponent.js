import React, {useState, useEffect} from 'react'
import ModalContext from '../../../context/modalContext/ModalContext'  
import CategoryContext from '../../../context/headerContext/CategoryContext'
import { NavLink } from "react-router-dom";

import Desktop from './desktop'
import Mobile from './mobile'

// import "../../assets/header.scss"
import { 
    AppBar, 
    Typography,
    makeStyles, 
    Container, 
    Box, 
    Button,
    FormControlLabel, 
    Switch
} from "@material-ui/core"; 
import { darken } from '@material-ui/core/styles';

import {getColorByPaletteForGradient, getColorByPalette } from '../../library/colorPicker/ColorCalculation'

function DumbComponent() { 

    console.log('dumb header')

    const { handleOpen  } = React.useContext(ModalContext)
    const {categories, logo, modal,  settings, setThemeMode, themeMode} = React.useContext(CategoryContext)    
  
    const checked = themeMode === 'dark' ? true : false

    const [headerHeight, setHeaderHeight] = useState(0)

    const [mobileView, setMobileView] = useState(false); 
   
    let backgroundHeader = settings.classes.backgroundColor
    let colorHeader 
    let hoverActiveLinkColor
  
    let modalBtnColor1 = modal.color
    let modalBtnColor2 = modal.color

    let widthMobile 
    
    
    const headerRef = React.useRef(null);
    const topHeaderRef = React.useRef(null);


    const useStyles = makeStyles((theme) => {
        widthMobile = theme.breakpoints.values[`${settings.breakpoint}`]
        
        modalBtnColor1= getColorByPaletteForGradient(theme, modal.color)[0]
        modalBtnColor2= getColorByPaletteForGradient(theme, modal.color)[1]
 
        backgroundHeader = getColorByPalette(theme, backgroundHeader)
 

        if(backgroundHeader === 'primary') {
            backgroundHeader = theme.palette.primary.main
            colorHeader = theme.palette.getContrastText(theme.palette.primary.main)
            hoverActiveLinkColor = darken(theme.palette.primary.main, 0.3)
        }
        if(backgroundHeader === 'secondary') {
            backgroundHeader = theme.palette.secondary.main
            colorHeader = theme.palette.getContrastText(theme.palette.secondary.main)
            hoverActiveLinkColor = darken(theme.palette.secondary.main, 0.3)
        }
          

        if( 
            backgroundHeader !== 'default' && 
            backgroundHeader !== 'paper' && 
            backgroundHeader !== 'primary' && 
            backgroundHeader !== 'secondary' &&
            backgroundHeader !== 'warning' &&
            backgroundHeader !== 'error' &&
            backgroundHeader !== 'info' &&
            backgroundHeader !== 'success' 
        ) {  
                colorHeader = theme.palette.getContrastText(backgroundHeader)
                hoverActiveLinkColor = darken(backgroundHeader, 0.5) 
        }   
        if(backgroundHeader === 'paper') { 
            backgroundHeader = theme.palette.background.paper
            colorHeader = theme.palette.getContrastText(theme.palette.background.paper)
            hoverActiveLinkColor = theme.palette.primary.main 
        }  
        if(backgroundHeader === 'default') { 
            backgroundHeader = theme.palette.background.default
            colorHeader = theme.palette.getContrastText(theme.palette.background.default)
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

               
                top: 0, 
                // left: 0,
                // right: 0,
                zIndex: 1000,

                [`@media (max-width: ${widthMobile}px)`]: {
                    paddingTop: settings.classes.paddingY * 0.5,  
                    paddingBottom: settings.classes.paddingY * 0.5,  
                }, 
            },
            fixedPadding: { 
                minHeight: headerHeight
            },
            topHeader: {   
                height: 35, 
                backgroundColor: theme.palette.background.default, 
                transition: `200ms ${theme.transitions.easing.easeInOut} `, 
                '&.sticky' : {
                    // transform: 'scaleY(0)',
                    // transformOrigin: 'top', 
                    height: 0, 
                    opacity: 0
                }
            },
            logoMain: { 
                fontWeight: 600,
                fontSize: 24,
                color: colorHeader , 
                textDecoration: 'none',
                textAlign: "left",
                whiteSpace: 'nowrap',
                [`@media (max-width: ${widthMobile}px)`]: {
                    fontSize: 18,
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
                backgroundImage: `linear-gradient(180deg, ${modalBtnColor1} 0%, ${modalBtnColor2} 100%)`,  
                color: theme.palette.getContrastText(modalBtnColor2), 
                transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`,
                textTransform: 'inherit', 
                padding: theme.spacing(1, 3), 
                cursor: 'pointer', 
                '&:hover': { 
                    color: theme.palette.getContrastText(modalBtnColor2) ,
                    backgroundImage: `linear-gradient(200deg, ${modalBtnColor1} 0%, ${modalBtnColor2} 100%)`, 
                }
            }
        })
    });
    const { header, logoImage ,logoMain , logoSub, fixedPadding, buttonModal, topHeader} = useStyles();
  
    useEffect(() => {  
        const setResponsiveness = () => {
            const headHeight =  headerRef.current.clientHeight
            
            console.log('resize header')
            setHeaderHeight(headHeight + 5)
            
            return window.innerWidth < widthMobile ? setMobileView(true)  : setMobileView(false) 
        }; 
        const setScrollHeader = () => { 
            const headerTop =  window.pageYOffset
            try {
                if( headerTop > 1 ) {
                    topHeaderRef.current.classList.add('sticky')
                } else {
                    topHeaderRef.current.classList.remove('sticky')
                }
            }
            catch (err) {
                console.log(err)
            }
            console.log(headerTop)
        }
        // setScrollHeader()
        setResponsiveness(); 
        window.removeEventListener('resize', setResponsiveness)
        window.addEventListener("resize", () => setResponsiveness());

        window.removeEventListener('scroll', setScrollHeader)
        window.addEventListener("scroll", () => setScrollHeader());
        // eslint-disable-next-line
    }, []);
     

    const openModal = () => {
        handleOpen('')
    }

    const handleChange = () => {
        let newMode = themeMode === 'dark' ? 'light' : 'dark' 
        setThemeMode(newMode)
    }

    const themeSwitch = () => (
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
    )

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
            onClick={openModal} 
            variant="contained"
            size='small' 
            className={buttonModal}
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
                
                    <Box className={topHeader} ref={topHeaderRef} >
                        <Container 
                            disableGutters={settings.disableGutters}
                            fixed={settings.fixed} 
                            maxWidth={settings.maxWidth}  
                        > 
                            <Box display='flex' alignItems='center'>
                                {themeSwitch()} 
                                <NavLink to='/login'>
                                    <Button 
                                        color='default' 
                                        variant="outlined"
                                        size='small'
                                    >
                                        Login
                                    </Button>
                                </NavLink>
                            </Box>
                        </Container>
                    </Box>
                <Container 
                    disableGutters={settings.disableGutters}
                    fixed={settings.fixed} 
                    maxWidth={settings.maxWidth} 
                    className='link-in-header' 
                > 
                    {   !mobileView ? 
                        <Desktop 
                            themeSwitch={themeSwitch}
                            modalBtn={renderModal}
                            logo={createLogo}  
                            categories={categories} 
                            settings={settings}
                            colorHeader={colorHeader}
                            backgroundHeader={backgroundHeader}
                            hoverActiveLinkColor={hoverActiveLinkColor}
                        /> 
                        : 
                        <Mobile 
                            themeSwitch={themeSwitch}
                            modalBtn={renderModal}
                            logo={createLogo}  
                            categories={categories}  
                        /> }
                </Container>
            </AppBar> 
        </React.Fragment>
    )
}

export default DumbComponent
