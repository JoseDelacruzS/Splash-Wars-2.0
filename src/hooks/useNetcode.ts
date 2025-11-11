import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export const useNetcode = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    // La URL del servidor local
    const newSocket = io('http://localhost:3000'); 
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      setIsHost(false);
      setRoomId(null);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const createRoom = () => {
    // Lógica para decirle al servidor que cree una sala (y tú eres el host)
    if (socket) {
      socket.emit('createRoom');
    }
  };

  const joinRoom = (id: string) => {
    // Lógica para unirse a una sala existente
    if (socket) {
      socket.emit('joinRoom', id);
    }
  };

  return { socket, isConnected, isHost, roomId, createRoom, joinRoom };
};
