export enum CommunicationCodes {
    GET_USERS_LIST = '[UsersService] Get Users List',
    GET_USER = '[UsersService] Get User',
    GET_USER_BY_GOOGLE_ID = '[UsersService] Get User By Google Id',
    GET_USER_BY_ID = '[UsersService] Get User By ID',
    GET_USER_BY_EMAIL = '[UsersService] Get User By Email',
    CREATE_USER = '[UsersService] Create User',
    CREATE_USER_BY_GOOGLE = '[UsersService] Get User By Google',
    UPDATE_USER = '[UsersService] Update User',
    REMOVE_USER = '[UsersService] Remove User',
    RESET_USER_PASSWORD = '[UsersService] Reset User Password',

    LOGIN = '[AuthService] Login User',
    LOGIN_PROJECT = '[AuthService] Login Project',
    AUTH_PROJECT_BY_TOKEN = '[AuthService] Auth Project By Token',

    GET_PROJECTS_LIST = '[ProjectsService] Get Projects List',
    GET_PROJECTS_LIST_BY_USER = '[ProjectsService] Get Projects By User',
    GET_PROJECT = '[ProjectsService] Get Project',
    GET_PROJECT_BY_CLIENT_INFO = '[ProjectsService] Get Project By Client Info',
    CREATE_PROJECT = '[ProjectsService] Create Project',
    UPDATE_PROJECT = '[ProjectsService] Update Project',
    REMOVE_PROJECT = '[ProjectsService] Remove Project',

    GET_PROJECT_AND_ACCOUNT = '[ProjectsService] Get Project And Account',

    GET_STORAGES_LIST = '[ProjectsService] Get Storages List',
    GET_STORAGE = '[ProjectsService] Get Storage',
    GET_STORAGE_BY_PATH = '[ProjectsService] Get Storage By Path',
    CREATE_STORAGE = '[ProjectsService] Create Storage',
    UPDATE_STORAGE = '[ProjectsService] Update Storage',
    UPDATE_STORAGE_DATA = '[DataService] Update Storage Data',
    REMOVE_STORAGE = '[ProjectsService] Remove Storage',
    CHANGE_STORAGE_TYPE = '[ProjectsService] Change Storage Type',

    GET_STORAGE_RECORDS_LIST = '[DataService] Get Storage Records List',
    GET_STORAGE_RECORD = '[DataService] Get Storage Record',
    CREATE_STORAGE_RECORD = '[DataService] Create Storage Record',
    UPDATE_STORAGE_RECORD = '[DataService] Update Storage Record',
    REMOVE_STORAGE_RECORD = '[DataService] Remove Storage Record',
    REMOVE_STORAGE_RECORDS_LIST_BY_STORAGE = '[DataService] Remove Storage Records List By Storage',

    LOGIN_PROJECT_ACCOUNT = '[ProjectsService] Login Project Account',
    GET_PROJECT_ACCOUNTS_LIST = '[ProjectsService] Get Project Accounts List',
    GET_PROJECT_ACCOUNT = '[ProjectsService] Get Project Account',
    GET_PROJECT_ACCOUNT_BY_EMAIL = '[ProjectsService] Get Project Account By Email',
    CREATE_PROJECT_ACCOUNT = '[ProjectsService] Create Project Account',
    UPDATE_PROJECT_ACCOUNT = '[ProjectsService] Update Project Account',
    REMOVE_PROJECT_ACCOUNT = '[ProjectsService] Remove Project Account',
    REMOVE_PROJECT_ACCOUNT_BY_TOKEN = '[ProjectsService] Remove Project Account By Project Owner',

    CREATE_REFRESH_TOKEN = '[UsersService] Create Refresh Token',
    GET_REFRESH_TOKEN_BY_TOKEN = '[UsersService] Get Refresh Token By Token',
    REMOVE_REFRESH_TOKEN = '[UsersService] Remove Refresh Token',

    EXCHANGE_TOKEN = '[AuthService] Exchange Token',

    GET_USER_HASH_BY_HASH = '[UsersService] Get User Hash By Hash',

    SEND_RESET_PASSWORD_EMAIL = '[EmailsService] Send Reset Password Email',

    VERIFY_RESET_PASSWORD_HASH = '[UsersService] Verify Reset Password Hash',
    SET_NEW_PASSWORD = '[UsersService] Set New Password',
    CHANGE_USER_PASSWORD = '[UsersService] Change User Password',

    SDK_GET_PROJECT_ACCOUNTS_LIST = '{SDK} [ProjectsService] Get Project Accounts List',
    SDK_GET_PROJECT_ACCOUNT = '{SDK} [ProjectsService] Get Project Account',
    SDK_REMOVE_PROJECT_ACCOUNT = '{SDK} [ProjectsService] Remove Project Account',
    SDK_GET_STORAGE_RECORDS_LIST = '{SDK} [DataService] Get Storage Records List',
    SDK_GET_STORAGE_RECORD = '{SDK} [DataService] Get Storage Record',
    SDK_CREATE_STORAGE_RECORD = '{SDK} [DataService] Create Storage Record',
    SDK_UPDATE_STORAGE_RECORD = '{SDK} [DataService] Update Storage Record',
    SDK_REMOVE_STORAGE_RECORD = '{SDK} [DataService] Remove Storage Record',
    SDK_REMOVE_STORAGE_RECORDS_LIST = '{SDK} [DataService] Remove Storage Records List',

    SOCKET_CREATED_STORAGE_RECORD = '[SocketsService] Created Storage Record',
    SOCKET_UPDATED_STORAGE_RECORD = '[SocketsService] Update Storage Record',
    SOCKET_REMOVED_STORAGE_RECORD = '[SocketsService] Removed Storage Record',
}