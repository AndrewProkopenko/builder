import React from 'react' 

import { ThemeProvider } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline'; 
import { createMuiTheme } from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/purple';
// import green from '@material-ui/core/colors/green';
  
import ThemeContext from '../context/themeContext/ThemeContext'  
import RouterComponent from '../Router/RouterComponent'

function ThemeComponent() {  
    const {themeMode} = React.useContext(ThemeContext) 
 
    const theme = createMuiTheme({
        palette: {
            type: themeMode,
            primary: {
                main: themeMode === 'dark' ?  '#3185d8' : '#311b92',
            },
            secondary: {
                main:  '#f40b00' ,
            },
        },  
    });

    return (
        <ThemeProvider theme={theme} >
            
            
            <CssBaseline/>   

            <RouterComponent/>

        </ThemeProvider>
    )
}

export default ThemeComponent
