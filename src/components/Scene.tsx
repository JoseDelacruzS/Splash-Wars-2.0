import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber'; // El contenedor 3D de R3F
import { Physics } from '@react-three/cannon'; // El contenedor de la física
import { GameContextProvider } from '../context/GameContext'; // El proveedor de estado

// Importamos los componentes de UI que creamos
import { MainMenu } from './ui/MainMenu';
import { SettingsMenu } from './ui/SettingsMenu';
import { HUD } from './ui/HUD';

// NOTA: Debes crear estos componentes de la escena 3D más adelante
import { Environment } from './game/Environment'; 
import { Player } from './game/Player'; 
import { Arena } from './game/Arena'; 


// --- Definición de las pantallas ---
type Screen = 'MAIN_MENU' | 'LOBBY_SELECTION' | 'SETTINGS' | 'PLAYING' | 'EXIT';

export const Scene: React.FC = () => {
    // Estado para controlar qué pantalla mostrar
    const [currentScreen, setCurrentScreen] = useState<Screen>('MAIN_MENU');

    // Función de navegación simple
    const handleNavigation = (screen: Screen) => {
        if (screen === 'EXIT') {
            console.log("Cerrando la aplicación...");
            // Lógica real de salida si fuera una aplicación de escritorio
        } else {
            setCurrentScreen(screen);
        }
    };

    // --- Renderizado de la UI 2D condicional ---
    const renderUI = () => {
        switch (currentScreen) {
            case 'MAIN_MENU':
                return <MainMenu onNavigate={handleNavigation} />;
            case 'SETTINGS':
                return <SettingsMenu onNavigate={handleNavigation} />;
            // LOBBY_SELECTION será el próximo componente
            case 'LOBBY_SELECTION': 
                return (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 text-white text-4xl">
                        [LOBBY_SELECTION - Pendiente]
                        <button className="bg-blue-600 p-4" onClick={() => handleNavigation('MAIN_MENU')}>Volver</button>
                    </div>
                );
            case 'PLAYING':
                return <HUD />;
            default:
                return null;
        }
    };

    // --- El Canvas 3D ---
    const renderGame = () => (
        // El Physics provider encapsula todos los objetos con física de Cannon-es
        <Physics gravity={[0, -9.81, 0]}> 
            {/* Elementos de la escena 3D */}
            <Environment />
            <Arena />
            {currentScreen === 'PLAYING' && <Player isLocal={true} />}
            {/* Aquí irían los otros jugadores remotos */}
        </Physics>
    );

    return (
        // GameContextProvider provee los datos del juego a toda la aplicación
        <GameContextProvider>
            {/* El lienzo 3D ocupa toda la pantalla */}
            <div className="w-screen h-screen">
                <Canvas>
                    {renderGame()}
                </Canvas>
            </div>
            
            {/* La UI 2D (Menús y HUD) se renderiza sobre el Canvas */}
            {renderUI()}
        </GameContextProvider>
    );
};