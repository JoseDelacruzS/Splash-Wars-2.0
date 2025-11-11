// src/components/ui/LobbySelection.tsx

import React, { useState } from 'react';
import { useNetcode } from '../../hooks/useNetcode'; 
import { GameMode } from '../../types/GameTypes'; // Necesitas definir este tipo

// Componente para seleccionar Mapa/Modo y manejar el Lobby
export const LobbySelection: React.FC<{ onStartGame: (mode: GameMode, map: string) => void }> = ({ onStartGame }) => {
    const { isConnected, roomId, isHost, createRoom, joinRoom } = useNetcode();
    
    // Estados locales para la UI
    const [selectedMap, setSelectedMap] = useState('Arena1');
    const [selectedMode, setSelectedMode] = useState<GameMode>('TDM'); // Team Deathmatch (TDM)
    const [joinInput, setJoinInput] = useState('');

    const handleJoin = () => {
        if (joinInput) {
            joinRoom(joinInput);
        }
    };

    const handleStart = () => {
        if (isHost && roomId) {
            // Lógica para enviar el comando de inicio a todos los clientes a través del servidor
            // Aquí llamarías a onStartGame() y tu juego 3D se iniciaría.
            console.log(`[LOBBY] HOST inicia juego en sala ${roomId}`);
            onStartGame(selectedMode, selectedMap);
        }
    };

    // Estilo de fondo (ejemplo, debes tener tu imagen)
    const backgroundStyle = {
        backgroundImage: `url('/assets/images/Menu/Modo.png')`,
    };

    if (roomId) {
        // *** VISTA DE LOBBY CREADO/UNIDO ***
        return (
            <div 
                className="absolute inset-0 bg-cover bg-center flex items-center justify-center p-8 font-watermelon text-white z-10"
                style={backgroundStyle}
            >
                <div className="bg-black/70 p-10 rounded-xl text-center">
                    <h1 className="text-6xl mb-4 text-stroke-yellow">SALA CREADA</h1>
                    <p className="text-3xl mb-8">ID de Sala: **{roomId}**</p>
                    
                    {/* Botón de inicio solo visible para el HOST */}
                    {isHost && (
                        <button 
                            onClick={handleStart}
                            className="bg-green-500 hover:bg-green-700 text-white text-3xl py-3 px-8 rounded-full transition duration-200"
                        >
                            INICIAR PARTIDA
                        </button>
                    )}
                    {!isHost && (
                        <p className="text-xl">Esperando a que el Host inicie el juego...</p>
                    )}
                </div>
            </div>
        );
    }


    // *** VISTA DE SELECCIÓN DE MAPA/MODO/CREAR/UNIRSE ***
    return (
        <div 
            className="absolute inset-0 bg-cover bg-center flex items-center justify-center p-8 font-watermelon text-white z-10"
            style={backgroundStyle}
        >
            <div className="bg-black/70 p-10 rounded-xl">
                <h1 className="text-7xl mb-8 text-stroke-yellow">ESCOGE MAPA</h1>
                <div className="flex space-x-4 mb-10 justify-center">
                    {['Arena1', 'Arena2', 'Arena3'].map(map => (
                        <div
                            key={map}
                            onClick={() => setSelectedMap(map)}
                            className={`w-32 h-32 bg-gray-600 border-4 rounded-xl cursor-pointer hover:scale-110 transition duration-200 
                                        ${selectedMap === map ? 'border-blue-500 scale-105' : 'border-yellow-400'}`}
                        >
                            <p className="text-lg pt-1 text-center">{map}</p>
                            {/* [Image of Map Thumbnail] */}
                        </div>
                    ))}
                </div>

                <h1 className="text-7xl mb-8 text-stroke-yellow">MODO DE JUEGO</h1>
                <div className="flex space-x-8 mb-12 justify-center">
                    {['TDM', 'FFA'].map(mode => (
                        <div
                            key={mode}
                            onClick={() => setSelectedMode(mode as GameMode)}
                            className={`text-5xl cursor-pointer hover:scale-125 transition duration-200
                                        ${selectedMode === mode ? 'text-blue-500' : 'text-white text-stroke-yellow'}`}
                        >
                            {mode}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center space-x-8 mt-10">
                    {/* Botón CREAR SALA */}
                    <button 
                        onClick={createRoom}
                        disabled={!isConnected}
                        className="bg-green-500 text-white text-4xl py-3 px-8 rounded-full shadow-lg hover:scale-110 transition duration-200 disabled:bg-gray-500"
                    >
                        CREAR SALA
                    </button>
                    
                    {/* Unirse a Sala */}
                    <input
                        type="text"
                        placeholder="ID de Sala"
                        value={joinInput}
                        onChange={(e) => setJoinInput(e.target.value)}
                        className="bg-gray-200 text-black text-2xl p-3 rounded-xl w-40"
                    />
                    <button 
                        onClick={handleJoin}
                        disabled={!isConnected || joinInput.length === 0}
                        className="bg-blue-500 text-white text-4xl py-3 px-8 rounded-full shadow-lg hover:scale-110 transition duration-200 disabled:bg-gray-500"
                    >
                        UNIRSE
                    </button>
                </div>
                {!isConnected && <p className="text-red-500 mt-4 text-center">Conectando al servidor...</p>}
            </div>
        </div>
    );
};