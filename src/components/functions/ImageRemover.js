import React, { useEffect, useContext, memo } from 'react'

import ImageContext from '../../context/imageContext/ImageContext' 

const ImageRemover = memo(({ idArrayForDelete, clearArrayForDelete }) => {

    const { removeImagesFromArray } = useContext(ImageContext)

    useEffect( () => { 
        if(idArrayForDelete !== []) removeImages()
        
        console.log('effect') 
        
    }, [idArrayForDelete])

    const removeImages = () => { 
        removeImagesFromArray(idArrayForDelete) 
    }

    return null
})

export default ImageRemover
 
