import React from 'react'

import { ColorPicker } from './ColorPicker'

import { FormControl, InputLabel, Select , MenuItem, Box, makeStyles } from '@material-ui/core'

function ColorSelecter({label, colorSelect, setColorSelect, colorCustom , setColorCustom, setIsDisableBtn, position, noInherit }) {
    

    const useStyles = makeStyles(theme => ({
        block: {
            position: 'absolute', 
            top: 'calc(50% - 12px)', 
            right: 7, 
            height: 24, 
            width: 24
        },
        primary: {
            backgroundColor: theme.palette.primary.main
        },
        secondary: {
            backgroundColor: theme.palette.secondary.main
        },
        warning: {
            backgroundColor: theme.palette.warning.main
        },
        error: {
            backgroundColor: theme.palette.error.main
        },
        info: {
            backgroundColor: theme.palette.info.main
        },
        success: {
            backgroundColor: theme.palette.success.main
        } 
    }))
    const { block, primary , secondary , warning , error , info, success } = useStyles()
    const colorCustomText = (colorCustom !== 'primary' && colorCustom !== 'secondary' &&  colorCustom !== 'warning' &&
                            colorCustom !== 'error' && colorCustom !== 'info' && colorCustom !== 'success' ) ? ` - ${colorCustom}` : " "
    return (
        <Box display="flex" alignItems='center'>
            <FormControl variant='filled' style={{minWidth: '250px' }}>
                <InputLabel id="color-select-label">{label}</InputLabel>
                <Select
                    labelId="color-select-label"
                    id="color-select"
                    value={colorSelect}
                    onChange={(e) => { setIsDisableBtn(false); setColorSelect(e.target.value) }} 
                >
                    <MenuItem style={{position: 'relative'}} value={'primary'}>
                        Primary
                        <Box className={`${block} ${primary}`} />
                    </MenuItem>
                    <MenuItem style={{position: 'relative'}} value={'secondary'}>
                        Secondary 
                        <Box className={`${block} ${secondary}`} />
                    </MenuItem>
                    <MenuItem style={{position: 'relative'}} value={'warning'}>
                        Warning
                        <Box className={`${block} ${warning}`} />
                    </MenuItem>
                    <MenuItem style={{position: 'relative'}} value={'error'}>
                        Error
                        <Box className={`${block} ${error}`} />
                    </MenuItem>
                    <MenuItem style={{position: 'relative'}} value={'info'}>
                        Info
                        <Box className={`${block} ${info}`} />
                    </MenuItem>
                    <MenuItem style={{position: 'relative'}} value={'success'}>
                        Success
                        <Box className={`${block} ${success}`} />
                    </MenuItem>
                    <MenuItem value={'custom'}>
                        Custom  {colorCustomText}
                    </MenuItem>
                </Select>
            </FormControl>
            <Box ml={1} >
                {
                    colorSelect === 'custom' &&
                    <ColorPicker
                        initialColor = {colorCustom}
                        changeColor = {setColorCustom}
                        setIsDisableBtn = {setIsDisableBtn}
                        position = {position}
                        noInherit={noInherit}
                    />  
                }
                
            </Box>
        </Box>
    )
}

export default ColorSelecter
