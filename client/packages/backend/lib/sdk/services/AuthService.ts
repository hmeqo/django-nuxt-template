/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginIn } from '../models/LoginIn';
import type { LoginStateOut } from '../models/LoginStateOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * 登录
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static authLoginCreate(
        requestBody: LoginIn,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 登录信息
     * @returns LoginStateOut
     * @throws ApiError
     */
    public static authLoginstateRetrieve(): CancelablePromise<LoginStateOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/loginstate/',
        });
    }
    /**
     * 退出登录
     * @returns void
     * @throws ApiError
     */
    public static authLogoutCreate(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout/',
        });
    }
}
