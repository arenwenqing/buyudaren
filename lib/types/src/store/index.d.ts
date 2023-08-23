import React from 'react';
export declare const Context: React.Context<any>;
export declare const initialState: {
    userInfoData: {
        diamondCount: number;
        goldCoinCount: number;
        user: {
            nickName: string;
            phoneNum: string;
            shareQrCodeUrl: string;
            userId: string;
        };
    };
};
export declare const reduxSlice: import("@reduxjs/toolkit").Slice<{
    userInfoData: {
        diamondCount: number;
        goldCoinCount: number;
        user: {
            nickName: string;
            phoneNum: string;
            shareQrCodeUrl: string;
            userId: string;
        };
    };
}, {
    setUserGoldAndDiamondInfo: (state: import("immer/dist/internal").WritableDraft<{
        userInfoData: {
            diamondCount: number;
            goldCoinCount: number;
            user: {
                nickName: string;
                phoneNum: string;
                shareQrCodeUrl: string;
                userId: string;
            };
        };
    }>, { payload }: {
        payload: any;
        type: string;
    }) => void;
}, "reduxSlice">;
export declare const setUserGoldAndDiamondInfo: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "reduxSlice/setUserGoldAndDiamondInfo">;
export declare const getUserInfo: (_params?: any) => (dispatch: any) => Promise<void>;
declare const _default: import("redux").Reducer<{
    userInfoData: {
        diamondCount: number;
        goldCoinCount: number;
        user: {
            nickName: string;
            phoneNum: string;
            shareQrCodeUrl: string;
            userId: string;
        };
    };
}, import("redux").AnyAction>;
export default _default;
