
import React from 'react';
// Importamos los tipos de datos que definimos
import { type AmmoData, type AbilityData } from '../../types/GameTypes'; 

// --- 1. Life Display ---
const LifeDisplay: React.FC<{ value: number }> = ({ value }) => (
    <div className="absolute bottom-6 left-8 flex items-center bg-black bg-opacity-30 p-2 rounded-xl z-20">
        <div className="text-6xl text-white mr-auto font-watermelon-days">{value}</div>
        {/* Usar una imagen local de corazón */}
        <img 
            src="/assets/icons/heart.svg" 
            alt="Vida" 
            className="w-12 h-12 ml-4" 
        /> 
    </div>
);


// --- 2. Timer Display ---
const TimerDisplay: React.FC<{ time: number }> = ({ time }) => {
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <div 
            className="absolute top-5 left-1/2 transform -translate-x-1/2 
                       bg-cyan-600/40 p-3 px-10 rounded-full text-white text-3xl font-watermelon z-20"
        >
            {formatTime(time)}
        </div>
    );
};


// --- 3. Ability Icon ---
const AbilityIcon: React.FC<{ data: AbilityData }> = ({ data }) => (
    <div 
        className={`w-16 h-16 bg-black/60 rounded-xl relative transition duration-300 
                    ${data.isReady ? 'opacity-100' : 'opacity-40'} shadow-lg`}
    >
        <img 
            src={data.iconUrl} 
            alt={data.id} 
            className="w-full h-full p-1" 
        />
        <div 
            className="absolute bottom-1 right-1 bg-white/80 p-1 rounded-full text-xs font-bold text-black leading-none"
        >
            {data.key.toUpperCase()}
        </div>
    </div>
);


// --- 4. Ammo and Abilities Container ---
const AmmoAbilitiesDisplay: React.FC<{ ammo: AmmoData, abilities: AbilityData[] }> = ({ ammo, abilities }) => (
    <div className="absolute bottom-10 right-5 flex flex-col items-end gap-2 z-20">
        
        {/* Habilidades */}
        <div className="flex gap-2">
            {abilities.map((ability) => (
                <AbilityIcon key={ability.id} data={ability} />
            ))}
        </div>

        {/* Tarjeta de Munición */}
        <div className="flex bg-black bg-opacity-30 p-4 rounded-2xl relative w-80">
            {/* Splash de Agua (El contenedor del texto) */}
            <div 
                className="absolute w-[200px] h-[100px] -left-10 -top-6 z-10 bg-contain bg-no-repeat flex items-center justify-center"
                style={{ backgroundImage: `url('/assets/images/Splash.png')` }}
            >
                {/* Texto de munición */}
                <div className="text-5xl text-white pt-6 pl-10 font-watermelon-days">
                    {ammo.current}/{ammo.max}
                </div>
            </div>
            
            {/* Icono del arma (a la derecha) */}
            <img 
                src="/assets/icons/gun.svg" 
                alt="Arma" 
                className="w-20 h-20 ml-auto z-0" 
            />
        </div>
    </div>
);


// --- 5. Crosshair (Mira) ---
const Crosshair: React.FC = () => (
    <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40"
    >
        {/* Usar un icono de mira central simple */}
        <img 
            src="/assets/icons/crosshair.svg" 
            alt="Mira" 
            className="w-8 h-8 opacity-90" 
        />
    </div>
);

// Exportamos los subcomponentes
export { LifeDisplay, TimerDisplay, AmmoAbilitiesDisplay, Crosshair };