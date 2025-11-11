import React, { useState } from 'react';

export const SettingsMenu: React.FC<{ onNavigate: (screen: 'MAIN_MENU') => void }> = ({ onNavigate }) => {
    // Usar estado local para los valores de los sliders
    const [volume, setVolume] = useState(50);
    const [music, setMusic] = useState(50);
    const [effects, setEffects] = useState(50);

    const backgroundStyle = {
        // Asegúrate que la ruta a tu imagen de fondo sea correcta
        backgroundImage: `url('/assets/images/Menu/Opciones.png')`,
    };

    const handleAccept = () => {
        // Lógica para guardar los settings (ej. en localStorage)
        console.log("Settings Guardados:", { volume, music, effects });
        onNavigate('MAIN_MENU');
    };

    return (
        <div 
            className="absolute inset-0 bg-cover bg-center flex flex-col items-center pt-36 z-10 font-watermelon-days"
            style={backgroundStyle}
        >
            <div className="font-watermelon text-white text-7xl mb-8">
                AJUSTES
            </div>
            
            <div className="bg-[#fcdd43] rounded-[2rem] p-14 shadow-2xl border-[6px] border-[#fdcb02] w-[900px] max-w-[90%]">
                
                {/* Slider General */}
                <div className="flex items-center justify-between mb-4">
                    <div className="text-5xl text-white whitespace-nowrap font-watermelon-days">VOLUMEN GENERAL</div>
                    <input 
                        type="range" 
                        className="w-[60%]" 
                        min="0" max="100" 
                        value={volume} 
                        onChange={(e) => setVolume(parseInt(e.target.value))}
                    />
                </div>

                {/* Slider Musica */}
                <div className="flex items-center justify-between mb-4">
                    <div className="text-5xl text-white whitespace-nowrap font-watermelon-days">MUSICA</div>
                    <input 
                        type="range" 
                        className="w-[60%]" 
                        min="0" max="100" 
                        value={music} 
                        onChange={(e) => setMusic(parseInt(e.target.value))}
                    />
                </div>

                {/* Slider Efectos */}
                <div className="flex items-center justify-between mb-4">
                    <div className="text-5xl text-white whitespace-nowrap font-watermelon-days">EFECTOS</div>
                    <input 
                        type="range" 
                        className="w-[60%]" 
                        min="0" max="100" 
                        value={effects} 
                        onChange={(e) => setEffects(parseInt(e.target.value))}
                    />
                </div>
            </div>

            <div className="mt-40 flex space-x-12">
                <button 
                    className="button bg-[#7ab858] text-white text-4xl py-4 px-12 rounded-2xl shadow-lg accept-button-effect"
                    onClick={handleAccept}
                >
                    ACEPTAR
                </button>
                <button 
                    className="button bg-[#ff5757] text-white text-4xl py-4 px-12 rounded-2xl shadow-lg accept-button-effect"
                    onClick={() => onNavigate('MAIN_MENU')}
                >
                    REGRESAR
                </button>
            </div>
        </div>
    );
};