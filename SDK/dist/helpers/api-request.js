"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const config_1 = require("../config");
function apiRequest(config) {
    return axios_1.default.create({
        baseURL: config_1.API_URL,
    }).request(config);
}
exports.apiRequest = apiRequest;
//# sourceMappingURL=api-request.js.map