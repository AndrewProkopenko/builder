import React from 'react'; 

import {Link} from 'react-router-dom'

import {
    Typography,
    Breadcrumbs, 
    Container,
    makeStyles
} from '@material-ui/core'; 

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeIcon from '@material-ui/icons/Home';

import CategoryContext from '../../context/headerContext/CategoryContext'


const SimpleBreadcrumbs = (props) =>  {
    
    const { settings } = React.useContext(CategoryContext)   
     
    const useStyles = makeStyles( theme => ({
        breadcrumbsContainer: {
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: theme.palette.primary.light
        }
    }))

    const classes = useStyles();
      
    return ( 
        <div className={classes.breadcrumbsContainer} >
            <Container
                disableGutters={settings.disableGutters}
                fixed={settings.fixed} 
                maxWidth={settings.maxWidth} 
            >
                {
                    props.breadcrumbs &&
                    <Breadcrumbs  
                        separator={<NavigateNextIcon fontSize="small" />} 
                        aria-label="breadcrumb"
                    >
                        
                        <Link color="inherit" to="/" >
                            <HomeIcon fontSize="small" />
                        </Link>
                        {    
                            props.breadcrumbs.map((crumb, index) => {
                                if(props.breadcrumbs.length - 1 !== props.breadcrumbs.indexOf(crumb))
                                return(
                                    <Link key={index} color="inherit" to={`/${crumb.slug}`} >
                                        {crumb.title}
                                    </Link>
                                )
                                else return (
                                <Typography color="textPrimary">
                                    {crumb.title}
                                </Typography> 
                                )  
                            })
                        }
                        {/* <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                            Core
                        </Link>
                        <Typography color="textPrimary">Breadcrumb</Typography> */}
                    </Breadcrumbs>
                }
            </Container>  
        </div>
    );
}

export default SimpleBreadcrumbs