"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@astra/common");
const typeorm_1 = require("typeorm");
let ProjectAccount = class ProjectAccount extends common_1.BaseEntity {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProjectAccount.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], ProjectAccount.prototype, "login", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.Index(),
    typeorm_1.Unique('email'),
    __metadata("design:type", String)
], ProjectAccount.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProjectAccount.prototype, "password", void 0);
__decorate([
    typeorm_1.PrimaryColumn('integer'),
    __metadata("design:type", Number)
], ProjectAccount.prototype, "projectId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], ProjectAccount.prototype, "deletedAt", void 0);
ProjectAccount = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], ProjectAccount);
exports.ProjectAccount = ProjectAccount;
//# sourceMappingURL=project-account.entity.js.map