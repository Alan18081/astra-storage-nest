import * as SocketIOClient from 'socket.io-client';

export function handle(socket: SocketIOClient.Socket, eventName: string) {
  return new Promise((resolve, reject) => {
    socket.on(eventName, resolve);
  });
};