import { Route, Routes } from 'react-router-dom';
import AuthForms from './Pages/Login';
import Tienda from './Pages/Tienda';

export default function App() {
  return (
    <Routes>
      <Route path="/Login" element={<AuthForms/>} />
      <Route path="/" element={<Tienda/>} />
    </Routes>
  );
}
