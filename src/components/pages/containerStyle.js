import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, TextField , MenuItem, FormControl, InputLabel, Select} from '@material-ui/core';

const ContainerStyle = (props) => {

    console.log(props.classes)
    
    const [padding, setPadding] = React.useState({ 
        top:  props.classes.paddingTop ,  
        bottom: props.classes.paddingBottom ,  
    })
    const [margin, setMargin] = React.useState({
        top:  props.classes.marginTop ,  
        bottom: props.classes.marginBottom ,  
    })
    
    const [color, setColor] = React.useState(props.classes.color || 'inherit')
    const [backgroundColor, setBackgroundColor] = React.useState(props.classes.backgroundColor ||  'transparent')

    const [borderColor, setBorderColor] = React.useState(props.classes.borderColor ||  'transperent')
    const [borderStyle, setBorderStyle] = React.useState(props.classes.borderStyle ||  'solid')
    const [borderWidth, setBorderWidth] = React.useState(props.classes.borderWidth ||  '0px')
    const [borderRadius, setBorderRadius] = React.useState(props.classes.borderRadius ||  '0px')

    
    const [isDisableBtn, setIsDisableBtn] = React.useState(true) 
 
    const useStyles = makeStyles( (theme) => ({
        inputNumber: {
            flexGrow: 1, 
            margin: 5, 
            width: "100%"
        }, 
        inputGroup: {
            border: "1px solid #f5f5f5", 
            padding: 3, 
            inputNumber: { 
                maxWidth: "100%"

            }
        },
        btnSave: { 
            display: 'block',
            marginTop: 10, 
            marginBottom: 10,
            paddingLeft: 40, 
            paddingRight: 40
        }
    }))

    const classes = useStyles();

    const myClassName = {  
        paddingTop: padding.top,
        paddingBottom: padding.bottom, 
        marginTop: margin.top,
        marginBottom: margin.bottom,
        marginLeft: margin.left,
        marginRight: margin.right,
        color: color,
        backgroundColor: backgroundColor, 
        borderColor: borderColor,
        borderStyle: borderStyle,
        borderRadius: borderRadius,
        borderWidth: borderWidth
    } 

    const handlePadding = (e, direction) => {  
        let newPadding = Object.assign({}, padding)
        newPadding[direction] = Number(e.target.value)
        setPadding(newPadding)  

        setIsDisableBtn(false);
    }
    const handleMargin = (e, direction) => {  
        let newMargin = Object.assign({}, margin)
        newMargin[direction] = Number(e.target.value)
        setMargin(newMargin)  

        setIsDisableBtn(false);
    }

    const saveData = () => {   
        const sentData = Object.assign({}, props.classes)

        sentData.classes = myClassName
          
        props.reSaveClasses(props.id, sentData)
        setIsDisableBtn(true); 
    }

    return (
        <div>
             {/* margin */}
             <Box className={classes.inputGroup}>
                <Box display="flex" flexDirection="row"  > 
                    <TextField 
                        className={classes.inputNumber}
                        type='number'
                        label="Margin Top" 
                        variant="filled" 
                        size='small'  
                        value={props.classes.marginTop}
                        onChange={ (e) => { handleMargin(e, 'top'); saveData() } }     
                    />
                    <TextField 
                        className={classes.inputNumber}
                        type='number'
                        label="Margin Bottom" 
                        variant="filled" 
                        size='small'  
                        value={props.classes.marginBottom}
                        onChange={ (e) => { handleMargin(e, 'bottom') } }     
                    />
                </Box>
            </Box>
            
            {/* padding */}
            <Box className={classes.inputGroup}>
                <Box display="flex" flexDirection="row" > 
                    <TextField 
                        className={classes.inputNumber}
                        type='number'
                        label="Padding Top" 
                        variant="filled" 
                        size='small'  
                        value={padding.top}
                        onChange={ (e) => { handlePadding(e, 'top') } }     
                    />
                    <TextField 
                        className={classes.inputNumber}
                        type='number'
                        label="Padding Bottom" 
                        variant="filled" 
                        size='small'  
                        value={padding.bottom}
                        onChange={ (e) => { handlePadding(e, 'bottom') } }     
                    />
                </Box>
                 

            </Box>
            
            {/* bg-color */}
            <Box className={classes.inputGroup} display="flex" flexDirection="row" > 
        
                <TextField 
                    className={classes.inputNumber}
                    type='color'
                    label="Color" 
                    variant="filled" 
                    size='small'  
                    value={color}
                    onChange={ (e) => { setIsDisableBtn(false);  setColor(e.target.value)} }     
                />
                <TextField 
                    className={classes.inputNumber}
                    type='color'
                    label="Background Color" 
                    variant="filled" 
                    size='small'  
                    value={backgroundColor}
                    onChange={ (e) => { setIsDisableBtn(false);setBackgroundColor(e.target.value)} }     
                />
            </Box>
            
            {/* border */}
            <Box className={classes.inputGroup}> 
                <Box display="flex" flexDirection="row" > 
                    <TextField 
                            className={classes.inputNumber}
                            type='color'
                            label="Border Color" 
                            variant="filled" 
                            size='small'  
                            value={borderColor}
                            onChange={ (e) => { setIsDisableBtn(false);  setBorderColor(e.target.value)} }     
                    />
                    <TextField 
                            className={classes.inputNumber}
                            type='number'
                            label="Border Radius" 
                            variant="filled" 
                            size='small'  
                            value={borderRadius}
                            onChange={ (e) => { setIsDisableBtn(false);  setBorderRadius(Number(e.target.value)) } }     
                    />

                </Box>
                <Box display="flex" flexDirection="row" > 

                <TextField 
                    className={classes.inputNumber}
                    type='number'
                    label="Border Width" 
                    variant="filled" 
                    size='small'  
                    value={borderWidth}
                    onChange={ (e) => { setIsDisableBtn(false);setBorderWidth(Number(e.target.value))} }     
                />
                <FormControl 
                    variant='filled' 
                    size='small'   
                    className={classes.inputNumber}
                >
                    <InputLabel id="border-style-label">Border Style</InputLabel>
                    <Select
                        labelId="border-style-label"
                        id="border-style"
                        value={borderStyle}
                        onChange={(e) => {setIsDisableBtn(false); setBorderStyle(e.target.value) }}
                    >
                        <MenuItem value={'solid'}>Solid</MenuItem>
                        <MenuItem value={'dotted'}>Dotted</MenuItem>
                        <MenuItem value={'dashed'}>Dashed</MenuItem>
                        <MenuItem value={'double'}>Double</MenuItem>
                        <MenuItem value={'groove'}>Groove</MenuItem>
                        <MenuItem value={'inset'}>Inset</MenuItem>
                        <MenuItem value={'outset'}>Outset</MenuItem>
                        <MenuItem value={'ridge'}>Ridge</MenuItem>
                        <MenuItem value={'none'}>None</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            </Box>

            <Button
                disabled={isDisableBtn}
                className={classes.btnSave}
                variant="contained"
                color="primary"
                size={'medium'} 
                onClick={saveData}
            >
                Save
            </Button> 
        </div>
    )
}

export default ContainerStyle
