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
class Storage {
    constructor(projectToken, path) {
        this.projectToken = projectToken;
        this.path = path;
    }
    findMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    findManyWithPagination(query, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    createOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    removeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
}
exports.Storage = Storage;
//# sourceMappingURL=storage.js.map