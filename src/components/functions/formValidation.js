 
export const NameValidation = (field) => { 
    const answer = {
        isValid: false
    }
    if(field !== undefined ) {
        answer.isValid = field.length > 0 ? true : false 
    }
    return answer 
}
export const PhoneValidation = (field) => { 
    const answer = {
        isValid: false
    }
    if(field !== undefined ) {
        answer.isValid = !field.includes('_') && field.length > 0 
    } 
    return answer 
}
 
