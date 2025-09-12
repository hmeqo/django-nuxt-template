/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginSerRequest } from '../models/LoginSerRequest';
import type { LoginStateSer } from '../models/LoginStateSer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @param requestBody
     * @returns LoginStateSer
     * @throws ApiError
     */
    public static authLoginCreate(
        requestBody: LoginSerRequest,
    ): CancelablePromise<LoginStateSer> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns LoginStateSer
     * @throws ApiError
     */
    public static authLoginStateRetrieve(): CancelablePromise<LoginStateSer> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/login_state/',
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static authLogoutCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout/',
        });
    }
}
