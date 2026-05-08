import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Accueil from './pages/Accueil'
import Propos from './pages/Propos'
import Catalogue from './pages/Catalogue'
import Contact from './pages/Contact'
import Mesures from './pages/Mesures'
import Experiences from './pages/Experiences'
import Clients from './pages/Clients'
import Inscription from './pages/Inscription'
import Admin from './admin/Admin'
import AdminGuard from './admin/AdminGuard'
import Login from './admin/Login'
import Dashboard from './admin/Dashboard'
import Commandes from './admin/Commandes'
import AdminClients from './admin/Clients'
import Produits from './admin/Produits'
import Inscriptions from './admin/Inscriptions'

const App = () => {
  return (
    <Routes>
      {/* Routes publiques : utilisent PublicLayout (Navbar + page) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Accueil />} />
        <Route path="/propos" element={<Propos />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mesures" element={<Mesures />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/inscription" element={<Inscription />} />
      </Route>

      {/* Page de login : publique (forcément, sinon impossible de se connecter) */}
      <Route path="/admin/login" element={<Login />} />

      {/* Routes admin : protégées par AdminGuard, puis layout sidebar */}
      <Route element={<AdminGuard />}>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="commandes" element={<Commandes />} />
          <Route path="inscriptions" element={<Inscriptions />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="produits" element={<Produits />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
