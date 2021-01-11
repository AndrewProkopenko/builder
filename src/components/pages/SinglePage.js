import React from 'react' 
import Draggable from 'react-draggable';  
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid' 

import { Typography, Button, Box, Tooltip,  Modal, DialogContent  } from "@material-ui/core"; 
 
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import OpenWithIcon from '@material-ui/icons/OpenWith';

import ContainerElement from '../library/container/ElementCreator'  
import MainBannerElement from '../library/mainBanner/ElementCreator'  
import AccordionElement from '../library/accordion/ElementCreator'  
import ContactMapElement from '../library/contactMap/ElementCreator'  
import AboutElement from '../library/about/ElementCreator'  

import SkeletonPage from '../placeholders/SkeletonPage'
import Breadcrumbs from '../placeholders/Breadcrumbs'
 
import firebase from '../../firebase/firebase'
  
import ModeContext from '../../context/modeContext/ModeContext'
import LoadingContext from '../../context/loadingContext/LoadingContext'
import LibraryContext from '../../context/libraryContext/LibraryContext'

function SinglePage(props) {

  const location = useLocation() 

  const pageSlug = props.slugForUpdate

  const { modeDev } = React.useContext(ModeContext)
  const { setIsLoading } = React.useContext(LoadingContext)
  const { layouts } = React.useContext(LibraryContext)
  const pageLayout = layouts.page
  const ContainerLayout = layouts.container 
  const MainBannerLayout = layouts.mainBanner 
  const AccordionLayout = layouts.accordion 
  const СontactMapLayout = layouts.contactMap 
  const AboutLayout = layouts.about 

  const [data, setData] = React.useState({})
  const [items, setItems] = React.useState([]) 

  const [open, setOpen] = React.useState(false)
  
  const handleOpen = () => {  
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles((theme) => ({ 
    btnContainer: {
      position: 'relative',
      '&:hover $btnSetting' : {
        opacity: 1
      }
    },
    btnSetting: { 
        position: 'absolute', 
        zIndex: 1031, 
        top: 0, 
        left: 80,
        backgroundColor: theme.palette.error.dark,   
        minWidth: 30, 
        maxWidth: 40, 
        minHeight: 38, 
        transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms `, 
        '&:hover': { 
          backgroundColor: theme.palette.secondary.dark,   
        }, 
        '&>span': {
            display: 'flex', 
            flexDirection: 'column', 
            fontSize: 10
        }
    } , 
    menu: {    
      position: "absolute", 
      left: "calc(50% - 200px)",
      top: 50, 
      backgroundColor: theme.palette.background.paper, 
      padding: 10 , 
      paddingBottom: 0, 
      maxWidth: 400,  
      width: 400,
      maxHeight: 'calc(100vh - 100px)', 
      minHeight: 500,
      overflowY: 'scroll',  
    },
    menuTitle: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        fontSize: 14, 
        borderBottom: '1px solid #eaeaea',
        paddingBottom: 6,
        marginBottom: 10, 
        cursor: 'move'
    },

  }))
  
  const classes = useStyles();

  React.useEffect( () => { 
    setIsLoading(true)
    fetchData()
    document.title = props.metaTitle
    // eslint-disable-next-line
  }, [location])
  
  const fetchData = async () => {  
      
    const pageRef = firebase.db.collection("site1").doc(pageSlug)
    const doc = await pageRef.get();
    
    if (!doc.exists) {
      console.log('No such page!'); 

      let newPage = Object.assign({}, pageLayout) 
      newPage.id = uuid()
      newPage.slug = pageSlug
      newPage.items = []

      await pageRef.set(newPage)

      setData(newPage)  
      setItems(newPage.items || [])  
      setIsLoading(false)

    } else { 
      setData(doc.data())  
      setItems(doc.data().items)  
        
      setIsLoading(false)
    }
  
  }  
  
  const reSaveContainer = async (id, childrenContainer) => {  
  
    let newData = Object.assign({}, data)
    newData.items = items

    Object.keys(newData.items).map( (elem) => { 
      if(newData.items[elem].id === id) {
          newData.items[elem].children = childrenContainer 
      }
      return 0 
    })
  
    setData(newData)
    setItems(newData.items) 
    setIsLoading(true)

    await firebase.db.collection("site1").doc(pageSlug).update({
      items: newData.items, 
    }).then(() => { 
      setIsLoading(false)
    }).then( () => {
        if(childrenContainer.length === 0) {
          removeContainer(id)
        }
    })
  } 

  const reSaveContainerStyleSettings = async (id, classes, settings) => {  
    let newData = Object.assign({}, data)
      
    Object.keys(newData.items).map( (elem) => { 
      if(newData.items[elem].id === id) {
        newData.items[elem].classes = classes 
        newData.items[elem].disableGutters = settings.disableGutters 
        newData.items[elem].fixed = settings.fixed 
        newData.items[elem].maxWidth = settings.maxWidth 
        newData.items[elem].innerContainer = settings.innerContainer 
        newData.items[elem].isPaper = settings.isPaper 
      }
      return 0 
    }) 

    setData(newData)
    setItems(newData.items)  
    setIsLoading(true)

    await firebase.db.collection("site1").doc(pageSlug).update({
      items: newData.items
    }).then(() => { 
      setIsLoading(false)
    }) 
  } 
  
  const addContainer = async (type) => {   
    let newData = Object.assign({}, data)
    let newItems = items.slice()

    let newCont
    if(type === 'container') newCont = Object.assign({}, ContainerLayout) 
    if(type === 'mainBanner') newCont = Object.assign({}, MainBannerLayout) 
    if(type === 'accordion') newCont = Object.assign({}, AccordionLayout) 
    if(type === 'contactMap') newCont = Object.assign({}, СontactMapLayout) 
    if(type === 'about') newCont = Object.assign({}, AboutLayout) 

    newCont.id = uuid()
  
    newItems.push(newCont) 
  
    newData.items = newItems
        
    setData(newData)
    setItems(newItems) 
    setIsLoading(true)
    handleClose()
    await firebase.db.collection("site1").doc(pageSlug).update({
      items: newItems
    }).then(() => { 
      setIsLoading(false)
    });  
  }

  const removeContainer = async (id) => {  
    let newData = Object.assign({}, data)
    const filtered = items.filter((item) => (item.id !== id))  

    newData.items = filtered
        
    setData(newData)
    setItems(filtered)  
    setIsLoading(true)
      
    await firebase.db.collection("site1").doc(pageSlug).update({
      items: filtered
    }).then(() => { 
      setIsLoading(false)
    }); 
  }

  const swapContainer = async (direction, id) => { 
    let newData = Object.assign({}, data)
    let newItems = items.slice()
    let activeIndex   
  
    newItems.map( (item) => { 
      if(item.id === id) {
        activeIndex = newItems.indexOf(item) 
      }
      return 0 
    }) 
  
    if(direction === 'up' && activeIndex === 0) return  
    if(direction === 'down' && activeIndex === newItems.length - 1 ) return
    
    if(direction === 'up') { 
      const movedItem = newItems[activeIndex]
      const placeItem = newItems[activeIndex - 1]

      newItems[activeIndex] = placeItem
      newItems[activeIndex - 1 ] = movedItem  
    }
    if(direction === 'down') {
      const movedItem = newItems[activeIndex]
      const placeItem = newItems[activeIndex + 1]

      newItems[activeIndex] = placeItem
      newItems[activeIndex + 1 ] = movedItem  
    }

    newData.items = newItems
        
    setItems(newItems)
    setData(newData) 
    setIsLoading(true)
  

    await firebase.db.collection("site1").doc(pageSlug).update({
      items: newItems
    }).then(() => { 
      setIsLoading(false)
    }) 
  }

  const reSaveItem = async (id, data) => { 
      let newData = Object.assign({}, data)
      newData.items = items
  
      Object.keys(newData.items).map( (elem) => { 
        if(newData.items[elem].id === id) {
            newData.items[elem] = data 
        }
        return 0 
      })
    
      setData(newData)
      setItems(newData.items) 
      setIsLoading(true)
       
      await firebase.db.collection("site1").doc(pageSlug).update({
        items: newData.items, 
      }).then(() => { 
        setIsLoading(false)
      })
  }

  function renderContainers () {   
    if(items.length > 0) {
      return Object.keys(items).map( (key) => {  
        // eslint-disable-next-line
        let orderFirst = key == 0 ? true : false
        // eslint-disable-next-line
        let orderLast = key == items.length - 1 ? true : false  
        
        if(items[key].type === 'container') {
          return ( 
              <ContainerElement 
                key={items[key].id} 
                data={items[key]} 
                reSaveContainer={reSaveContainer}
                reSaveContainerStyleSettings={reSaveContainerStyleSettings} 
                removeContainer={removeContainer}
                swapContainer={swapContainer}
                isFirst={orderFirst}
                isLast={orderLast}
              /> 
          ) 
        }
        if(items[key].type === 'mainBanner') { 
          return(
              <MainBannerElement
                key={items[key].id} 
                data={items[key]} 
                swapContainer={swapContainer}
                removeContainer={removeContainer}
                reSaveItem={reSaveItem}
                isFirst={orderFirst}
                isLast={orderLast}
              />
          )
        } 
        if(items[key].type === 'accordion') { 
          return(
              <AccordionElement
                key={items[key].id} 
                data={items[key]} 
                swapContainer={swapContainer}
                removeContainer={removeContainer}
                reSaveItem={reSaveItem}
                isFirst={orderFirst}
                isLast={orderLast}
              />
          )
        } 
        if(items[key].type === 'contactMap') { 
          return(
              <ContactMapElement
                key={items[key].id} 
                data={items[key]} 
                swapContainer={swapContainer}
                removeContainer={removeContainer}
                reSaveItem={reSaveItem}
                isFirst={orderFirst}
                isLast={orderLast}
              />
          )
        } 
        if(items[key].type === 'about') { 
          return(
              <AboutElement
                key={items[key].id} 
                data={items[key]} 
                swapContainer={swapContainer}
                removeContainer={removeContainer}
                reSaveItem={reSaveItem}
                isFirst={orderFirst}
                isLast={orderLast}
              />
          )
        } 
        return false
      })
    }
    else {
      return ( 
        <SkeletonPage/> 
      ) 
    }
    
  } 

  return (
    <React.Fragment> 

        <Breadcrumbs 
          breadcrumbs={props.breadcrumbs}
          history={props.history}
        />

        { 
          modeDev &&  
          <Box className={classes.btnContainer}  >
              
            <Tooltip title='Page Settings' placement='bottom'>
                <Button  
                    onClick={handleOpen} 
                    size='medium'
                    variant='contained'
                    color={'primary'}
                    className={classes.btnSetting}
                >   
                    <span>Page</span>
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
                                Действия для страницы  <OpenWithIcon/>
                            </Typography> 
                            <Box m={1}>
                              <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('container') }}>
                                  Add new container
                              </Button> 
                            </Box>
                            <Box m={1}>
                              <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('mainBanner') }}>
                                  Add Main Banner
                              </Button> 
                            </Box>
                            <Box m={1}>
                              <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('accordion') }}>
                                  Add Accordion
                              </Button> 
                            </Box>
                            <Box m={1}>
                              <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('contactMap') }}>
                                  Add Contacts with Map
                              </Button> 
                            </Box>
                            <Box m={1}>
                              <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('about') }}>
                                  Add About
                              </Button> 
                            </Box>
                            <Box m={1}>
                              <Button color={'primary'} variant={'outlined'} disabled={true} >
                                  More settings
                              </Button> 
                            </Box> 
                        </div>
                    </Draggable>
                </DialogContent> 
            </Modal>  
          </Box>
        }
  
        { 
          renderContainers()  
        } 
      </React.Fragment>
  )
}

export default SinglePage
