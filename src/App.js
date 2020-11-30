import React from "react"
import {Box, Container, Paper} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';
 
import Pages from './components/pages/Pages'

import ModeProvider from './modeContext/ModeProvider'

function App() {


  return (
    <ModeProvider>
      <div className="App">
        <CssBaseline/>
        
        <Container>
          <Box p={2} mt={1} clone={true}> 
            <Paper>
                <Pages/>
            </Paper>
          </Box>
        </Container>

      </div>
    </ModeProvider>
  );
}

export default App;
