"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = require("./components/project/project");
const api_request_1 = require("./helpers/api-request");
exports.initProject = (clientId, clientSecret) => __awaiter(this, void 0, void 0, function* () {
    const res = yield api_request_1.apiRequest({
        url: `/auth/login/project`,
        method: 'POST',
        data: {
            clientId,
            clientSecret,
        },
    });
    const { token } = res.data;
    return new project_1.Project(token);
});
//# sourceMappingURL=index.js.map