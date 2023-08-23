declare const OBJ: {
    AUTH_SYSTEM_ID: number;
    SYSTEM_CHINA_NAME: string;
    SYSTEM_US_NAME: string;
    SYSTEM_URL: string;
    authority: boolean;
    LOG_SYSTEM_SOURCE: number;
    APIS: {
        uploadMediaRoot: any;
        uploadRoot: any;
        flowRoot: any;
        root: any;
        authRoot: any;
    };
    SSO_LOGIN: boolean;
    PHONE_LOGIN: boolean;
    SUPER_ADMIN: string[];
    IS_DEV: boolean;
    USER_INFO_MOCK: boolean;
    PHONE_LOGGIN_PATH: string;
    SSO_PAGE_SERVICE: string;
    SSO_PAGE_URL: string;
    SSO_LOGOUT_PAGE_SERVICE: string;
    build: {
        IS_DEV: boolean;
        DEV: {};
        PROD: {};
        ENV: {
            SSO_LOGIN: boolean;
            PHONE_LOGIN: boolean;
        };
    };
};
export default OBJ;
