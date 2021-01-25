 
import {darken} from '@material-ui/core/styles/colorManipulator'  

const StyledInputs = () => {  
    
    const styled = (theme) => ({
        settingsItem: {
            marginRight: 5, 
            marginBottom: 10, 
            flexGrow: 1
        },
        inputNumber: {
            flexGrow: 1, 
            padding: 4, 
            width: "100%",  
            backgroundColor: darken(theme.palette.background.paper , 0.1)
        }, 
        inputGroup: {
            border: `1px solid ${theme.palette.divider}`,  
            marginBottom: 2
        },
        dumbItemContainer: { 
            position: 'relative', 
            outline: '1px solid #f000',
            transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn} outline`, 
        },
        dumbItem: { 
            position: 'relative',
            transition: "300ms cubic-bezier(0.4, 0, 1, 1)", 
        }, 
        dumbItemDelete : { 
            opacity: 0,
            position: 'absolute', 
            zIndex: 15, 
            top: 3, 
            right: 5, 
            display: 'flex', 
            alignItems: 'center'
        },
        mtView: {  
            position: 'absolute',  
            left: 0, 
            right: 0,
            zIndex: 10, 
            backgroundColor: '#fff7003d', 
            opacity: 0,
            transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeIn} opacity`
        },
        mbView: {  
            position: 'absolute',  
            left: 0, 
            right: 0,
            zIndex: 10, 
            backgroundColor: '#fff7003d', 
            opacity: 0,
            transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeIn} opacity`
        }, 
        ptView: {  
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0,
            zIndex: 10, 
            backgroundColor: '#400e575e', 
            opacity: 0,
            transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeIn} opacity`
        },
        pbView: {  
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0,
            zIndex: 10, 
            backgroundColor: '#400e575e', 
            opacity: 0,
            transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeIn} opacity`
        },
    })
 
    return styled 
}

export default StyledInputs 
