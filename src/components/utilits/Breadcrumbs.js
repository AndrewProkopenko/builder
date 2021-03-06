import React , { useContext } from 'react'; 

import {Link} from 'react-router-dom'

import {
    Typography,
    Breadcrumbs, 
    Container,
    makeStyles,
    Paper
} from '@material-ui/core'; 

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeIcon from '@material-ui/icons/Home';

import CategoryContext from '../../context/headerContext/CategoryContext'


const SimpleBreadcrumbs = (props) =>  {
    
    const { settings } = useContext(CategoryContext)   
     
    const useStyles = makeStyles( theme => ({
        breadcrumbsContainer: {
            margin: '20px 0', 
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            backgroundColor: theme.palette.background.paper,
            [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
                paddingTop: 10,  
                paddingBottom: 10,  
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
            }, 
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                margin: '10px 0', 
            }, 
        },
        breadcrumbLink: {
            display: 'flex', 
            alignItems: 'center', 
            color: theme.palette.text.primary,
            textDecoration: 'none', 
            transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut} `,
            "&:hover": { 
                color: theme.palette.text.secondary
            }
        }
    }))

    const classes = useStyles();
      
    return (   
        <Container
            disableGutters={settings.disableGutters}
            fixed={settings.fixed} 
            maxWidth={settings.maxWidth} 
        >
            <Paper className={classes.breadcrumbsContainer} >
            
                <Breadcrumbs  
                    separator={<NavigateNextIcon fontSize="small" />} 
                    aria-label="breadcrumb"
                >
                    
                    <Link className={classes.breadcrumbLink} to="/"  >
                        <HomeIcon fontSize="small" />
                    </Link>
                    {    
                        props.breadcrumbs.map((crumb, index) => {
                            if(props.breadcrumbs.length - 1 !== props.breadcrumbs.indexOf(crumb))
                            return(
                                <Link key={index} className={classes.breadcrumbLink} to={`/${crumb.slug}`} >
                                    {crumb.title}
                                </Link>
                            )
                            else return (
                            <Typography key={index} >
                                {crumb.title}
                            </Typography> 
                            )  
                        })
                    }
                    
                </Breadcrumbs>
            
            </Paper>
        </Container>   
    );
}

export default SimpleBreadcrumbs