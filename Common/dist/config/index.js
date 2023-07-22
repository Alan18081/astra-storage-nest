"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataServiceConfig = exports.EmailsServiceConfig = exports.AuthServiceConfig = exports.ProjectsServiceConfig = exports.UsersServiceConfig = void 0;
const UsersServiceConfig = require("./users-service");
exports.UsersServiceConfig = UsersServiceConfig;
const ProjectsServiceConfig = require("./projects-service");
exports.ProjectsServiceConfig = ProjectsServiceConfig;
const AuthServiceConfig = require("./auth-service");
exports.AuthServiceConfig = AuthServiceConfig;
const EmailsServiceConfig = require("./emails-service");
exports.EmailsServiceConfig = EmailsServiceConfig;
const DataServiceConfig = require("./data-service");
exports.DataServiceConfig = DataServiceConfig;
__exportStar(require("./common"), exports);
