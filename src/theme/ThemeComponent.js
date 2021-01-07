import React from 'react' 

import { ThemeProvider } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline'; 
import { createMuiTheme } from '@material-ui/core/styles'; 
   
import CategoryContext from '../context/headerContext/CategoryContext'  
import SendFormContext from '../context/sendFormContext/SendFormContext'  

import RouterComponent from '../Router/RouterComponent'
import Alert from '../components/placeholders/Alert'

function ThemeComponent() {   
    const {themeLight, themeDark, themeMode } = React.useContext(CategoryContext) 
    const { isShowAlert, closeAlert } = React.useContext(SendFormContext)  
    
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
            {
                isShowAlert &&
                <Alert severity={isShowAlert} closeAlert={closeAlert} /> 
            }
            <RouterComponent/>

        </ThemeProvider>
    )
}

export default ThemeComponent
