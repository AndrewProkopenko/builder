import React from 'react';
 
import ThemeContext from './ThemeContext'

 

export default class ThemeProvider extends React.Component { 

    state = { 
        themeMode: 'light',
        theme: {
            palette: {
                type: 'light', 
                primary: {
                    main: themeMode === 'dark' ?  '#142E6F' : '#1fa67a',
                },
                secondary: {
                    main:  '#db4453' ,
                }, 
            },  
        }
    } 

    componentDidMount() {
        const storageMode =  localStorage.getItem('siteBuilderThemeMode') 
        if(storageMode == 'dark') {
            this.setState({
                themeMode: 'dark'
            })
        }
        else {
            this.setState({
                themeMode: 'light'
            })
        }
    }

    render() {
        return(
            <ThemeContext.Provider
                value={{
                    themeMode: this.state.themeMode,
                    theme: this.state.theme, 
                    setTheme: (theme) => {
                        this.setState({
                            theme: theme
                        })
                    },
                    setThemeMode: () => {
                        localStorage.setItem('siteBuilderThemeMode', this.state.themeMode === 'light' ? "dark" : "light" )
                        this.setState({
                            themeMode: this.state.themeMode === 'light' ? "dark" : "light"
                        })
                    } 
                }}
            >
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}