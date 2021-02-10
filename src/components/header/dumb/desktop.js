import React from 'react'
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import {  
    Toolbar, 
    Button, 
    Box, 
    makeStyles,
    ListItem, 
    ListItemText,
    List,
    Paper
} from "@material-ui/core";
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

import "../../../assets/style/header.scss"
 

const Desktop = (props) => { 
    
    const location = useLocation()
    const currentPath = location.pathname 

    const useStyles = makeStyles((theme) => { 

        return ({
             
            menuButton: { 
                position: 'relative', 
                fontWeight: 700, 
                // marginLeft: "38px",
                height: '100%', 
                listStyle: 'none', 
                 
            },
            menuButtonLink: { 
                textTransform: 'inherit',
                padding: '5px 16px', 
                [`@media (max-width: ${theme.breakpoints.values.lg}px)`]: {
                    padding: '5px 12px', 
                }, 

                borderRadius: 0, 
                height: "100%",
                
                color: 'inherit'
               
            },
            menuLink: {
                position: 'relative', 
                display: 'block',
                height: "100%", 
                width: '100%',
                color: props.colorHeader,
                textDecoration: 'none',   
                // backgroundColor: theme.palette.background.default,
                transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn}`,
                '&:hover': {
                    backgroundColor: props.hoverActiveLinkColor,
                    // backgroundColor: theme.palette.primary.light,
                    color: theme.palette.type === "dark" ? theme.palette.text.default : theme.palette.background.paper ,

                },
                '&.active': {
                    backgroundColor: props.hoverActiveLinkColor,
                    color: theme.palette.type === "dark" ? theme.palette.text.default : theme.palette.background.paper ,
                    
                },
            },
            menuInnerLink: { 
                color: theme.palette.text.primary , 
            }, 
            menuButtonInnerLi: {
                position: 'absolute',
                top: '100%',
                right: 0,   
                backgroundColor: theme.palette.background.paper, 
                minWidth: '100%', 
                maxWidth: 200, 
                transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeIn}`, 
            },
            toolbar: {
                display: "flex",
                justifyContent: "flex-start", 
                paddingTop: props.settings.classes.paddingY,  
                paddingBottom: props.settings.classes.paddingY,  
                // paddingLeft: 10, 
                // paddingRight: 10
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
                
            },
            lineActiveCategory: {
                position: 'absolute',
                bottom: 0, 
                left: 0, 
                right: 0, 
                width: '100%', 
                height: 4, 
                backgroundColor: props.hoverActiveLinkColor, 
            }
            
            
        })
    });
    const { toolbar, menuButton , menuButtonInnerLi , menuButtonLink,  menuLink , menuInnerLink,  listUnstyle, lineActiveCategory } = useStyles();
 
    return (
      <Toolbar disableGutters={true} className={toolbar}>
           
        {props.logo}  

        <Box mx={4}>
            {props.modalBtn}
        </Box>

        <Box display='flex' clone={true} className='link-in-header'>
            <ul className={listUnstyle} >
            {
                props.categories.map( (item, index) => { 
                return (
                    <li key={index} className={menuButton}>
                        {
                            item.slug === '/' &&
                            <NavLink  
                                    exact
                                    to={`${item.slug}`}
                                    className={menuLink}
                            > 
                                <Button className={menuButtonLink}> 
                               
                                    {item.title} 
                                </Button>
                            </NavLink>
                            
                        }
                        {
                            item.slug !== '/' &&
                            
                                <NavLink  
                                    exact
                                    to={`/${item.slug}`}
                                    className={menuLink}
                                >
                                    {
                                        currentPath.includes(`/${item.slug}/`) && <span className={lineActiveCategory} />
                                    }
                                    <Button className={menuButtonLink}> 
                                        {item.title} 
                                        {
                                            item.pages.length > 0 && <Box display='flex' alignItems='center' pl={1} mr={'-4px'}><ExpandMoreOutlinedIcon/></Box>
                                        }
                                    </Button>
                                </NavLink>
                        }
                        

                        {
                            item.pages.length > 0 && 
                            <List disablePadding={true} className={menuButtonInnerLi}> 
                                <Paper>
                                {  
                                    item.pages.map( (innerItem, innerIndex) => (
                                        <NavLink  
                                            key={innerIndex} 
                                            to={`/${item.slug}/${innerItem.slug}`} 
                                            className={` ${menuLink} ${menuInnerLink}`} 
                                            style={{minWidth: innerItem.title.length > 15 ? 200 : '100%',  maxWidth: 200, }} 
                                        > 
                                            <ListItem button> 
                                                <ListItemText primary={innerItem.title} />   
                                            </ListItem>
                                        </NavLink>
                                    
                                    ))
                                } 
                                </Paper>
                            </List>
                        }
                    </li>
                );
                })
            }
            </ul>
        </Box>
       
      </Toolbar>
    );
};

export default Desktop
