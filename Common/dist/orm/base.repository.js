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
const typeorm_1 = require("typeorm");
class BaseRepository extends typeorm_1.Repository {
    findById(id) {
        const _super = Object.create(null, {
            findOne: { get: () => super.findOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.findOne.call(this, id);
        });
    }
    findManyWithPagination(query, { page, limit }) {
        const _super = Object.create(null, {
            findAndCount: { get: () => super.findAndCount }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const [data, count] = yield _super.findAndCount.call(this, {
                skip: (page - 1) * limit,
                take: limit,
                where: query,
            });
            console.log('Paginated result', data, count);
            return {
                data,
                itemsPerPage: limit,
                page,
                totalCount: count,
            };
        });
    }
}
exports.BaseRepository = BaseRepository;
