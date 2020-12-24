import React, {useState, useEffect} from 'react'
import CategoryContext from '../../context/categoryContext/CategoryContext'
import { Link as RouterLink , NavLink} from "react-router-dom";

import "../../assets/header.scss"
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    Link,
    MenuItem,
    Container, 
    Box,
} from "@material-ui/core";
 
import MenuIcon from "@material-ui/icons/Menu"; 

const widthMobile = 900

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
    // btnSetting: {
    //   opacity: 0,
    //   position: 'absolute', 
    //   top: 0, 
    //   left: 20,
    //   backgroundColor: orange[700], 
    //   '&:hover': {
    //     backgroundColor: orange[900], 
    //   }
    // }
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

    const { toolbar, header, logo , menuButton, drawerContainer} = useStyles();
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
                {
                    categories.map( (item, index) => {
                    return ( 
                        <Link
                        {...{
                            component: RouterLink,
                            to: item.slug ,
                            color: "inherit",
                            style: { textDecoration: "none" },
                            key: index,
                        }}
                        >
                            <MenuItem>{item.title}</MenuItem>
                            {/* {
                                item.pages.map( page => {

                                })
                            } */}
                        </Link>
                    );
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
                fixed={true} 
                maxWidth={'lg'} 
                className='link-in-header' 
            > 
                {mobileView ? displayMobile() : displayDesktop()}
            </Container>
        </AppBar> 
    )
}

export default DumbComponent
