import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Discover from './pages/Discover'
import Detail from './pages/Detail'
import Tracker from './pages/Tracker'
import Deadlines from './pages/Deadlines'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="discover" element={<Discover />} />
        <Route path="s/:id" element={<Detail />} />
        <Route path="tracker" element={<Tracker />} />
        <Route path="deadlines" element={<Deadlines />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
