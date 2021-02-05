import React, {useState, useContext} from 'react'

import InputMask from "react-input-mask";

import SendFormContext from '../../context/sendFormContext/SendFormContext'

const InputMaskPhone = ({value, setValue, className, placeholder}) => {

    const [valueLocal, setValueLocal] = useState(value) 

    const { validationSettings } = useContext(SendFormContext)  
    const mask = validationSettings.mask
 
    React.useEffect(() => {
        if(valueLocal !== value) {
            setValueLocal(value) 
        }
        // eslint-disable-next-line
    }, [value])

    const handleSave = () => { 
        setValue(valueLocal) 
    }

    return ( 
        <InputMask 
            mask={mask}
            maskPlaceholder={'_'}
            alwaysShowMask={false}
            className={className}
            placeholder={placeholder} 
            value={valueLocal}
            onChange={(e) => { setValueLocal(e.target.value) }}
            onBlur={handleSave} 
        /> 
    )
}

export default InputMaskPhone
