import React from "react"   

import ModeProvider from './context/modeContext/ModeProvider'
import CategoryProvider from './context/headerContext/CategoryProvider'
import LoadingProvider from './context/loadingContext/LoadingProvider'
import LibraryProvider from './context/libraryContext/LibraryProvider'  
import SendFormProvider from './context/sendFormContext/SendFormProvider'
import ModalProvider from './context/modalContext/ModalProvider'
 
import ThemeComponent from './theme/ThemeComponent' 


import './assets/style/style.scss'
 
const App = () => {   
 
  return (
    <ModalProvider>
      <SendFormProvider> 

          <CategoryProvider>
            <LibraryProvider>
                <ModeProvider> 
                  <LoadingProvider>
                    <div className="App">  
                      <ThemeComponent/> 
                    </div>
                  </LoadingProvider> 
                </ModeProvider>
            </LibraryProvider> 
          </CategoryProvider> 
 
      </SendFormProvider>
    </ModalProvider>
  );
} 

export default App;
