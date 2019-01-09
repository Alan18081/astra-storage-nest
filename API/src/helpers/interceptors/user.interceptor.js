"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var websockets_1 = require("@nestjs/websockets");
var messages_enum_1 = require("../enums/messages.enum");
var UserInterceptor = /** @class */ (function () {
    function UserInterceptor(clientsStoreService) {
        this.clientsStoreService = clientsStoreService;
    }
    UserInterceptor.prototype.intercept = function (context, call$) {
        console.log('Start interceptor');
        var socketContext = context.switchToWs();
        var client = socketContext.getClient();
        var socket = this.clientsStoreService.getSocketById(client.client.id);
        console.log('Inside interceptor', socket);
        if (!socket) {
            throw new websockets_1.WsException(messages_enum_1.Messages.SOCKET_NOT_FOUND);
        }
        console.log('After interceptor');
        client.user = socket.user;
        return call$;
    };
    UserInterceptor = __decorate([
        common_1.Injectable()
    ], UserInterceptor);
    return UserInterceptor;
}());
exports.UserInterceptor = UserInterceptor;
