import React from 'react' 
import StylesChangers from '../../styles/changers'   
import Draggable from 'react-draggable';  
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid' 

import { Typography, Button, Box, Tooltip,  Modal, DialogContent, Divider } from "@material-ui/core"; 
 
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import OpenWithIcon from '@material-ui/icons/OpenWith';

import ContainerElement from '../library/container/ElementCreator'  
import MainBannerElement from '../library/mainBanner/ElementCreator'  
import AccordionElement from '../library/accordion/ElementCreator'  
import ContactMapElement from '../library/contactMap/ElementCreator'  
import AboutElement from '../library/about/ElementCreator'  
import ActionLineElement from '../library/actionLine/ElementCreator'  
import TableElement from '../library/table/ElementCreator'  
import FormLineElement from '../library/formLine/ElementCreator'  
import SwiperElement from '../library/swiper/ElementCreator'  
import BannerElement from '../library/banner/ElementCreator'  

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
  const ActionLineLayout = layouts.actionLine 
  const TableLayout = layouts.table 
  const FormLineLayout = layouts.formLine 
  const SwiperLayout = layouts.swiper 
  const BannerLayout = layouts.banner 

  const [data, setData] = React.useState({})
  const [items, setItems] = React.useState([]) 

  const [open, setOpen] = React.useState(false)
  
  const handleOpen = () => {  
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  
  const useStyles = makeStyles((theme) => {
    const classesRef = StylesChangers()
    const commonClasses = classesRef(theme)

    const { menu, menuTitle } = commonClasses 

    return ({ 
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
          left: 10,
          backgroundColor: theme.palette.error.dark,   
          minWidth: 30, 
          maxWidth: 40, 
          minHeight: 38,  
          opacity: 0, 
          transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms `, 
          '&:hover': { 
            backgroundColor: theme.palette.secondary.dark,   
          }, 
          '&>span': {
              display: 'flex', 
              flexDirection: 'column', 
              fontSize: 10
          }
      }, 
      menu: {...menu, ...{ 
        width: 600, 
        left: "calc(50% - 300px)",
      }},     
      menuTitle: menuTitle,
      tooltip: {
        fontSize: 14
      }, 
      boxMenuItem : { 
        display: 'inline-block',
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      }

  
    })
  })
  
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
    // newData.items = items

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
    if(type === 'container')  newCont = JSON.parse(JSON.stringify(ContainerLayout))
    if(type === 'mainBanner') newCont = JSON.parse(JSON.stringify(MainBannerLayout))
    if(type === 'accordion')  newCont = JSON.parse(JSON.stringify(AccordionLayout))
    if(type === 'contactMap') newCont = JSON.parse(JSON.stringify(СontactMapLayout))
    if(type === 'about')      newCont = JSON.parse(JSON.stringify(AboutLayout))
    if(type === 'actionLine') newCont = JSON.parse(JSON.stringify(ActionLineLayout))
    if(type === 'table')      newCont = JSON.parse(JSON.stringify(TableLayout))
    if(type === 'formLine')   newCont = JSON.parse(JSON.stringify(FormLineLayout))
    if(type === 'swiper')     newCont = JSON.parse(JSON.stringify(SwiperLayout))
    if(type === 'banner')     newCont = JSON.parse(JSON.stringify(BannerLayout))
  

    newCont.id = uuid()
  
    newItems.push(newCont) 
  
    newData.items = newItems
        
    setData(newData)
    setItems(newItems) 
    setIsLoading(true)
    handleClose()

    window.scrollTo({
      top: window.innerHeight 
    })

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
        if(items[key].type === 'actionLine') { 
          return(
              <ActionLineElement
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
        if(items[key].type === 'table') { 
          return(
              <TableElement
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
        if(items[key].type === 'formLine') { 
          return(
              <FormLineElement
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
        if(items[key].type === 'swiper') { 
          return(
              <SwiperElement
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
        if(items[key].type === 'banner') { 
          return(
              <BannerElement
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
    <Box className={classes.btnContainer}> 

        <Breadcrumbs 
          breadcrumbs={props.breadcrumbs}
          history={props.history}
        />

        { 
          modeDev &&  
          <React.Fragment>
              
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
                                Add Block for Page <OpenWithIcon/>
                            </Typography> 
                            
                            
                            <Box className={classes.boxMenuItem}>
                              <Tooltip classes={{tooltip: classes.tooltip}} title='Container for heading, paragraph, image-paragraph, list' placement='top'>
                                <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('container') }}>
                                    Container
                                </Button> 
                              </Tooltip>
                            </Box> 

                            <Divider style={{margin: '15px 0'}} />

                            <Typography variant='caption' component="h6" gutterBottom>
                              With form
                            </Typography>
                            <Box className={classes.boxMenuItem}>
                              <Tooltip classes={{tooltip: classes.tooltip}} title='Block to start the page. Contain: text, form, image(desktop only)' placement='top'>
                                <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('mainBanner') }}>
                                    Main Banner
                                </Button> 
                              </Tooltip>
                            </Box>
                           
                            <Box className={classes.boxMenuItem}>
                              <Tooltip classes={{tooltip: classes.tooltip}} title='Contain: location and phone view, contact form, map. Has two different displays, with and without a map' placement='top'>
                                <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('contactMap') }}>
                                    Contacts with Map
                                </Button>  
                              </Tooltip>
                            </Box>

                            <Box className={classes.boxMenuItem}>
                              <Tooltip classes={{tooltip: classes.tooltip}} title='Small contact form with optional heading and paragrapher' placement='top'>
                                <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('formLine') }}>
                                    Add Form Line 
                                </Button> 
                              </Tooltip>
                            </Box>

                            <Divider style={{margin: '15px 0'}} />

                            <Box className={classes.boxMenuItem}>
                              <Tooltip classes={{tooltip: classes.tooltip}} title='Accordion with heading on top' placement='top'>
                                <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('accordion') }}>
                                    Accordion
                                </Button> 
                              </Tooltip>  
                            </Box>
                            
                            <Box className={classes.boxMenuItem}> 
                              <Tooltip classes={{tooltip: classes.tooltip}} title='Line for small text paragrapher with ability to add a button modal' placement='top'>
                                <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('actionLine') }}>
                                    Colored Action Line 
                                </Button> 
                              </Tooltip>
                            </Box>
                            <Box className={classes.boxMenuItem}>
                              <Tooltip classes={{tooltip: classes.tooltip}} title='Table with heading on top. Has ability to add "Show More Botton " on bottom' placement='top'>
                                <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('table') }}>
                                    Add Table 
                                </Button> 
                              </Tooltip>
                            </Box>
                            
                            <Divider style={{margin: '15px 0'}} />

                            <Typography variant='caption' component="h6" gutterBottom>
                              With image
                            </Typography>
                            <Box className={classes.boxMenuItem}>
                              <Tooltip classes={{tooltip: classes.tooltip}} title='Block with heading, paragraph and image. Image on desktop - 50% vieport width. Image on mobile - 50% vieport width . Has the ability to add a button modal' placement='top'>
                                <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('about') }}>
                                    About
                                </Button> 
                              </Tooltip>
                            </Box>
                            <Box className={classes.boxMenuItem}>
                              <Tooltip classes={{tooltip: classes.tooltip}} title='Simple slider with square images' placement='top'>
                                <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('swiper') }}>
                                    Swiper
                                </Button> 
                              </Tooltip>
                            </Box>
                            <Box className={classes.boxMenuItem}>
                              <Tooltip classes={{tooltip: classes.tooltip}} title='Banner with background image, heading, paragraph and modal button (optional)' placement='top'>
                                <Button color={'primary'} variant={'contained'} onClick={() => {addContainer('banner') }}>
                                    Banner
                                </Button> 
                              </Tooltip>
                            </Box>

                            <Divider style={{margin: '15px 0'}} />
 
                            <Box className={classes.boxMenuItem}>
                              <Button color={'primary'} variant={'outlined'} disabled={true} >
                                  More settings
                              </Button> 
                            </Box> 
                        </div>
                    </Draggable>
                </DialogContent> 
            </Modal>  
          </React.Fragment>
        }
  
        { 
          renderContainers()  
        } 
      </Box>
  )
}

export default SinglePage
