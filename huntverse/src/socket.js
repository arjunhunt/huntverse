import { io } from 'socket.io-client';

const hostname = window.location.hostname || 'localhost';
const URL = `http://${hostname}:5000`;
export const socket = io(URL, {
  autoConnect: false
});
