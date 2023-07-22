"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientOptions = void 0;
const microservices_1 = require("@nestjs/microservices");
const createClientOptions = (queue, url) => {
    return {
        transport: microservices_1.Transport.RMQ,
        options: {
            queue,
            urls: [url],
        },
    };
};
exports.createClientOptions = createClientOptions;
