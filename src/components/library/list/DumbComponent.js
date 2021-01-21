import React from 'react'

import { makeStyles } from '@material-ui/core/styles'; 

function DumbComponent(props) {

    console.log('dumb list') 
  
    const useStyles = makeStyles((theme) => ({
        myClassName: props.className ,  
        liClass: props.data.itemsStyle,
        mobileClass: {
            [theme.breakpoints.down('sm')]: {
                marginTop: props.className.marginTop === 0 ? 0 : (props.className.marginTop > 30 ? props.className.marginTop*0.6 : 15), 
                marginBottom: props.className.marginBottom === 0 ? 0 : (props.className.marginBottom > 30 ? props.className.marginBottom*0.6 : 15),  
                paddingLeft: props.className.paddingLeft === 0 ? 0 : (props.className.paddingLeft > 30 ? props.className.paddingLeft*0.6 : 15)
            } 
        }
      }));
    const classes = useStyles();
 
 
    return (
        <React.Fragment>
           <ul className={`${classes.myClassName} ${classes.mobileClass}`}>
                {
                    props.data.items.map( (item, index) => (
                        <li key={index} className={classes.liClass}>
                            {item}
                        </li>
                    ))        
                }
           </ul>
        </React.Fragment>
    )
}

export default DumbComponent
