import 'bootstrap/dist/css/bootstrap.min.css'
import './style/index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import LoginRegister from './components/LoginRegister'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<LoginRegister />} />
    </Routes>
  </BrowserRouter>
)

export default App
