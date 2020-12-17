import React from 'react' 
import uuid from 'react-uuid' 

import ContainerStyle from './containerStyle'
 
import HeadingCreator from '../library/heading/ElementCreator'
import ParagraphCreator from '../library/paragraph/ElementCreator'
import ParagraphImageCreator from '../library/paragraphImage/ElementCreator'
  
import { MenuItem, FormGroup, Button, Box, Menu, Container, Drawer, Tooltip} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';

// import libraryContainer from '../library/container/containerLayout.json'
import libraryHeading from '../library/heading/headingLayout.json'
import libraryParagraph from '../library/paragraph/paragraphLayout.json'
import libraryParagraphImage from '../library/paragraphImage/paragraphImageLayout.json'

import ModeContext from '../../modeContext/ModeContext'

import { makeStyles } from '@material-ui/core/styles';

function ContainerElement(props) { 

    console.log('cccccccccccccccccccccccccccccccccccc')
 
    const {modeDev} = React.useContext(ModeContext)
 
    const [children, setChildren] = React.useState(props.data.children) 
    const [containerStyle, setContainerStyle] = React.useState(props.data.classes)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false)
    
    const btnDrawerStyle = {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 10, 
        background: '#0020a2bd',  
        borderTopLeftRadius: 0, 
        borderTopRightRadius: 0,
        minWidth: 50
    }
    
  
    const useStyles = makeStyles((theme) => ({
        containerClass: containerStyle
    }))
    const classes = useStyles();
    
    const toggleDrawer =  () => {  
        setOpen(!open)
    }; 

    const handleHeadingMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleHeadingMenuClose = (variant, type) => {
        setAnchorEl(null); 
        addHeading(variant, type)
    }; 
  
    const addHeading = async (variant, type) => { 
          
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
  
        setChildren(newChildren) 
 
        // save in firestore
        props.reSaveContainer(props.data.id, newChildren)
 
    } 

    const reSaveClasses = (id, newStyle) => {
        setContainerStyle(newStyle)
        props.reSaveContainerStyle(id, newStyle)
    }
    const reSaveChildren = async (id, data) => {   
        let slicedChild = children.slice()
        slicedChild.forEach((item) => {
            if(item.id === id) {
                for( let key in item) { 
                    item[key] = data[key]
                } 
            }
        }) 
        
        // save in firestore
        props.reSaveContainer(props.data.id, slicedChild)
    }

    const removeItem = async (id) => {
        let conf = window.confirm("Delete ?");
 
        if(conf) {
            
            let filtered = children.filter((item) => (item.id !== id))  
            setChildren(filtered) 
            
            // save in firestore
            props.reSaveContainer(props.data.id, filtered) 
        }
    }

    return (
        <Box border={3}>
            <Container  
                maxWidth={props.data.maxWidth} 
                fixed={props.data.fixed} 
                disableGutters={props.data.disableGutters} 
                className={classes.containerClass}
            >      
                {/* блок добавления чилдренов */}
                {
                    modeDev &&
                    <div style={{position: 'relative'}} >
                        {/*  DrawerContainer */}
                            <Tooltip title='Container Settings' placement='bottom'>
                                <Button  
                                    onClick={toggleDrawer} 
                                    size='medium'
                                    style={btnDrawerStyle}
                                >  
                                    <SettingsIcon style={{ color: '#fff' }} fontSize='small'/>
                                </Button>
                            </Tooltip>
                            
                            <Drawer anchor={'left'} open={open} onClose={toggleDrawer}>
                               
                                    <Box  
                                        p={2}   
                                    > 
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
                                                    // onClick={addContainer}
                                                    variant='outlined'
                                                    color="primary" 
                                                    disabled={true}
                                                >
                                                    Add Container
                                                </Button>
                                            </Box>
                                        </FormGroup>

                                        <ContainerStyle id={props.data.id} reSaveClasses={reSaveClasses} classes={containerStyle} /> 

                                    </Box> 
                            </Drawer>
                        {/*  DrawerContainer */} 
                    </div>
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
            </Container>
        </Box>
    )
}

export default ContainerElement
