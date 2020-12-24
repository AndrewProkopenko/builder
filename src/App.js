import React from "react" 

import CssBaseline from '@material-ui/core/CssBaseline'; 

import ModeProvider from './context/modeContext/ModeProvider'
import CategoryProvider from './context/categoryContext/CategoryProvider'
 
import RouterComponent from './Router/RouterComponent'
  
function App() {  
  return (
    <ModeProvider> 
      <CategoryProvider>
        <div className="App">
          <CssBaseline/>  

          <RouterComponent/>

        </div>
      </CategoryProvider> 
    </ModeProvider>
  );
}

export default App;
