 
// import { makeStyles } from '@material-ui/core/styles';

// import { useTheme } from '@material-ui/core/styles';


function Styles(theme) { 

    // console.log(theme)

    
    const someClass = (theme) => ({
        someClass: {
            backgroundColor: theme.palette.background.paper, 
            position: 'relative', 
            zIndex: 10, 
        }
    })

    // const someClass = { 
    //     backgroundColor: '#fff', 
    //     position: 'relative', 
    //     zIndex: 10, 
    // }

    return someClass 
}

export { Styles }  
