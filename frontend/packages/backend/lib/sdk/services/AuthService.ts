/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginIn } from '../models/LoginIn';
import type { LoginStateOut } from '../models/LoginStateOut';
import type { UserOut } from '../models/UserOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @param requestBody
     * @returns UserOut
     * @throws ApiError
     */
    public static authLoginCreate(
        requestBody: LoginIn,
    ): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns LoginStateOut
     * @throws ApiError
     */
    public static authLoginStateRetrieve(): CancelablePromise<LoginStateOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/login_state/',
        });
    }
    /**
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
