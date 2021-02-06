import React, {useContext, useState, useEffect, memo} from 'react'

import {   
    Box,   
    FormControl, 
    InputLabel, 
    Select,  
    MenuItem
} from '@material-ui/core'

import CategoryContext from '../../context/headerContext/CategoryContext'

const SelectPage = memo( ({value, setValue, index}) => {
   
    console.log(value)
    const { categories } = useContext(CategoryContext)

    const [pages, SetPages] = useState([]) 
    const [selectValue, setSelectValue] = useState(value)

    useEffect( () => {
        createPages() 
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if(selectValue !== value && value !== null) {
            setSelectValue(value) 
        }
        // eslint-disable-next-line
    }, [value])

    const createPages = () => {
        let pagesArray = []
        categories.forEach( item => { 
            pagesArray.push(item)
            if(item.pages.length > 0) {
                item.pages.forEach( innerItem => {
                    let page = JSON.parse(JSON.stringify(innerItem))
                    page.categorySlug = item.slug
                    pagesArray.push(page)
                })
            }
        })
        SetPages(pagesArray) 
    }
    
    const handleChange = (id) => { 
        const activePage = {
            id: id
        }
        pages.forEach( page => {
            if(page.id === id) {
                activePage.title = page.title
                activePage.slug = (page.type === 'page') ? (`/${page.categorySlug}/${page.slug}`) : (`/${page.slug}`)
            }
        })
        setSelectValue(id) 
        if(index !== undefined) { 
            setValue(activePage, index)
        }
        else {
            setValue(activePage)
        }
    }

    const renderLinkList = () => { 
        return pages.map( link => {
            switch(link.type) {
                case('category') : {
                    return <MenuItem key={link.id} value={link.id} >{link.title } - { link.slug}</MenuItem> 
                }
                case('page'): {
                    return <MenuItem key={link.id} value={link.id} >{link.title } - {`${link.categorySlug}/${link.slug}`}</MenuItem>
                }
                default: break;
            } 
            return false
        }) 
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
                {
                    pages.length > 0 && 
                    <Select
                        labelId={`url-pages`}
                        id="url-select"
                        value={selectValue}  
                        fullWidth
                        style={{maxWidth: '100%'}}
                        onChange={(e) => { handleChange(e.target.value) }}
                    >   
                        {
                            renderLinkList()
                        }
                        {
                            value === 'none' &&
                            <MenuItem value={'none'} style={{display: 'none'}} >None</MenuItem>
                        }
                            
                    </Select>
                }
            </FormControl>
        </Box> 
    )
})

export default SelectPage
