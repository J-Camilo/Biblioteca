import Particles from './components/Backgorund/BackgroundIndex'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

import Home from './layouts/Home/home';
import ProtectedRoute from './ProtectedRoute';
import Payment from './layouts/Payment/payment';
import Sign from './layouts/Autentification/Login';


function App() {
  return (
    <Router>
      {/* Fondo de partículas */}
      <div style={{ width: '100%', height: '99vh', position: 'absolute' }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={500}
          particleSpread={6}
          speed={0.1}
          particleBaseSize={210}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <AuthProvider>
        <div style={{ position: "relative", zIndex: 1 }}>
          <Routes>
            {/* Ruta pública para el login */}
            <Route path="/login" element={<Sign />} />

            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/payment/book/:idbook" element={<Payment />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
