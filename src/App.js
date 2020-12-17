import React, { useState } from "react"
import uuid from 'react-uuid' 
import { AppBar, Toolbar, Typography, Button, Box } from "@material-ui/core";

import CssBaseline from '@material-ui/core/CssBaseline';
import { indigo } from '@material-ui/core/colors'
  
import ContainerElement from './components/library/container/ElementCreator' 
import ContainerLayout from './components/library/container/containerLayout.json' 

import ModeProvider from './modeContext/ModeProvider'

import firebase from './firebase/firebase'
  
function App() { 

  console.log('App')

  const [data, setData] = useState({})
  const [items, setItems] = useState([])
  //  title
//  slug
//  id

  React.useEffect( () => {
    fetchData()
  }, [])

  const fetchData = async () => {  
     
    const pageRef = firebase.db.collection("site1").doc('page1')
    const doc = await pageRef.get();
    
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      
      setData(doc.data())  
      setItems(doc.data().items)  
    }
 
  }


  // childrenContainer - массив новых заголовков,параграфов для контейнера под номером id 
  const reSaveContainer = async (id, childrenContainer) => { 

    console.log('reSaveContainer')
      
    let newData = Object.assign({}, data)
    newData.items = items

    Object.keys(newData.items).map( (elem) => { 
       if(newData.items[elem].id === id) {
          newData.items[elem].children = childrenContainer 
      }
    })
 
    setData(newData)
    setItems(newData.items)

    await firebase.db.collection("site1").doc('page1').update({
      items: newData.items, 
    }); 
  }



  const reSaveContainerStyleSettings = async (id, classes, settings) => { 
    console.log('reSaveContainerStyleSettings')
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

    await firebase.db.collection("site1").doc('page1').update({
      items: newData.items
    }); 
  }
 
 
  const addContainer = async () => {  
    let newItems = items.slice()

    let newCont = Object.assign({}, ContainerLayout) 
    newCont.id = uuid()
 
    newItems.push(newCont) 

    console.log(newCont, ContainerLayout)

    setItems(newItems)
    await firebase.db.collection("site1").doc('page1').update({
      items: newItems
    });  
    
  }

  const removeContainer = async (id) => { 
    const filtered = items.filter((item) => (item.id !== id))  
    setItems(filtered) 
     
    await firebase.db.collection("site1").doc('page1').update({
      items: filtered
    });
    console.log(filtered)
  }

  function renderContainers () { 
    // console.log(data)
    return Object.keys(items).map( (key) => { 
       return ( 
        <ContainerElement 
          key={items[key].id} 
          data={items[key]} 
          reSaveContainer={reSaveContainer}
          reSaveContainerStyleSettings={reSaveContainerStyleSettings} 
          removeContainer={removeContainer}
        /> 
      ) 
    })
  } 
  


  return (
    <ModeProvider>  
      <div className="App">
        <CssBaseline/>  
         
          <AppBar position="static" style={{backgroundColor: indigo[200] }}>
            <Toolbar variant="dense">
              <Typography variant="h6" >
                Page actions
              </Typography>
              <Box mx={2}>
                <Button color={'primary'} variant={'contained'} onClick={addContainer}>
                    Add new container
                </Button> 
              </Box>
              <Box mx={2}>
                <Button color={'primary'} variant={'outlined'} disabled={true} >
                    More settings
                </Button> 
              </Box>
            </Toolbar>
          </AppBar>
          

          <div> 
            { 
              renderContainers()  
            }
          </div>
      </div>
    </ModeProvider>
  );
}

export default App;
