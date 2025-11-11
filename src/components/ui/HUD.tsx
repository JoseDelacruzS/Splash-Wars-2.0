import React from 'react';
// Importa los componentes hijos del HUD
import { LifeDisplay, TimerDisplay, AmmoAbilitiesDisplay, Crosshair } from './HUD_Elements';
// NOTA: Debes crear este hook en src/context/GameContext.tsx
import { useGameContext } from '../../context/GameContext'; 

export const HUD: React.FC = () => {
    // Obtener los datos del estado global del juego
    const { health, ammo, timer, abilities } = useGameContext(); 

    // Solo renderizar el HUD si la salud es > 0 (si el juego está activo)
    if (health <= 0) return null; 

    return (
        <div 
            id="hud" 
            className="absolute inset-0 pointer-events-none font-watermelon z-20"
        >
            <LifeDisplay value={health} />
            <TimerDisplay time={timer} />
            <AmmoAbilitiesDisplay ammo={ammo} abilities={abilities} />
            <Crosshair />
        </div>
    );
};