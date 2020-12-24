import React from 'react' 
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid' 

import { Typography, Button, Box, CircularProgress } from "@material-ui/core"; 

import { indigo } from '@material-ui/core/colors'
  
import ContainerElement from '../library/container/ElementCreator' 
import ContainerLayout from '../library/container/containerLayout.json' 
import SkeletonPage from '../placeholders/SkeletonPage'
 
import firebase from '../../firebase/firebase'

import pageLayout from './pageLayout.json'

import ModeContext from '../../context/modeContext/ModeContext'
import LoadingContext from '../../context/loadingContext/LoadingContext'

function SinglePage(props) {

    const location = useLocation()

    const pageSlug = props.slugForUpdate

    const { modeDev } = React.useContext(ModeContext)
    const { setIsLoading } = React.useContext(LoadingContext)
  
    const [data, setData] = React.useState({})
    const [items, setItems] = React.useState([])
  
    const [isUpdate, setIsUpdate] = React.useState(true)
    //  title
    //  slug
    //  id
  
    React.useEffect( () => { 
      setIsLoading(true)
      fetchData()
    }, [location])
  
    const fetchData = async () => {  
       
      const pageRef = firebase.db.collection("site1").doc(pageSlug)
      const doc = await pageRef.get();
      
      if (!doc.exists) {
        console.log('No such document!'); 

        // задать шаблон страницы
        let newPage = Object.assign({}, pageLayout)
        newPage.id = uuid()
        newPage.slug = pageSlug

        await pageRef.set(newPage)

        setData(newPage)  
        setItems(newPage.items) 
        setIsUpdate(false)
        setIsLoading(false)

      } else {
        console.log('Document data:', doc.data());
        
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
   
    const addContainer = async () => {   
      let newData = Object.assign({}, data)
      let newItems = items.slice()
  
      let newCont = Object.assign({}, ContainerLayout) 
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
          { 
            modeDev &&  
            <Box px={3} display='flex' flexWrap='wrap' style={{backgroundColor: indigo[50] }}> 
                  
                  <Box m={1}>
                    <Typography variant="h6" >
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
                    <Button color={'primary'} variant={'contained'} onClick={addContainer}>
                        Add new container
                    </Button> 
                  </Box>
                  <Box m={1}>
                    <Button color={'primary'} variant={'outlined'} disabled={true} >
                        More settings
                    </Button> 
                  </Box> 
            </Box>
          }
           
          { 
            renderContainers()  
          } 
        </React.Fragment>
    )
}

export default SinglePage
