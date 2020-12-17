import React from 'react'
import axios from '../../libs/axios'
import uuid from 'react-uuid'

import HeadingCreator from '../library/heading/ElementCreator'
import ParagraphCreator from '../library/paragraph/ElementCreator'
import ParagraphImageCreator from '../library/paragraphImage/ElementCreator'
  
import { MenuItem, Divider, FormGroup, Button, Box, Menu} from '@material-ui/core'

import libraryHeading from '../library/heading/headingLayout.json'
import libraryParagraph from '../library/paragraph/paragraphLayout.json'
import libraryParagraphImage from '../library/paragraphImage/paragraphImageLayout.json'

import ModeContext from '../../modeContext/ModeContext'

function Pages() { 

    const {modeDev} = React.useContext(ModeContext)

    const [title, setTitle] = React.useState('')
    const [children, setChildren] = React.useState([])

    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleHeadingMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleHeadingMenuClose = (variant, type) => {
        setAnchorEl(null);

        addHeading(variant, type)
    };

     
    React.useEffect(() => {
        axios
            .get('http://localhost:4545/pages')
            .then((response) => {
                setChildren(response.children)
                setTitle(response.title)
                // console.log(response.children)
            })
    }, [])

      
    function addHeading(variant, type) { 
         
        console.log(variant)
        let newChildren = children.slice()

        let newItem = {}

        switch(type) { 
            case 'heading' :  
                newItem = Object.assign({}, libraryHeading) 
                newItem.id = uuid()
                newItem.variant = newItem.variant[variant] 
                newItem.text += " - " + newItem.variant 
                break;
            case 'paragraph' :  
                console.log('paragraph')
                newItem = Object.assign({}, libraryParagraph)
                newItem.id = uuid() 
                break;
            case 'paragraphImage' :  
                console.log('paragraphImage')
                newItem = Object.assign({}, libraryParagraphImage)
                newItem.id = uuid() 
                break;
            default: break;
        }  

        newChildren.push(newItem) 

        console.log(newItem)

        setChildren(newChildren) 

        axios.put('http://localhost:4545/pages', {
            title: title,
            children: newChildren
        })
    } 
 
    function reSaveChildren(id, data) {   
        let slicedChild = children.slice()
        slicedChild.forEach((item) => {
            if(item.id === id) {
                for( let key in item) { 
                    item[key] = data[key]
                } 
            }
        }) 
          
        axios.put('http://localhost:4545/pages', {
            title: title,
            children: slicedChild
        })
    }

    function removeItem(id) {
        // let conf = window.confirm("Delete ?");
 
        // if(conf) {
            let filtered = children.filter((item) => (item.id !== id))  
            setChildren(filtered) 
            axios.put('http://localhost:4545/pages', {
                title: title,
                children: filtered
            })
        // }
    }

    return (
        <div>
            <h5>
                {title}
            </h5>

            {/* блок добавления чилдренов */}
            {
                modeDev &&
                <React.Fragment>
                    <FormGroup row> 
                        <Button 
                            aria-controls="heading-menu" 
                            aria-haspopup="true" 
                            onClick={handleHeadingMenuClick}
                            variant='outlined'
                            color="primary"
                        >
                            Add Heading
                        </Button>
                        <Menu
                            id="heading-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleHeadingMenuClose}
                        >
                            <MenuItem value={0} onClick={(e) => {handleHeadingMenuClose(e.target.value, "heading")}} >Heading h1</MenuItem>
                            <MenuItem value={1} onClick={(e) => {handleHeadingMenuClose(e.target.value, "heading")}} >Heading h2</MenuItem>
                            <MenuItem value={2} onClick={(e) => {handleHeadingMenuClose(e.target.value, "heading")}} >Heading h3</MenuItem>
                            <MenuItem value={3} onClick={(e) => {handleHeadingMenuClose(e.target.value, "heading")}} >Heading h4</MenuItem>
                            <MenuItem value={4} onClick={(e) => {handleHeadingMenuClose(e.target.value, "heading")}} >Heading h5</MenuItem>
                            <MenuItem value={5} onClick={(e) => {handleHeadingMenuClose(e.target.value, "heading")}} >Heading h6</MenuItem> 
                        </Menu>

                        <Box ml={2} clone={true} >
                            <Button
                                onClick={() => {addHeading('p', 'paragraph')}}
                                variant='outlined'
                                color="primary"
                            >
                                Add paragraph
                            </Button>
                        </Box>
                        <Box ml={2} clone={true} >
                            <Button
                                onClick={() => {addHeading('p', 'paragraphImage')}}
                                variant='outlined'
                                color="primary" 
                            >
                                Add paragraph with Image
                            </Button>
                        </Box>
                        <Box ml={2} clone={true} >
                            <Button
                                // onClick={() => {addHeading('p', 'paragraph')}}
                                variant='outlined'
                                color="primary"
                                disabled={true}
                            >
                                Add Container
                            </Button>
                        </Box>
                    </FormGroup>
                
                    <Divider style={{margin: "10px 0"}}/>
                </React.Fragment>

            }
            

            {
                children.map((item) => {  
                    switch(item.type) {
                        case 'heading' :  
                            return ( 
                                <HeadingCreator 
                                    key={item.id} 
                                    item={item}
                                    reSaveChildren={reSaveChildren}
                                    removeItem={removeItem}
                                />
                            ) 
                        case 'paragraph' :  
                            return (
                                <ParagraphCreator
                                    key={item.id} 
                                    item={item}
                                    reSaveChildren={reSaveChildren}
                                    removeItem={removeItem} 
                                    withImage={false}
                                />
                            ) 
                        case 'paragraphImage' :  
                            return (
                                <ParagraphImageCreator
                                    key={item.id} 
                                    item={item}
                                    reSaveChildren={reSaveChildren}
                                    removeItem={removeItem} 
                                />
                            ) 
                        default: break;
                    }  
                    return null
                })
            }
        </div>
    )
}

export default Pages
