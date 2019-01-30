"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("../config");
exports.createClientOptions = (queue) => {
    return {
        transport: microservices_1.Transport.RMQ,
        options: {
            queue,
            urls: [config_1.RABBIT_MQ_URL],
        },
    };
};
