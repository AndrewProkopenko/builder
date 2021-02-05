 
export const getColorByPalette = (theme, color) => {
    switch(color) {
        case ('primary') : {
            return theme.palette.primary.main 
        } 
        case ('secondary') : {
            return theme.palette.secondary.main
        } 
        case ('warning') : {
            return theme.palette.warning.main
        } 
        case ('error') : {
            return theme.palette.error.main 
        } 
        case ('info') : {
            return theme.palette.info.main
        } 
        case ('success') : {
            return theme.palette.success.main
        } 
        case ('default') : {
            return theme.palette.background.default
        } 
        case ('paper') : {
            return theme.palette.background.paper
        } 
        case ('contrast') : {
            return 'contrast'
        } 
        default: return color
    } 
}
export const getColorByPaletteForGradient = (theme, color) => {
    switch(color) {
        case ('primary') : {
            return [theme.palette.primary.main, theme.palette.primary.dark] 
        } 
        case ('secondary') : {
            return [theme.palette.secondary.main, theme.palette.secondary.dark] 
        } 
        case ('warning') : {
            return [theme.palette.warning.main, theme.palette.warning.dark] 
        } 
        case ('error') : {
            return [theme.palette.error.main, theme.palette.error.dark] 
        } 
        case ('info') : {
            return [theme.palette.info.main, theme.palette.info.dark] 
        } 
        case ('success') : {
            return  [theme.palette.success.main, theme.palette.success.dark]
        } 
        case ('default') : {
            return [theme.palette.background.paper, theme.palette.background.default]
        } 
        case ('paper') : {
            return [theme.palette.background.default, theme.palette.background.paper]
        } 
        default: return [color, color]
    } 
}
export const getColorByPaletteReverse = (theme, color) => {
    switch(color) {
        case ('primary') : {
            return theme.palette.secondary.main
        } 
        case ('secondary') : {
            return theme.palette.primary.main
        } 
        case ('warning') : {
            return theme.palette.primary.main
        } 
        case ('error') : {
            return theme.palette.primary.main
        } 
        case ('info') : {
            return theme.palette.warning.main
        } 
        case ('success') : {
            return theme.palette.info.main
        } 
        case ('default') : {
            return theme.palette.background.paper
        } 
        case ('paper') : {
            return theme.palette.background.default
        }
        default: return color
    } 
}
export const isNoThemeColor = (color) => {
    if(
        color !== 'contrast' && 
        color !== 'default' && 
        color !== 'paper' && 
        color !== 'primary' && 
        color !== 'secondary' &&
        color !== 'warning' &&
        color !== 'error' &&
        color !== 'info' &&
        color !== 'success' 
    ) return true 
    else return false 
}
