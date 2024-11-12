
// import './App.css'
import { Box } from '@mui/material'
import PrimarySearchAppBar from './components/AppBar'
import WelcomeCard from './components/container/WelcomeCard'
function App() {

  return (
    <Box sx={{minHeight: '100vh'}}>
   <PrimarySearchAppBar />
   <WelcomeCard />
    </Box>
  )
}

export default App
