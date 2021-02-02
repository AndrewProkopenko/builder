import React, {memo} from 'react'

const SelectPage = memo( (setValue) => {

    const handleChange = () => {
        setValue() // доделать 
    }

    return (
        <Box> 
            <FormControl 
                variant='filled' 
                size='small'    
                // style={{width: '100%'}}
                fullWidth
            >
                <InputLabel id={`url-pages`}>Choice page</InputLabel>
                <Select
                    labelId={`url-pages`}
                    id="url-select"
                    value={item.url}  
                    fullWidth
                    style={{maxWidth: '100%'}}
                    onChange={(e) => {setIsDisableBtn(false); handleChange(e.target.value) }}
                >   
                    {
                        renderLinkList()
                    }
                        
                </Select>
            </FormControl>
        </Box> 
    )
})

export default SelectPage
