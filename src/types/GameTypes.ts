// Define la estructura de datos para la munición
export interface AmmoData {
    current: number; // Balas actuales
    max: number;     // Balas máximas
}

// Define la estructura de datos para una habilidad
export interface AbilityData {
    id: string;      // ID único
    key: string;     // Tecla de activación (ej: 'Q', 'E')
    iconUrl: string; // Ruta al ícono de la habilidad
    isReady: boolean; // Si está lista para usarse (cooldown)
}

// Define la estructura de datos para el estado del HUD/Juego
export interface GameContextData {
    health: number;             // Salud del jugador
    ammo: AmmoData;             // Estado de la munición
    timer: number;              // Tiempo restante del partido (segundos)
    abilities: AbilityData[];   // Lista de habilidades
    // Añadir más datos del juego aquí: Scoreboard, Latency, etc.
}