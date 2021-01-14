 
 
import { deepOrange } from '@material-ui/core/colors'

const StylesChangers = () => {  
    
    const changers = (theme) => ({
        menu: {    
            position: "absolute",  
            top: 50, 
            backgroundColor: theme.palette.background.paper, 
            padding: 10 , 
            paddingBottom: 0,  
            width: '100%',
            maxHeight: 'calc(100vh - 100px)', 
            minHeight: 500,
            overflowY: 'scroll',  
        },
        menuTitle: {
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            fontSize: 14, 
            borderBottom: `1px solid ${theme.palette.divider}`,
            paddingBottom: 6,
            marginBottom: 10, 
            cursor: 'move'
        },
        btnSetting: { 
            backgroundColor: deepOrange[800], 
            minWidth: 80,  
            maxHeight: 50, 
            transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms `, 
            '&:hover': {
                backgroundColor: deepOrange[700], 
            }, 
            '&>span': {
                display: 'flex', 
                flexDirection: 'column', 
                fontSize: 10
            }
        },
        btnSave: {
            position: 'sticky', 
            zIndex: 15,
            bottom: 0, 
            left: 0, 
            right: 0,
            height: 70, 
            paddingTop: 20,  
            paddingBottom: 70, 

            backgroundColor: theme.palette.background.paper, 
            '&>button': { 
                opacity: 1,  
                paddingLeft: 40, 
                paddingRight: 40
            }
        },

        btnDrawerStyle: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1030,
            minWidth: 50,
            opacity: 0,
            transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn} opacity`
        },
        btnDrawerItem: {
            backgroundColor: theme.palette.error.dark,
            '&:hover': {
                backgroundColor: theme.palette.secondary.dark
            }
        },
        containerWrapper: {
            position: 'relative',
            outline: "1px solid #ffffff00",
            transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn} outline`,
            '&:hover': {
                outlineColor: `${theme.palette.error.main}`,
                 
                '& $btnDrawerStyle': {
                    opacity: 1
                }
            }
        },
    })
 
    return changers 
}

export default StylesChangers 
