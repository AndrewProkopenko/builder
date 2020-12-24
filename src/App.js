import React from "react" 

import CssBaseline from '@material-ui/core/CssBaseline'; 

import ModeProvider from './context/modeContext/ModeProvider'
import CategoryProvider from './context/categoryContext/CategoryProvider'
import LoadingProvider from './context/loadingContext/LoadingProvider'
 
import RouterComponent from './Router/RouterComponent'
  
function App() {  
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
