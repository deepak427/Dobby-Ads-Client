import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Drive from './pages/Drive/Drive'

const All_routes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/drive/:id" element={<Drive/>} />
    </Routes>
  )
}

export default All_routes
