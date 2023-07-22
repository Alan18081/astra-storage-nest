"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationCodes = void 0;
var CommunicationCodes;
(function (CommunicationCodes) {
    CommunicationCodes["GET_USERS_LIST"] = "[UsersService] Get Users List";
    CommunicationCodes["GET_USER"] = "[UsersService] Get User";
    CommunicationCodes["GET_USER_BY_GOOGLE_ID"] = "[UsersService] Get User By Google Id";
    CommunicationCodes["GET_USER_BY_ID"] = "[UsersService] Get User By ID";
    CommunicationCodes["GET_USER_BY_EMAIL"] = "[UsersService] Get User By Email";
    CommunicationCodes["CREATE_USER"] = "[UsersService] Create User";
    CommunicationCodes["CREATE_USER_BY_GOOGLE"] = "[UsersService] Get User By Google";
    CommunicationCodes["UPDATE_USER"] = "[UsersService] Update User";
    CommunicationCodes["REMOVE_USER"] = "[UsersService] Remove User";
    CommunicationCodes["RESET_USER_PASSWORD"] = "[UsersService] Reset User Password";
    CommunicationCodes["LOGIN"] = "[AuthService] Login User";
    CommunicationCodes["LOGIN_BY_GOOGLE"] = "[AuthService] Login User By Google";
    CommunicationCodes["LOGIN_PROJECT"] = "[AuthService] Login Project";
    CommunicationCodes["AUTH_PROJECT_BY_TOKEN"] = "[AuthService] Auth Project By Token";
    CommunicationCodes["GET_PROJECTS_LIST"] = "[ProjectsService] Get Projects List";
    CommunicationCodes["GET_PROJECTS_LIST_BY_USER"] = "[ProjectsService] Get Projects By User";
    CommunicationCodes["GET_PROJECT"] = "[ProjectsService] Get Project";
    CommunicationCodes["GET_PROJECT_BY_CLIENT_INFO"] = "[ProjectsService] Get Project By Client Info";
    CommunicationCodes["CREATE_PROJECT"] = "[ProjectsService] Create Project";
    CommunicationCodes["UPDATE_PROJECT"] = "[ProjectsService] Update Project";
    CommunicationCodes["REMOVE_PROJECT"] = "[ProjectsService] Remove Project";
    CommunicationCodes["GET_PROJECT_AND_ACCOUNT"] = "[ProjectsService] Get Project And Account";
    CommunicationCodes["GET_STORAGES_LIST"] = "[ProjectsService] Get Storages List";
    CommunicationCodes["GET_STORAGE"] = "[ProjectsService] Get Storage";
    CommunicationCodes["GET_STORAGE_BY_PATH"] = "[ProjectsService] Get Storage By Path";
    CommunicationCodes["CREATE_STORAGE"] = "[ProjectsService] Create Storage";
    CommunicationCodes["UPDATE_STORAGE"] = "[ProjectsService] Update Storage";
    CommunicationCodes["UPDATE_STORAGE_DATA"] = "[DataService] Update Storage Data";
    CommunicationCodes["REMOVE_STORAGE"] = "[ProjectsService] Remove Storage";
    CommunicationCodes["CHANGE_STORAGE_TYPE"] = "[ProjectsService] Change Storage Type";
    CommunicationCodes["GET_STORAGE_RECORDS_LIST"] = "[DataService] Get Storage Records List";
    CommunicationCodes["GET_STORAGE_RECORD"] = "[DataService] Get Storage Record";
    CommunicationCodes["CREATE_STORAGE_RECORD"] = "[DataService] Create Storage Record";
    CommunicationCodes["UPDATE_STORAGE_RECORD"] = "[DataService] Update Storage Record";
    CommunicationCodes["REMOVE_STORAGE_RECORD"] = "[DataService] Remove Storage Record";
    CommunicationCodes["REMOVE_STORAGE_RECORDS_LIST_BY_STORAGE"] = "[DataService] Remove Storage Records List By Storage";
    CommunicationCodes["LOGIN_PROJECT_ACCOUNT"] = "[ProjectsService] Login Project Account";
    CommunicationCodes["GET_PROJECT_ACCOUNTS_LIST"] = "[ProjectsService] Get Project Accounts List";
    CommunicationCodes["GET_PROJECT_ACCOUNT"] = "[ProjectsService] Get Project Account";
    CommunicationCodes["GET_PROJECT_ACCOUNT_BY_EMAIL"] = "[ProjectsService] Get Project Account By Email";
    CommunicationCodes["CREATE_PROJECT_ACCOUNT"] = "[ProjectsService] Create Project Account";
    CommunicationCodes["UPDATE_PROJECT_ACCOUNT"] = "[ProjectsService] Update Project Account";
    CommunicationCodes["REMOVE_PROJECT_ACCOUNT"] = "[ProjectsService] Remove Project Account";
    CommunicationCodes["REMOVE_PROJECT_ACCOUNT_BY_TOKEN"] = "[ProjectsService] Remove Project Account By Project Owner";
    CommunicationCodes["CREATE_REFRESH_TOKEN"] = "[UsersService] Create Refresh Token";
    CommunicationCodes["GET_REFRESH_TOKEN_BY_TOKEN"] = "[UsersService] Get Refresh Token By Token";
    CommunicationCodes["REMOVE_REFRESH_TOKEN"] = "[UsersService] Remove Refresh Token";
    CommunicationCodes["EXCHANGE_TOKEN"] = "[AuthService] Exchange Token";
    CommunicationCodes["GET_USER_HASH_BY_HASH"] = "[UsersService] Get User Hash By Hash";
    CommunicationCodes["SEND_RESET_PASSWORD_EMAIL"] = "[EmailsService] Send Reset Password Email";
    CommunicationCodes["VERIFY_RESET_PASSWORD_HASH"] = "[UsersService] Verify Reset Password Hash";
    CommunicationCodes["SET_NEW_PASSWORD"] = "[UsersService] Set New Password";
    CommunicationCodes["CHANGE_USER_PASSWORD"] = "[UsersService] Change User Password";
    CommunicationCodes["SDK_GET_PROJECT_ACCOUNTS_LIST"] = "{SDK} [ProjectsService] Get Project Accounts List";
    CommunicationCodes["SDK_GET_PROJECT_ACCOUNT"] = "{SDK} [ProjectsService] Get Project Account";
    CommunicationCodes["SDK_REMOVE_PROJECT_ACCOUNT"] = "{SDK} [ProjectsService] Remove Project Account";
    CommunicationCodes["SDK_GET_STORAGE_RECORDS_LIST"] = "{SDK} [DataService] Get Storage Records List";
    CommunicationCodes["SDK_GET_STORAGE_RECORD"] = "{SDK} [DataService] Get Storage Record";
    CommunicationCodes["SDK_CREATE_STORAGE_RECORD"] = "{SDK} [DataService] Create Storage Record";
    CommunicationCodes["SDK_UPDATE_STORAGE_RECORD"] = "{SDK} [DataService] Update Storage Record";
    CommunicationCodes["SDK_REMOVE_STORAGE_RECORD"] = "{SDK} [DataService] Remove Storage Record";
    CommunicationCodes["SDK_REMOVE_STORAGE_RECORDS_LIST"] = "{SDK} [DataService] Remove Storage Records List";
    CommunicationCodes["SOCKET_CREATED_STORAGE_RECORD"] = "[SocketsService] Created Storage Record";
    CommunicationCodes["SOCKET_UPDATED_STORAGE_RECORD"] = "[SocketsService] Update Storage Record";
    CommunicationCodes["SOCKET_REMOVED_STORAGE_RECORD"] = "[SocketsService] Removed Storage Record";
})(CommunicationCodes || (exports.CommunicationCodes = CommunicationCodes = {}));
