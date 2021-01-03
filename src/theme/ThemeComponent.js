import React from 'react' 

import { ThemeProvider } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline'; 
import { createMuiTheme } from '@material-ui/core/styles'; 
   
import CategoryContext from '../context/headerContext/CategoryContext'  

import RouterComponent from '../Router/RouterComponent'

function ThemeComponent() {   
    const {themeLight, themeDark, themeMode } = React.useContext(CategoryContext) 
  
    // console.log(themeLight, themeDark, themeMode)
    
    let themeCreate 
    if(themeMode === 'dark') { 
        themeCreate = createMuiTheme(themeDark);
    }
    if(themeMode === 'light') { 
        themeCreate = createMuiTheme(themeLight);
    }
    // const themeCreate = createMuiTheme({
    //     palette: {
    //         type: themeMode,

    //         primary: {
    //             main: themeMode === 'dark' ?  '#142E6F' : '#1fa67a',
    //         },
    //         secondary: {
    //             main:  '#db4453' ,
    //         },
    //         // background: {
    //         //     default: themeMode === 'dark' ? "#363636" : "#f2f2f2" 
    //         // }
    //     },  
    // });

    return (
        <ThemeProvider theme={themeCreate} >
            
            
            <CssBaseline/>   

            <RouterComponent/>

        </ThemeProvider>
    )
}

export default ThemeComponent
