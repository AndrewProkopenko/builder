import React from 'react'; 

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
    
    const { settings } = React.useContext(CategoryContext)   
     
    const useStyles = makeStyles( theme => ({
        breadcrumbsContainer: {
            margin: '10px 0', 
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            backgroundColor: theme.palette.background.paper
        },
        breadcrumbLink: {
            color: theme.palette.text.primary,
            textDecoration: 'none', 

        }
    }))

    const classes = useStyles();
      
    return (  
        <React.Fragment>
            {
                props.breadcrumbs &&
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
                                    <Typography color="textDisabled">
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
                    
                    </Paper>
                </Container>  
            } 
        </React.Fragment>
    );
}

export default SimpleBreadcrumbs