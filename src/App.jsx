
import Layout from './layout/admin/Index'
import Dashboard from './pages/admin/Dashboard'
import UserTable from './pages/admin/UserTable'
import Agama from './pages/admin/agama/Agama'
import Kesatuan from './pages/admin/kesatuan/Kesatuan'
// import './App.css'
import { Routes, Route } from 'react-router-dom'
import Personel from './pages/admin/personel/Personel'
import Tugas from './pages/admin/tugas/Tugas'
import AddAgama from './pages/admin/agama/AddAgama'
import AddPersonel from './pages/admin/personel/AddPersonel'
import EditPersonel from './pages/admin/personel/EditPersonel'
function App() {
  return (
  <Layout>
    <Routes>
      <Route path='/' element={<Dashboard/>}></Route>
      <Route path='/agama' element={<Agama/>}></Route>
      <Route path='/agama/create' element={<AddAgama/>}></Route>
      <Route path='/kesatuan' element={<Kesatuan/>}></Route>
      <Route path='/personel' element={<Personel/>}></Route>
      <Route path='/personel/create' element={<AddPersonel/>}></Route>
      <Route path='/personel/edit/:id' element={<EditPersonel/>}></Route>
      <Route path='/tugas' element={<Tugas/>}></Route>
      <Route path='/userTable' element={<UserTable/>}></Route>
    </Routes>
  </Layout>
  )
}

export default App
