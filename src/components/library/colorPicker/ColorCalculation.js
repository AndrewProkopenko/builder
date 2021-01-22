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
        default: return color
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
