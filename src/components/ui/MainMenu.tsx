import React from 'react';

// Componente reutilizable para los elementos del menú con el efecto CSS
const MenuItem: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <div 
    className="mb-12 text-[100px] text-white font-watermelon menu-item-effect"
    onClick={onClick}
  >
    {label}
  </div>
);

export const MainMenu: React.FC<{ onNavigate: (screen: 'LOBBY_SELECTION' | 'SETTINGS' | 'EXIT') => void }> = ({ onNavigate }) => {
  
  const backgroundStyle = {
    // Asegúrate que la ruta a tu imagen de fondo sea correcta
    backgroundImage: `url('/src/assets/images/Menu/Menu.png')`,
  };

  return (
    <div 
      className="absolute inset-0 bg-cover bg-center flex flex-col items-end justify-center pr-20 font-watermelon z-10"
      style={backgroundStyle}
    >
      <div className="text-4xl text-center">
        <MenuItem 
            label="INICIAR" 
            onClick={() => onNavigate('LOBBY_SELECTION')} 
        />
        <MenuItem 
            label="OPCIONES" 
            onClick={() => onNavigate('SETTINGS')} 
        />
        <MenuItem 
            label="SALIR" 
            onClick={() => onNavigate('EXIT')} 
        />
      </div>
    </div>
  );
};