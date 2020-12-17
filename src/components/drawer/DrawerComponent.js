import React from 'react';  
import Drawer from '@material-ui/core/Drawer'; 
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
 

 const TemporaryDrawer = (props) => { 
    
    const [open, setOpen] = React.useState(false)

    const toggleDrawer =  () => {  
        setOpen(!open)
    };
    let btnDrawerStyle = {
        position: 'absolute', 
        top: 0, 
        right: 0
    }

    return (   
        <React.Fragment>
            <IconButton 
                aria-label="add an alarm" 
                onClick={toggleDrawer}
                variant="contained"
                size='medium'
                color={"primary"} 
                style={btnDrawerStyle}
            >  
            <SettingsIcon fontSize='small'/>
            </IconButton>
            
            <Drawer anchor={'right'} open={open} onClose={toggleDrawer}>
            <div 
                className='sidebar'
                role="presentation" 
            >  
                sidebar
            </div>
            </Drawer>
        </React.Fragment> 
    );
}
 
export default TemporaryDrawer