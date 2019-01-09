"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSocketIdWithNamespace(namespace, socketId) {
    return "/" + namespace + "#" + socketId;
}
exports.getSocketIdWithNamespace = getSocketIdWithNamespace;
