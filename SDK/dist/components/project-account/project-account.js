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
class ProjectAccount {
    constructor(token) {
        this.token = token;
    }
    getProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.ProjectAccount = ProjectAccount;
//# sourceMappingURL=project-account.js.map