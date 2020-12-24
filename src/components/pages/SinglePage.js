import React from 'react' 
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid' 

import { AppBar, Toolbar, Typography, Button, Box, CircularProgress, Container  } from "@material-ui/core"; 
import Skeleton from '@material-ui/lab/Skeleton';
import { indigo } from '@material-ui/core/colors'
  
import ContainerElement from '../library/container/ElementCreator' 
import ContainerLayout from '../library/container/containerLayout.json' 
 
import firebase from '../../firebase/firebase'

import pageLayout from './pageLayout.json'

import ModeContext from '../../context/modeContext/ModeContext'

function SinglePage(props) {

    const location = useLocation()

    const pageSlug = props.slugForUpdate

    const { modeDev } = React.useContext(ModeContext)
  
    const [data, setData] = React.useState({})
    const [items, setItems] = React.useState([])
  
    const [isUpdate, setIsUpdate] = React.useState(true)
    //  title
    //  slug
    //  id
  
    React.useEffect( () => {
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

      } else {
        console.log('Document data:', doc.data());
        
        setData(doc.data())  
        setItems(doc.data().items)  
        
        setIsUpdate(false)
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
  
      await firebase.db.collection("site1").doc(pageSlug).update({
        items: newData.items, 
      }).then(() => {
        setIsUpdate(false)
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
  
      await firebase.db.collection("site1").doc(pageSlug).update({
        items: newData.items
      }).then(() => {
        setIsUpdate(false)
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
  
      await firebase.db.collection("site1").doc(pageSlug).update({
        items: newItems
      }).then(() => {
        setIsUpdate(false)
      });  
    }
  
    const removeContainer = async (id) => {  
      let newData = Object.assign({}, data)
      const filtered = items.filter((item) => (item.id !== id))  
  
      newData.items = filtered
          
      setData(newData)
      setItems(filtered) 
      setIsUpdate(true)
       
      await firebase.db.collection("site1").doc(pageSlug).update({
        items: filtered
      }).then(() => {
        setIsUpdate(false)
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
   
  
      await firebase.db.collection("site1").doc(pageSlug).update({
        items: newItems
      }).then(() => {
        setIsUpdate(false)
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
           
          <Box mt={5} clone={true} >
            <Container>
              <Box >
                <Skeleton 
                  variant='rect'
                  height={60}
                  animation='wave'
                />
              </Box>
              <Box display='flex' alignItems='center'>
                <Box mr={1}>
                  <Skeleton
                    width={30}
                    height={30}
                    variant='circle' 
                    animation='wave'
                  />
                </Box>
                <Skeleton 
                  variant='text'  
                  height={50}
                  width='100%'
                  animation='wave'
                />
              </Box>
              <Box mb={2}>
                <Skeleton 
                  variant='rect'
                  height={150}
                  animation='wave'
                />
              </Box>
              <Skeleton 
                variant='rect'
                height={80}
                animation='wave'
              />
            </Container>
          </Box>
           
        ) 
      }
      
    } 

    return (
        <React.Fragment> 
          { 
            modeDev &&  
            <AppBar position="static" component='div' style={{backgroundColor: indigo[200] }}>
              <Toolbar variant="dense"> 
                  <Typography variant="h6" >
                    Page actions
                  </Typography>
                  
                  <Box display="flex" alignItems='center' mx={1} minWidth={22} >
                    {
                      isUpdate &&
                      <CircularProgress size={22} thickness={5} /> 
                    } 
                  </Box>

                  <Box mx={1}>
                    <Button color={'primary'} variant={'contained'} onClick={addContainer}>
                        Add new container
                    </Button> 
                  </Box>
                  <Box mx={1}>
                    <Button color={'primary'} variant={'outlined'} disabled={true} >
                        More settings
                    </Button> 
                  </Box>
              
              </Toolbar>
            </AppBar>
          }
           
          { 
            renderContainers()  
          } 
        </React.Fragment>
    )
}

export default SinglePage
