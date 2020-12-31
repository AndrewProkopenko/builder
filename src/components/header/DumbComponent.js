import React, {useState, useEffect} from 'react'
import CategoryContext from '../../context/headerContext/CategoryContext'
import { NavLink } from "react-router-dom";

import "../../assets/header.scss"
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    Drawer, 
    MenuItem,
    Container, 
    Box,
    AccordionSummary,
    Accordion
} from "@material-ui/core";
 
import MenuIcon from "@material-ui/icons/Menu"; 
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'; 
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

// const widthMobile = 992


function DumbComponent() {

    const {categories, logo, settings} = React.useContext(CategoryContext)    
 
   const [headerHeight, setHeaderHeight] = useState(0)

    useEffect(() => {  
        const setResponsiveness = () => {
            const headHeight =  document.querySelector('#header').clientHeight
            
            setHeaderHeight(headHeight)
            
            return window.innerWidth < widthMobile
            ? setState((prevState) => ({ ...prevState, mobileView: true }))
            : setState((prevState) => ({ ...prevState, mobileView: false }));
        }; 
        setResponsiveness(); 
        window.removeEventListener('resize', setResponsiveness)
        window.addEventListener("resize", () => setResponsiveness());
       
    }, []);

    let widthMobile 
    const useStyles = makeStyles((theme) => {
        widthMobile = theme.breakpoints.values.md
        return ({
            header: { 
                display: 'flex', 
                justifyContent: 'center',  

                position: settings.classes.position, 
                paddingTop: settings.classes.paddingY,  
                paddingBottom: settings.classes.paddingY,  
                backgroundColor: theme.palette.primary.main, 
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
                height: headerHeight
            },
            logoMain: { 
                fontWeight: 600,
                fontSize: 24,
                color: "#FFFEFE",
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
                color: "##DFDFDF",
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
            menuButton: { 
                position: 'relative', 
                fontWeight: 700,
                size: "18px",
                marginLeft: "38px",
                '&>.active': {
                    paddingBottom: 3,
                    borderBottom: '2px solid #ffffff52'
                }
            },
            toolbar: {
                display: "flex",
                justifyContent: "space-between",
                padding: 0
            },
            drawerContainer: { 
                width: '50vw', 
                maxWidth: 450, 
                minWidth: 260
            }, 
            mobileLink: { 
                display: 'flex',
                alignItems: 'center', 
                color: 'inherit', 
                textDecoration: 'none', 
                height: '100%', 
                minHeight: 48,
                width: '100%', 
                padding: '6px 16px', 
                '&.active' : {
                    backgroundColor: theme.palette.primary.main,
                    color: '#fff'
                }
            },  
            accordionReset: {
                paddingLeft: 0,
                marginTop: ' 0 !important', 
                marginBottom: '0 !important',
                minHeight: 'auto !important', 
                background : 'none', 
                boxShadow: 'none'
            },
            
        })
    });
    const { toolbar, header, logoImage ,logoMain , logoSub, menuButton, drawerContainer, mobileLink , accordionReset , fixedPadding} = useStyles();
  
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    }); 
     
    const { mobileView, drawerOpen } = state;

    const femmecubatorLogo = (
        <NavLink to={'/'} >
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

    const displayDesktop = () => {
        return (
          <Toolbar className={toolbar}>
            {femmecubatorLogo}
    
            <Box display='flex' clone={true}>
                <ul >
                {
                    categories.map( (item, index) => { 
                    return (
                        <li key={index} className={menuButton}>
                            {
                                item.slug === '/' &&
                                <NavLink  
                                    exact
                                    to={`${item.slug}`}
                                >
                                    {item.title} 
                                </NavLink>
                                
                            }
                           {
                                item.slug !== '/' &&
                                <NavLink  
                                    exact
                                    to={`/${item.slug}`}
                                >
                                    {item.title} 
                                </NavLink>
                           }
                            <ul >
                            {
                                item.pages.map( (innerItem, innerIndex) => (
                                <li key={innerIndex}>
                                    <NavLink exact to={`/${item.slug}/${innerItem.slug}`} >
                                        {innerItem.title}
                                    </NavLink>
                                </li>
                                ))
                            }
                            </ul>
                        </li>
                    );
                    })
                }
                </ul>
            </Box>
          </Toolbar>
        );
    };
    
    const displayMobile = () => {
        const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Toolbar style={{justifyContent: 'space-between'}}> 
                <Drawer
                    {...{
                    anchor: "right",
                    open: drawerOpen,
                    onClose: handleDrawerClose,
                    }}
                >
                    <div className={drawerContainer}>
                        <Box mx={2} my={1}  >
                            <Button 
                                variant='outlined'
                                color='default'
                                onClick={handleDrawerClose}
                            >
                                <ArrowRightAltIcon/>
                            </Button>
                        </Box>
                        
                        {
                            categories.map( (item, index) => {  
                                if(item.pages.length > 0) {
                                    return (  
                                        <Accordion classes={{root: accordionReset}} key={index} >
                                            <AccordionSummary
                                                classes={{root: accordionReset, content: accordionReset  }}
                                                expandIcon={ <ExpandMoreOutlinedIcon />}
                                            >
                                                <MenuItem style={{padding: 0, width: '100%'}}> 
                                                    <NavLink 
                                                        exact
                                                        to={`/${item.slug}`}  
                                                        className={mobileLink}
                                                        onClick={handleDrawerClose}
                                                    >
                                                        {item.title}
                                                        
                                                    </NavLink> 
                                                </MenuItem>     
                                            </AccordionSummary>
                                            { 
                                                item.pages.map( page => (
                                                    <MenuItem style={{padding: '0 0 0 15px'}} key={index} > 
                                                        <NavLink 
                                                            exact
                                                            to={`/${item.slug}/${page.slug}`}  
                                                            className={mobileLink}
                                                            onClick={handleDrawerClose}
                                                        >   
                                                            {page.title}
                                                            
                                                        </NavLink> 
                                                    </MenuItem> 
                                                ))
                                            }
                                        </Accordion>                                
                                    );
                                }
                                else { 
                                    return (
                                        <MenuItem key={index}  style={{padding: 0, width: '100%', borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>  
                                            <NavLink 
                                                exact
                                                to={`/${item.slug}`}  
                                                className={mobileLink}
                                                onClick={handleDrawerClose}
                                            >
                                                {item.title} 
                                            </NavLink> 
                                        </MenuItem>     
                                    )
                                }
                                
                            })
                        }
                    </div>
                </Drawer>

                <div>{femmecubatorLogo}</div>
                <IconButton
                    {...{
                    edge: "start",
                    color: "inherit",
                    "aria-label": "menu",
                    "aria-haspopup": "true",
                    onClick: handleDrawerOpen,
                    }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        );
    };

    return (
        <React.Fragment>
            {
                settings.classes.position === 'fixed' &&
                <div className={fixedPadding}></div>
            }
            <AppBar className={header} id='header'>
                <Container 
                    disableGutters={settings.disableGutters}
                    fixed={settings.fixed} 
                    maxWidth={settings.maxWidth} 
                    className='link-in-header' 
                > 
                    {mobileView ? displayMobile() : displayDesktop()}
                </Container>
            </AppBar> 
        </React.Fragment>
    )
}

export default DumbComponent
