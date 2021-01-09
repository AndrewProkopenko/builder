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
    Button
} from "@material-ui/core"; 
import { darken } from '@material-ui/core/styles';

function DumbComponent() {

    const { handleOpen  } = React.useContext(ModalContext)
    const {categories, logo, modal,  settings} = React.useContext(CategoryContext)    
  
    const [headerHeight, setHeaderHeight] = useState(0)

    let modalBtnColor = modal.color
    let modalBtnColor1 
    let modalBtnColor2 

    let widthMobile 
    
    const useStyles = makeStyles((theme) => {
        widthMobile = theme.breakpoints.values[`${settings.breakpoint}`]
        if(modalBtnColor === 'primary') {
            modalBtnColor1 = theme.palette.primary.main
            modalBtnColor2 = theme.palette.primary.dark
        }
        if(modalBtnColor === 'secondary') {
            modalBtnColor1 = theme.palette.secondary.main
            modalBtnColor2 = theme.palette.secondary.dark
        }
        if(modalBtnColor !== 'primary' && modalBtnColor !== 'secondary' ) {
            modalBtnColor1 = modal.color
            modalBtnColor2 = modal.color
        } 

        return ({
            header: { 
                display: 'flex', 
                justifyContent: 'center',   

                backgroundColor: theme.palette.background.paper, 

                position: settings.classes.position,   
                boxShadow: settings.classes.boxShadow, 

                top: 0, 
                left: 0,
                right: 0,
                zIndex: 1000,

                [`@media (max-width: ${widthMobile}px)`]: {
                    paddingTop: settings.classes.paddingY * 0.5,  
                    paddingBottom: settings.classes.paddingY * 0.5,  
                }, 
            },
            fixedPadding: { 
                minHeight: headerHeight
            },
            logoMain: { 
                fontWeight: 600,
                fontSize: 24,
                color: theme.palette.text.primary,
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
                color: theme.palette.text.primary,
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
    const { header, logoImage ,logoMain , logoSub, fixedPadding, buttonModal } = useStyles();
  
    useEffect(() => {  
        const setResponsiveness = () => {
            const headHeight =  document.querySelector('#header').clientHeight
            
            setHeaderHeight(headHeight)
            
            return window.innerWidth < widthMobile ? setMobileView(true)  : setMobileView(false) 
        }; 
        setResponsiveness(); 
        window.removeEventListener('resize', setResponsiveness)
        window.addEventListener("resize", () => setResponsiveness());
       
    }, []);
     
    const [mobileView, setMobileView] = useState(false); 

    const openModal = () => {
        handleOpen('')
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
            <AppBar className={header}  id='header'>
                <Container 
                    disableGutters={settings.disableGutters}
                    fixed={settings.fixed} 
                    maxWidth={settings.maxWidth} 
                    className='link-in-header' 
                > 
                    {   !mobileView ? 
                        <Desktop 
                            modalBtn={renderModal}
                            logo={createLogo}  
                            categories={categories} 
                            settings={settings}
                        /> 
                        : 
                        <Mobile 
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
