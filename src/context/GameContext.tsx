import React, { createContext, useContext, useState } from 'react';
import { type GameContextData } from '../types/GameTypes';

// --- 1. Datos iniciales del prototipo ---
const initialGameData: GameContextData = {
    health: 100,
    ammo: { current: 30, max: 30 },
    timer: 300, // 5 minutos
    abilities: [
        { id: 'dash', key: 'Q', iconUrl: '/assets/icons/ability_dash.svg', isReady: true },
        { id: 'heal', key: 'E', iconUrl: '/assets/icons/ability_heal.svg', isReady: false },
    ],
};

// --- 2. Crear el Contexto ---
// Usamos 'any' en el Setter para simplificar, pero idealmente se tiparía
const GameContext = createContext<[GameContextData, React.Dispatch<any>]>([initialGameData, () => { }]);

// --- 3. Crear el Proveedor (Provider) ---
export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Usaremos un simple estado para simular los datos del juego
    const state = useState(initialGameData);

    // NOTA: Aquí se añadiría la lógica real de actualización del juego

    return (
        <GameContext.Provider value={state}>
            {children}
        </GameContext.Provider>
    );
};

// --- 4. Crear el Hook para usar el Contexto ---
// Este es el hook que usará el HUD
export const useGameContext = () => useContext(GameContext)[0];

// Exporta el setter si es necesario para el juego
export const useGameContextSetter = () => useContext(GameContext)[1];