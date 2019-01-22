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
const api_request_1 = require("../../helpers/api-request");
class Project {
    constructor(token) {
        this.token = token;
    }
    register(login, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield api_request_1.apiRequest({
                    url: '/projectAccounts/create'
                });
            }
            catch (e) {
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    getStorage(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
}
exports.Project = Project;
//# sourceMappingURL=project.js.map