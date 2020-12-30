import React from 'react';
 
import ThemeContext from './ThemeContext'

 

export default class ThemeProvider extends React.Component { 

    state = { 
        themeMode: 'light'
    } 

    componentDidMount() {
        const storageMode =  localStorage.getItem('siteBuilderThemeMode')
        console.log(storageMode)
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