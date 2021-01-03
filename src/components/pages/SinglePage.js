import React from 'react' 
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid' 

import { Typography, Button, Box, CircularProgress, Tooltip , Container } from "@material-ui/core"; 
 
import { useTheme, makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';

import ContainerElement from '../library/container/ElementCreator'  
import MainBannerElement from '../library/mainBanner/ElementCreator'  
import SkeletonPage from '../placeholders/SkeletonPage'
import Breadcrumbs from '../placeholders/Breadcrumbs'
 
import firebase from '../../firebase/firebase'
  
import ModeContext from '../../context/modeContext/ModeContext'
import LoadingContext from '../../context/loadingContext/LoadingContext'
import LibraryContext from '../../context/libraryContext/LibraryContext'

function SinglePage(props) {

    const location = useLocation()
    const theme = useTheme(); 

    const pageSlug = props.slugForUpdate

    const { modeDev } = React.useContext(ModeContext)
    const { setIsLoading } = React.useContext(LoadingContext)
    const { layouts } = React.useContext(LibraryContext)
    const pageLayout = layouts.page
    const ContainerLayout = layouts.container 
    const MainBannerLayout = layouts.mainBanner 
  
    const [data, setData] = React.useState({})
    const [items, setItems] = React.useState([])
  
    const [isUpdate, setIsUpdate] = React.useState(true)

    const [isHideSettings, setIsHideSettings] = React.useState(true)
    //  title
    //  slug
    //  id
    const useStyles = makeStyles((theme) => ({ 
      
      btnSetting: {
          opacity: isHideSettings ? '0.15' : '1',
          position: 'absolute', 
          zIndex: 1030, 
          top: 2, 
          left: 45,
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
      settingsContainer: {
        opacity : isHideSettings ? 0 : 1, 
        transform : isHideSettings ? 'scaleX(0)' : 'scaleX(1)', 
        display: 'flex',
        flexWrap: 'wrap',
        borderBottom: `${theme.palette.action.active} 1px solid` , 
      },
      btnContainer: {
        position: 'relative',
        '&:hover $btnSetting' : {
          opacity: 1
        }
      }
  
  }))
  
  const classes = useStyles();
    React.useEffect( () => { 
      setIsLoading(true)
      fetchData()
      document.title = props.metaTitle
    }, [location])
  
    const fetchData = async () => {  
       
      const pageRef = firebase.db.collection("site1").doc(pageSlug)
      const doc = await pageRef.get();
      
      if (!doc.exists) {
        console.log('No such page!'); 

        // задать шаблон страницы
        let newPage = Object.assign({}, pageLayout) 
        newPage.id = uuid()
        newPage.slug = pageSlug
        newPage.items = []

        await pageRef.set(newPage)

        setData(newPage)  
        setItems(newPage.items || []) 
        setIsUpdate(false)
        setIsLoading(false)

      } else { 
        setData(doc.data())  
        setItems(doc.data().items)  
        
        setIsUpdate(false)
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
      setIsUpdate(true)
      setIsLoading(true)
  
      await firebase.db.collection("site1").doc(pageSlug).update({
        items: newData.items, 
      }).then(() => {
        setIsUpdate(false)
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
        }
        return 0 
      }) 
  
      setData(newData)
      setItems(newData.items) 
      setIsUpdate(true)
      setIsLoading(true)
  
      await firebase.db.collection("site1").doc(pageSlug).update({
        items: newData.items
      }).then(() => {
        setIsUpdate(false)
        setIsLoading(false)
      }) 
    } 
   
    const addContainer = async (type) => {   
      let newData = Object.assign({}, data)
      let newItems = items.slice()
  
      let newCont
      if(type === 'container') newCont = Object.assign({}, ContainerLayout) 
      if(type === 'mainBanner') newCont = Object.assign({}, MainBannerLayout) 

      newCont.id = uuid()
   
      newItems.push(newCont) 
   
      newData.items = newItems
          
      setData(newData)
      setItems(newItems)
      setIsUpdate(true)
      setIsLoading(true)
  
      await firebase.db.collection("site1").doc(pageSlug).update({
        items: newItems
      }).then(() => {
        setIsUpdate(false)
        setIsLoading(false)
      });  
    }
  
    const removeContainer = async (id) => {  
      let newData = Object.assign({}, data)
      const filtered = items.filter((item) => (item.id !== id))  
  
      newData.items = filtered
          
      setData(newData)
      setItems(filtered) 
      setIsUpdate(true)
      setIsLoading(true)
       
      await firebase.db.collection("site1").doc(pageSlug).update({
        items: filtered
      }).then(() => {
        setIsUpdate(false)
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
      setIsUpdate(true)
      setIsLoading(true)
   
  
      await firebase.db.collection("site1").doc(pageSlug).update({
        items: newItems
      }).then(() => {
        setIsUpdate(false)
        setIsLoading(false)
      }) 
    }
  
    function renderContainers () {   
      if(items.length > 0) {
        return Object.keys(items).map( (key) => {  
          if(items[key].type === 'container') {
            return ( 
                <ContainerElement 
                  key={items[key].id} 
                  data={items[key]} 
                  reSaveContainer={reSaveContainer}
                  reSaveContainerStyleSettings={reSaveContainerStyleSettings} 
                  removeContainer={removeContainer}
                  swapContainer={swapContainer}
                /> 
            ) 
          }
          if(items[key].type === 'mainBanner') { 
            return(
                <MainBannerElement
                  key={items[key].id} 
                  data={items[key]} 
                />
            )
          }
          
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
                      onClick={() => { setIsHideSettings(!isHideSettings) }} 
                      size='medium'
                      variant='contained'
                      color={'primary'}
                      className={classes.btnSetting}
                  >   
                      <span>Page</span>
                      <SettingsIcon style={{ color: '#fff' }} fontSize='small'/>
                  </Button>
              </Tooltip>  
              {
                // !isHideSettings && 
                <Container className={classes.settingsContainer} px={3}  > 
                  
                  <Box m={1} pl={'55px'}>
                    <Typography color={theme.palette.action.active} variant="h6" >
                      Page actions
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems='center' mx={1} minWidth={22} >
                    {
                      isUpdate &&
                      <CircularProgress size={22} thickness={5} /> 
                    } 
                  </Box>

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
                    <Button color={'primary'} variant={'outlined'} disabled={true} >
                        More settings
                    </Button> 
                  </Box> 
            </Container>
              }
            </Box>
          }
  
          

          { 
            renderContainers()  
          } 
        </React.Fragment>
    )
}

export default SinglePage
