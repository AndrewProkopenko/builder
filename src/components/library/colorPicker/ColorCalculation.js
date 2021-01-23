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
            return theme.palette.error.main
        } 
        case ('success') : {
            return theme.palette.info.main
        } 
        default: return color
    } 
}
