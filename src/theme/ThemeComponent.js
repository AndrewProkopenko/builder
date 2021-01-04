import React from 'react' 

import { ThemeProvider } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline'; 
import { createMuiTheme } from '@material-ui/core/styles'; 
   
import CategoryContext from '../context/headerContext/CategoryContext'  

import RouterComponent from '../Router/RouterComponent'

function ThemeComponent() {   
    const {themeLight, themeDark, themeMode } = React.useContext(CategoryContext) 
    
    let themeCreate 
    if(themeMode === 'dark') { 
        themeCreate = createMuiTheme(themeDark);
    }
    else { 
        themeCreate = createMuiTheme(themeLight);
    }
     
    return (
        <ThemeProvider theme={themeCreate} >
             
            <CssBaseline/>   

            <RouterComponent/>

        </ThemeProvider>
    )
}

export default ThemeComponent
