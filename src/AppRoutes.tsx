import { Routes, Route} from 'react-router-dom';
import App from "./App";
import { DetalleProducto } from './components/detalleProducto';

export function AppRoutes () {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/producto/:id" element={<DetalleProducto />} /> 
    </Routes>
  );
}
