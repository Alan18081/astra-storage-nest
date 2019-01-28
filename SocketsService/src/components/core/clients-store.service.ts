import { Injectable } from '@nestjs/common';
import { Socket } from '../../helpers/interfaces/socket';

@Injectable()
export class ClientsStoreService {

  private sockets: Map<string, Socket> = new Map();
  private userIdsToSocketIds: Map<number, string> = new Map();
  private socketIdsToUserIds: Map<string, number> = new Map();

  getSocketById(socketId: string): Socket | undefined {
    const userId = this.socketIdsToUserIds.get(socketId);
    if(userId) {
      return this.sockets.get(JSON.stringify({ userId, socketId }));
    }
  }

  getSocketByUserId(userId: number): Socket | undefined {
    const socketId = this.userIdsToSocketIds.get(userId);
    if (socketId) {
      return this.sockets.get(JSON.stringify({ userId, socketId }));
    }
  }

  addSocket(socket: Socket): void {
    this.userIdsToSocketIds.set(socket.user.id, socket.id);
    this.socketIdsToUserIds.set(socket.id, socket.user.id);
    this.sockets.set(JSON.stringify({ userId: socket.user.id, socketId: socket.id }), socket);
  }

  removeSocket(socketId: string): void {
    const userId = this.socketIdsToUserIds.get(socketId);
    if (userId) {
      this.userIdsToSocketIds.delete(userId);
    }
    this.socketIdsToUserIds.delete(socketId);
    this.sockets.delete(JSON.stringify({ socketId, userId }));
  }

}