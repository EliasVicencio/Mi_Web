import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/styles.css'; // tu CSS original, sin cambios (salvo la ruta de las fuentes)
import './styles/extras.css'; // pequeños ajustes para páginas separadas
import './styles/legal.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
