import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout/Layout';
import Planes from './pages/Planes/Planes';
import Resumen from './pages/Resumen/Resumen';
import Seguro from './pages/Seguro/Seguro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Seguro />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/resumen" element={<Resumen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
