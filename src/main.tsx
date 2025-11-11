import React from 'react';
import ReactDOM from 'react-dom/client';
import { Scene } from './components/Scene'; // Importamos el componente de escena
import './index.css'; // Importamos los estilos globales, incluyendo Tailwind y fuentes

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* El componente Scene manejará tanto la vista 3D (Canvas) 
      como el manejo de estado y la UI 2D (Menús, HUD).
    */}
    <Scene />
  </React.StrictMode>,
);