import React from 'react'

import ImageContext from '../../../context/imageContext/ImageContext' 

function ImageManager() {
    
    const { imageList, nameList, updateImageNameList } = React.useContext(ImageContext)     

    console.log(imageList, nameList)
    return (
        <div>
            <ul>
                {
                    imageList.map( (item, index) => {
                        return <li key={index}> { item } </li>
                    }) 
                }
            </ul>
            <ul>
                {
                    nameList.map( (item, index) => {
                        return <li key={index}> { item } </li>
                    }) 
                }
            </ul>
        </div>
    )
}

export default ImageManager
