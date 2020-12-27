import React, {useState, useEffect} from 'react'
import CategoryContext from '../../context/categoryContext/CategoryContext'
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

const widthMobile = 992

const useStyles = makeStyles((theme) => ({
    header: {
      position: 'static' ,
      backgroundColor: theme.palette.primary.main, 
      [`@media (max-width: ${widthMobile}px)`]: {
          // paddingLeft: 0,
      }, 
    },
    logo: { 
      fontWeight: 600,
      color: "#FFFEFE",
      textAlign: "left",
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
    }
}));

function DumbComponent() {

    useEffect(() => { 
        const setResponsiveness = () => {
            return window.innerWidth < widthMobile
            ? setState((prevState) => ({ ...prevState, mobileView: true }))
            : setState((prevState) => ({ ...prevState, mobileView: false }));
        }; 
        setResponsiveness(); 
        window.addEventListener("resize", () => setResponsiveness());
    }, []);

    const { toolbar, header, logo , menuButton, drawerContainer, mobileLink , accordionReset} = useStyles();
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    }); 
    
    const {categories} = React.useContext(CategoryContext)    
    
    const { mobileView, drawerOpen } = state;

    const femmecubatorLogo = (
        <Typography variant="h6" component="h1" className={logo}>
            LogoText
        </Typography>
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
            <Toolbar disableGutters={true} style={{justifyContent: 'space-between'}}>
            

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
                                    <MenuItem style={{padding: 0, width: '100%', borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>  
                                        <NavLink 
                                            exact
                                            to={`/${item.slug}`} 
                                            key={index} 
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
        <AppBar className={header}>
            <Container
                disableGutters={true}
                fixed={false} 
                maxWidth={'lg'} 
                className='link-in-header' 
            > 
                {mobileView ? displayMobile() : displayDesktop()}
            </Container>
        </AppBar> 
    )
}

export default DumbComponent
