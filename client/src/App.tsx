import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import EtudiantInfo from './components/EtudiantInfo';
import RequireAuth from './components/RequireAuth';
import EtudiantPage from './pages/EtudiantPage';
import LoginPage from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<RequireAuth><EtudiantPage /></RequireAuth>} />
          {/* <Route index element={<EtudiantPage />} /> */}
          <Route path='/login' element={<LoginPage />} />
          {/* <Route path="/pdf" element={<EtudiantInfo />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <EtudiantPage /> */}
    </>
  );
}

export default App;
