 
 
import { deepOrange } from '@material-ui/core/colors'

const StylesChangers = () => {  
    
    const changers = (theme) => ({
        menu: {    
            position: "absolute",  
            top: 50, 
            backgroundColor: theme.palette.background.paper, 
            paddingLeft: 10 , 
            paddingRight: 10 , 
            // paddingBottom: 50,   
            width: '100%',
            maxHeight: 'calc(100vh - 100px)', 
            minHeight: 500,
            overflowY: 'scroll',  
        },
        menuTitle: {
            position: 'sticky', 
            zIndex: 100, 
            top: 0,  

            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            fontSize: 14, 
            fontWeight: 700, 
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.default, 
            padding: 10,
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
        btnWithLabel: {
            padding: 0, 
            '& label': {
                padding: theme.spacing(1, 2), 
                cursor: 'pointer'
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
            outlineOffset: 0, 
            transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn} outline`,
            '&:hover': {
                // outlineColor: `${theme.palette.error.main}`,
                // zIndex: 100, 
                 
                // '& $mtView' : { 
                //     opacity: 1
                // },
                // '& $mbView' : { 
                //     opacity: 1
                // },
                // '& $btnDrawerStyle' : { 
                //     opacity: 1
                // }
            }
        },
        responseValues: {
            display: 'flex', 
            alignItems: 'center', 
            padding: theme.spacing(1, 2),
            margin: theme.spacing(1, 0), 
            '& p': {
                margin: 0
            },
            '& svg': {
                marginRight: 8, 
            }
        }, 
        responseTablets: { 
            border: `1px solid ${theme.palette.success.dark}`, 
            '& svg': {
                fill: theme.palette.success.dark 
            }
        },
        responseMobile: { 
            border: `1px solid ${theme.palette.success.light}`, 
            '& svg': {
                fill: theme.palette.success.light 
            }
        },
        mobileTooltip: {
            fontSize: 13, 
            backgroundColor: theme.palette.success.light
        },
        tabletTooltip: {
            fontSize: 13, 
            backgroundColor: theme.palette.success.dark
        }, 
        dialogContentUnstyle: {
            outline: 0, 
            padding: 0
        }
    })
 
    return changers 
}

export default StylesChangers 
