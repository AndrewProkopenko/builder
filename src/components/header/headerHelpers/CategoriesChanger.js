import React from 'react'
import uuid from 'react-uuid'

import CategoryContext from '../../../context/headerContext/CategoryContext'
import LibraryContext from '../../../context/libraryContext/LibraryContext' 

import StylesChangers from '../../../styles/changers'  

import AddCategory from './category/AddCategory'
import AddPage from './category/AddPage'
import ChangeCategory from './category/ChangeCategory'
import ChangePage from './category/ChangePage'

import { 
    Tooltip,
    Button, 
    Modal, 
    DialogContent , 
    Typography,  
    Accordion, 
    AccordionSummary, 
    Box,
    makeStyles,  
    ButtonGroup, 
    Grid,
    fade,  
} from '@material-ui/core' 
 
import SaveIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
 

import Draggable from 'react-draggable';  

function CategoriesChanger() { 

    console.log('CategoriesChanger')
     
    const {categories, setCategories, deletePageFromFirebase, deleteCategoryFromFirebase} = React.useContext(CategoryContext)    
    const {layouts} = React.useContext(LibraryContext)
    const pageLayout = layouts.page
    const categoryLayout = layouts.category
 
    const [localCategories, setLocalCategories] = React.useState(categories)
    const [open, setOpen] = React.useState(false)
    const [isDisableBtn, setIsDisableBtn] = React.useState(true)

    
 
    const handleInputFocus = () => {  
      setOpen(true);
    }
    const handleClose = () => {
      setOpen(false);
    }; 


    const useStyles = makeStyles((theme) => { 
        const classesRef = StylesChangers()
        const commonClasses = classesRef(theme)

        const { menu, menuTitle, btnSetting, btnSave } = commonClasses
       
        return( { 
            menu: {...menu, ...{
                left: "calc(50% - 400px)",
                maxWidth: 800,   
            }}, 
            menuTitle: menuTitle,
            btnSetting: btnSetting, 
            btnSave: btnSave,

            listPages : {
                marginTop: 20, 
                paddingLeft: 25, 
                '&>li' : { 
                    listStyle: 'none',
                    marginBottom: 5
                }
            },
            titlePages: {
                fontSize: 14, 
                fontWeight: 600, 
                borderBottom: `1px solid ${theme.palette.divider}`,
                marginBottom: 12
            }, 
            accordionContainer: {
                position: 'relative', 
                '&:hover $deleteBtn': {
                    opacity: 1
                },
                '&:hover $movingBtn': {
                    opacity: 1
                }, 
            },
            accordionHeader: {
                paddingRight: 30, 
                paddingLeft: 25,     
            },
            deleteBtn: {
                position: 'absolute', 
                zIndex: 10,
                top: 5, 
                right: 5, 
                backgroundColor: '#e83b3b', 
                paddingLeft: 0,
                paddingRight: 0,
                minWidth: 25,
                opacity: 0, 
                transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut} opacity`,
                '&:hover ': { 
                    backgroundColor: '#c40b0b' 
                }
            },
            movingBtn: {
                position: 'absolute', 
                zIndex: 10,
                top: 0, 
                left: -5,
                opacity: 0,
                transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut} opacity`,
                '&>button' : {
                    paddingLeft: 3,
                    paddingRight: 3,
                    minWidth: 22
                }
            },
            deletePageBtn: {  
                backgroundColor: '#e83b3b', 
                paddingLeft: 0,
                paddingRight: 0,
                minWidth: 25, 
                transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut} opacity`,
                '&:hover ': { 
                    backgroundColor: '#c40b0b' 
                }
            },
            movingPageBtn: { 
                transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut} opacity`,
                '&>button' : {
                    paddingLeft: 3,
                    paddingRight: 3,
                    minWidth: 22
                }
            }, 
            pageBox: {
                display: 'flex',  
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: theme.spacing(2), 
            }, 
            pageBoxLi: {
                padding: 5, 
                border: `1px solid ${fade(theme.palette.success.light, 0.3)}`

            }
        
        } )
    })
    
    const classes = useStyles();

    const addCategory = (newTitle, newSlug) => {
        let newList = categories.slice() 
        let newCategory = JSON.parse(JSON.stringify(categoryLayout)); 

        newCategory.id = uuid()
        newCategory.title = newTitle
        newCategory.slug = newSlug
        newList.push(newCategory)
 
        setCategories(newList) 
    }
    const addPage = (newTitle, newSlug, id) => {  
        
        let newCategories = categories.slice()
        
        let newPage = JSON.parse(JSON.stringify(pageLayout));  
        newPage.id = uuid()
        newPage.title = newTitle
        newPage.slug = newSlug

        newCategories.map( (item) => { 
            if(item.id === id) {  
                item.pages.push(newPage)
            }
            return 0 
        })

        setCategories(newCategories)  
    } 
     
    const handleUpdateCategory = (value, id) => {  
        let newCategories = localCategories.slice() 
        newCategories.map( (item) => { 
            if(item.id === id ) { 
                item.title = value
            }
            return 0
        })  
        setLocalCategories(newCategories)
        setIsDisableBtn(false)
    } 
    const handleUpdatePage = ( value, categoryId, pageId) => { 
        let newCategories = localCategories.slice() 
        newCategories.map( (item) => { 
            if(item.id === categoryId ) { 
                
                item.pages.map( page => {
                    if(page.id === pageId) {
                        page.title = value
                    }
                    return 0 
                })
            }
            return 0
        })  
        setLocalCategories(newCategories)
        setIsDisableBtn(false)
    } 
    const handleSave = () => { 
        setCategories(localCategories) 
        setIsDisableBtn(true)
        handleClose()
    }  
    const swapCategory = (direction, id) => {
        let newCategories = categories.slice() 
        let activeIndex   
     
        newCategories.map( (item) => { 
          if(item.id === id) {
            activeIndex = newCategories.indexOf(item) 
          }
          return 0 
        }) 
 
     
        if(direction === 'up' && activeIndex === 0) return  
        if(direction === 'down' && activeIndex === newCategories.length - 1 ) return
        
        if(direction === 'up') { 
          const movedItem = newCategories[activeIndex]
          const placeItem = newCategories[activeIndex - 1]
    
          newCategories[activeIndex] = placeItem
          newCategories[activeIndex - 1 ] = movedItem  
        }
        if(direction === 'down') {
          const movedItem = newCategories[activeIndex]
          const placeItem = newCategories[activeIndex + 1]
    
          newCategories[activeIndex] = placeItem
          newCategories[activeIndex + 1 ] = movedItem  
        }

        setCategories(newCategories) 
    } 
    const swapPage = (direction, categoryId, pageId) => {
        let newCategories = categories.slice() 
        let activeCategory = []
        let activeIndex   
     
        newCategories.map( (item) => { 
          if(item.id === categoryId) { 
                activeCategory = item 
                item.pages.map( page => {
                    if(page.id === pageId) { 
                        activeIndex = item.pages.indexOf(page) 
                    }
                    return 0 
                }) 
          }
          return 0 
        }) 
  
        if(direction === 'up' && activeIndex === 0) return  
        if(direction === 'down' && activeIndex === activeCategory.pages.length - 1 ) return
          
        if(direction === 'up') { 
          const movedItem = activeCategory.pages[activeIndex]
          const placeItem = activeCategory.pages[activeIndex - 1]
    
          activeCategory.pages[activeIndex] = placeItem
          activeCategory.pages[activeIndex - 1 ] = movedItem  
        }
        if(direction === 'down') {
          const movedItem = activeCategory.pages[activeIndex]
          const placeItem = activeCategory.pages[activeIndex + 1]
    
          activeCategory.pages[activeIndex] = placeItem
          activeCategory.pages[activeIndex + 1 ] = movedItem  
        }


        newCategories.map( (item) => { 
            if(item.id === categoryId) { 
                item = activeCategory  
            }
            return 0 
        })  

        setCategories(newCategories)
    }
    const deleteCategory = (id) => { 
        const conf = window.confirm('Delete category?')
        if(conf) {
            let filtered = categories.filter((item) => (item.id !== id))  
            const deleted = categories.filter( (item) => (item.id === id))
            let arrayOfPagesForDelete = [] 

            arrayOfPagesForDelete.push(deleted[0].slug)
            if(deleted[0].pages.length > 0) {
                deleted[0].pages.map((item) => {
                    arrayOfPagesForDelete.push(item.slug)
                    return 0
                })
            }

            setCategories(filtered)  
            deleteCategoryFromFirebase(arrayOfPagesForDelete)
        }  
    } 
    const deletePage = ( categoryId, pageId, slug) => {
        const conf = window.confirm('Delete page?')
            if(conf) {
            categories.map( category => {
                if(category.id === categoryId) {  
                    let filtered = category.pages.filter((item) => (item.id !== pageId))  
                    category.pages = filtered
                }
                return 0 
            }) 
            setCategories(categories)  

            deletePageFromFirebase(slug)
        }
    }

    return (
        <div className={classes.dumbWrapper}>
            <Tooltip title='Categories Settings' placement='bottom'>
                <Button  
                    onClick={handleInputFocus} 
                    size='medium'
                    variant='contained'
                    color='primary' 
                    className={classes.btnSetting}
                >   
                    <span>Categories</span>
                    <SettingsIcon style={{ color: '#fff' }} fontSize='small'/>
                </Button>
            </Tooltip>

            <Modal 
                open={open}  
                aria-labelledby="draggable-dialog-title"
                onClose={handleClose} 
            > 
                <DialogContent> 
                    <Draggable  handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
                        <div className={classes.menu}>
                            <Typography 
                                component='p' 
                                className={classes.menuTitle}
                                id="draggable-dialog-title"
                            >
                                Category list changer <OpenWithIcon/>
                            </Typography>
                            <Grid container direction="row" spacing={1}>
                                <Grid item xs={4} >
                                    <AddCategory addCategory={addCategory} />
                                </Grid>
                                <Grid item xs={8} >
                                    {
                                        categories.map( (item, index) => {  
                                            return (
                                                <Box  key={index} className={classes.accordionContainer} >
                                                    {
                                                        item.slug === '/' ?
                                                        <Tooltip title="You can't remove Home Category" placement='top'>
                                                            <Button
                                                                variant='contained'
                                                                color="default"
                                                                disableElevation={true}
                                                                className={classes.deleteBtn}  
                                                            > 
                                                                <InfoOutlined style={{ color: '#fff' }} fontSize='small'/>
                                                            </Button> 
                                                        </Tooltip>
                                                        :
                                                        <Tooltip title='Delete Category' placement='top'>
                                                            <Button
                                                                variant='contained'
                                                                color="default"
                                                                disableElevation={true}
                                                                className={classes.deleteBtn}
                                                                onClick={() => { deleteCategory(item.id) }}
                                                            > 
                                                                <DeleteOutlineIcon style={{ color: '#fff' }} fontSize='small'/>
                                                            </Button>
                                                        </Tooltip>
                                                    }

                                                    <ButtonGroup
                                                        orientation="vertical"
                                                        color="primary"
                                                        aria-label="vertical contained primary button group"
                                                        variant="contained"
                                                        className={classes.movingBtn}
                                                    >  
                                                        { 
                                                            categories.indexOf(item) !== 0 ?
                                                            <Tooltip title='Get Up' placement='right'>
                                                                <Button   
                                                                    onClick={() => { swapCategory('up', item.id) }}
                                                                    size='small'
                                                                    variant='contained'
                                                                    color='primary' 
                                                                    disabled={categories.indexOf(item) === 0 ? true : false }
                                                                >  
                                                                    <ExpandLessOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>   
                                                                </Button>
                                                            </Tooltip>
                                                            :
                                                            <Button    
                                                                size='small'
                                                                variant='contained'
                                                                color='primary' 
                                                                disabled={true}
                                                            >     
                                                                <ExpandLessOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>
                                                            </Button>
                                                        }
                                                        {
                                                            categories.indexOf(item) !== categories.length - 1 ?  
                                                            <Tooltip title='Get Down' placement='right'>
                                                                <Button   
                                                                    onClick={() => { swapCategory('down', item.id) }}
                                                                    size='small'
                                                                    variant='contained'
                                                                    color='primary' 
                                                                    disabled={categories.indexOf(item) === categories.length - 1 ? true : false }
                                                                >     
                                                                    <ExpandMoreOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>
                                                                </Button>
                                                            </Tooltip> 
                                                            : 
                                                            <Button    
                                                                size='small'
                                                                variant='contained'
                                                                color='primary' 
                                                                disabled={true}
                                                            >     
                                                                <ExpandMoreOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>
                                                            </Button>
                                                        }
                                                         
                                                    </ButtonGroup>
                                                    
                                                    <Accordion>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="image-settings-content"
                                                            id="panel1a-header" 
                                                            className={classes.accordionHeader} 
                                                        >
                                                            <Typography variant='h6'> Category: {item.title} </Typography> 

                                                            
                                                        </AccordionSummary>
                                                        <Box p={2}  > 
                                                            
                                                            <ChangeCategory item={item} handleUpdateCategory={handleUpdateCategory}  />

                                                            <ul className={classes.listPages}>  
                                                                <Typography className={classes.titlePages}>
                                                                    Pages List:
                                                                </Typography>
                                                                {
                                                                    item.pages.length > 0 &&
                                                                    item.pages.map((itemPages, indexPages) => (
                                                                        <li key={indexPages}  className={classes.pageBoxLi}  >
                                                                            <Box className={classes.pageBox}  >
                                                                                <Typography >Page: { itemPages.title } </Typography>
                                                                                <ButtonGroup 
                                                                                    color="primary"
                                                                                    aria-label="contained primary button group"
                                                                                    variant="contained"
                                                                                    className={classes.movingPageBtn}
                                                                                >  
                                                                                    {
                                                                                        item.pages.indexOf(itemPages) !== 0 &&
                                                                                        <Tooltip title='Get Up' placement='top'>
                                                                                            <Button   
                                                                                                onClick={() => { swapPage('up', item.id, itemPages.id) }}
                                                                                                size='small'
                                                                                                variant='contained'
                                                                                                color='primary' 
                                                                                                disabled={item.pages.indexOf(itemPages) === 0 ? true : false }
                                                                                            >  
                                                                                                <ExpandLessOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>   
                                                                                            </Button>
                                                                                        </Tooltip>
                                                                                    }
                                                                                    {
                                                                                        item.pages.indexOf(itemPages) !== item.pages.length - 1 &&
                                                                                        <Tooltip title='Get Down' placement='top'>
                                                                                            <Button   
                                                                                                onClick={() => { swapPage('down', item.id, itemPages.id) }} 
                                                                                                size='small'
                                                                                                variant='contained'
                                                                                                color='primary' 
                                                                                                disabled={item.pages.indexOf(itemPages) === item.pages.length - 1 ? true : false }
                                                                                            >     
                                                                                                <ExpandMoreOutlinedIcon style={{ color: '#fff' }} fontSize='small'/>
                                                                                            </Button>
                                                                                        </Tooltip>
                                                                                    }
                                                                                      
                                                                                    <Tooltip title='Delete Page' placement='top'>
                                                                                        <Button
                                                                                            variant='contained'
                                                                                            color="default"
                                                                                            disableElevation={true}
                                                                                            className={classes.deletePageBtn}
                                                                                            onClick={() => { deletePage(item.id, itemPages.id, itemPages.slug) }}
                                                                                        > 
                                                                                            <DeleteOutlineIcon style={{ color: '#fff' }} fontSize='small'/>
                                                                                        </Button>
                                                                                    </Tooltip>  
                                                                                </ButtonGroup>
                                                                            </Box>
                                                                            
                                                                            <ChangePage handleUpdatePage={handleUpdatePage} item={item} itemPages={itemPages} /> 
                                                                        </li>
                                                                    ))
                                                                }
                                                                {
                                                                    item.pages.length === 0 && 
                                                                    <Typography gutterBottom >No Pages </Typography>
                                                                }
                                                                <li>

                                                                    <AddPage addPage={addPage} id={item.id} />    
                                                                 
                                                                </li>
                                                            </ul>
                                                        </Box>
                                                    </Accordion>
                                                </Box>
                                            )  
                                        })
                                    }
                                    <Box className={classes.btnSave} mt={2}>
                                        <Button 
                                            color={'primary'} 
                                            variant="contained"
                                            onClick={handleSave}
                                            startIcon={<SaveIcon/>}
                                            disabled={isDisableBtn}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                            
                            
                           
                        </div>
                    </Draggable>
                </DialogContent> 
            </Modal> 
        </div>
    )
}

export default CategoriesChanger 