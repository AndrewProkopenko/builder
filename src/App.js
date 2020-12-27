import React from "react" 

import CssBaseline from '@material-ui/core/CssBaseline'; 

import ModeProvider from './context/modeContext/ModeProvider'
import CategoryProvider from './context/categoryContext/CategoryProvider'
import LoadingProvider from './context/loadingContext/LoadingProvider'
 
import RouterComponent from './Router/RouterComponent' 
  
function App() {  
 
  // const [imageUrl, setimageUrl] = React.useState('')
  
  // const handleChange = (e) => {
  //   console.log(e.target.files[0]) 
  //   uploadHandler(e.target.files[0])
  // }

  // const uploadHandler = (imageData) => {
  //   console.log(imageData)
  //   const storageRef =   firebase.storage.ref(`${imageData.name}`).put(imageData)
  //   storageRef.on('state-changed', 
  //     snapshot => {
  //       console.log( snapshot )
  //     }, 
  //     error => {
  //       console.log(error.message)
  //     },
  //     () => {
  //       console.log("upload = 100!")
  //       storageRef.snapshot.ref.getDownloadURL()
  //         .then( url => {
  //           setimageUrl(url)
  //           console.log(url)
  //         })
  //     }
  //   )
  // }

  return (
    <ModeProvider> 
      <CategoryProvider>
        <LoadingProvider>
            <div className="App">
              <CssBaseline/>   
              <RouterComponent/> 
            </div>
        </LoadingProvider> 
      </CategoryProvider> 
    </ModeProvider>
  );
}

export default App;
