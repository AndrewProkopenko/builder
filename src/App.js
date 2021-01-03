import React from "react"   

import ModeProvider from './context/modeContext/ModeProvider'
import CategoryProvider from './context/headerContext/CategoryProvider'
import LoadingProvider from './context/loadingContext/LoadingProvider'
import LibraryProvider from './context/libraryContext/LibraryProvider' 
// import ThemeProvider from './context/themeContext/ThemeProvider'
 
import ThemeComponent from './theme/ThemeComponent' 
// import theme from './theme/theme.js'
import './assets/style.scss'





  
const App = () => {   

  return (
      // <ThemeProvider>
       

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

      // </ThemeProvider>
  );
} 

export default App;
