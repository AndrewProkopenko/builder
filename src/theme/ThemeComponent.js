import React, {useContext} from 'react' 

import { ThemeProvider } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline'; 
import { createMuiTheme } from '@material-ui/core/styles'; 
   
import CategoryContext from '../context/headerContext/CategoryContext'  
import SendFormContext from '../context/sendFormContext/SendFormContext'  

import RouterComponent from '../Router/RouterComponent'

import Alert from '../components/utilits/Alert'

function ThemeComponent() {   
    const {themeLight, themeDark, themeMode } = useContext(CategoryContext) 
    const { isShowAlert } = useContext(SendFormContext)  
    
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
                <Alert  /> 
            } 
            <RouterComponent/>

        </ThemeProvider>
    )
}

export default ThemeComponent
