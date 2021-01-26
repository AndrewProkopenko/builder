import React from 'react'

import {  
    FormControlLabel, 
    Switch,
    withStyles
} from "@material-ui/core"; 

import CategoryContext from '../../../context/headerContext/CategoryContext'
 
import darkThemeIcon from '../../../assets/icons/half-moon.svg'
import lightThemeIcon from '../../../assets/icons/sun.svg' 

function ThemeSwitcher() {

    const { setThemeMode, themeMode} = React.useContext(CategoryContext)    
  
    const checked = themeMode === 'dark' ? true : false
    
    const handleChange = () => {
        let newMode = themeMode === 'dark' ? 'light' : 'dark' 
        setThemeMode(newMode)
    }

    const ThemeCustomSwitch = withStyles((theme) => ({
        root: {
          width: 60,
          height: 28,
          padding: 0, 
          marginRight: 5
        },
        switchBase: {
          padding: 1,  
          '&$checked': {
            transform: 'translateX(32px)',
            color: '#27536b',
            '& + $track': {
              backgroundColor: '#27536b',
              opacity: 1,
              border: 'none',
            },
            '&  $thumb': { 
              opacity: 1,
              border: 'none',
              backgroundImage: `url(${darkThemeIcon})`
            },
          },
          '&$focusVisible $thumb': {
            color: '#52d869', 
          },
        },
        thumb: {
          width: 26,
          height: 26,
          backgroundImage: `url(${lightThemeIcon})`,
          backgroundSize: '28px',
          backgroundPosition: 'center',  
        },
        track: {
          borderRadius: 28 / 2,
          border: `1px solid #a3d4ff`,
          backgroundColor: '#a3d4ff',
          opacity: 1,
          transition: theme.transitions.create(['background-color', 'border']),
        },
        checked: {},
        focusVisible: {},
      }))(({ classes, ...props }) => {
        return (
          <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
              root: classes.root,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
            }}
            {...props}
          />
        );
      });
    return ( 
        <FormControlLabel
            control={<ThemeCustomSwitch checked={checked} onChange={handleChange} name="checkedB" />}
            label={checked ? 'Night Mode' : 'Light Mode'}
        /> 
    ) 
}

export default ThemeSwitcher
