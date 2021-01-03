import React from 'react'
import { NavLink } from "react-router-dom";
import {  
    Toolbar, 
    makeStyles,
    Button,
    IconButton,
    Drawer, 
    MenuItem, 
    Box,
    AccordionSummary,
    Accordion, 
} from "@material-ui/core";
 
import MenuIcon from "@material-ui/icons/Menu"; 
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'; 
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
 


const Mobile = (props) => { 

    const useStyles = makeStyles((theme) => { 
        return ({
             
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
            listUnstyle: {
               position: 'absolute', 
               top: 0, 
               right: 0,
               bottom: 0,  
               display: 'flex', 
               height: '100%', 
               margin: 0,
               padding: 0, 
               '& li': {}
                
            }
            
        })
    });
    const { drawerContainer, mobileLink , accordionReset , fixedPadding} = useStyles();
   
    const [drawerOpen, setDrawerOpen] = React.useState(false); 
      
    const handleDrawerOpen = () => { 
        setDrawerOpen(true) 
    }
    const handleDrawerClose = () => { 
        setDrawerOpen(false) 
    }

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
                        props.categories.map( (item, index) => {  
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

            <div>
                {props.logo}
            </div>

            <IconButton
                {...{
                edge: "start",
                color: "textPrimary", 
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

export default Mobile
