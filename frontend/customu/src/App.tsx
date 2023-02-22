import { ChakraProvider } from '@chakra-ui/react'
import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Top } from './pages/Top'
import { theme } from './styles/themes'


const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Top />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;