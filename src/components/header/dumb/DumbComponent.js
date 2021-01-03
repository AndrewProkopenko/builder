import React, {useState, useEffect} from 'react'
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
} from "@material-ui/core"; 
function DumbComponent() {

    const {categories, logo, settings} = React.useContext(CategoryContext)    
  
   const [headerHeight, setHeaderHeight] = useState(0)

  

    let widthMobile 
    
    const useStyles = makeStyles((theme) => {
        widthMobile = theme.breakpoints.values[`${settings.breakpoint}`]
        return ({
            header: { 
                display: 'flex', 
                justifyContent: 'center',   

                backgroundColor: theme.palette.background.paper, 

                position: settings.classes.position,  
                // paddingTop: settings.classes.paddingY,  
                // paddingBottom: settings.classes.paddingY,  
                // backgroundColor: settings.classes.backgroundColor, 
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
               
        })
    });
    const { header, logoImage ,logoMain , logoSub,  fixedPadding} = useStyles();
  
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
                        <Desktop logo={createLogo}  categories={categories} settings={settings}/> 
                        : 
                        <Mobile logo={createLogo}  categories={categories}  /> }
                </Container>
            </AppBar> 
        </React.Fragment>
    )
}

export default DumbComponent
