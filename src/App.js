import React from "react" 

import CssBaseline from '@material-ui/core/CssBaseline'; 

import ModeProvider from './context/modeContext/ModeProvider'
import CategoryProvider from './context/headerContext/CategoryProvider'
import LoadingProvider from './context/loadingContext/LoadingProvider'
import LibraryProvider from './context/libraryContext/LibraryProvider'
 
import RouterComponent from './Router/RouterComponent' 
  
class App extends React.Component {  
  
 render() {
    return (
      <ModeProvider> 
        <CategoryProvider>
          <LoadingProvider>
            <LibraryProvider>
              <div className="App">  
                <CssBaseline/>     
                <RouterComponent/> 
              </div>
            </LibraryProvider> 
          </LoadingProvider> 
        </CategoryProvider> 
      </ModeProvider>
    );
  }
}

export default App;
