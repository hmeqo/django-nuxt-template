/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchedUserOut } from '../models/PatchedUserOut';
import type { UserIn } from '../models/UserIn';
import type { UserOut } from '../models/UserOut';
import type { UserResetPwdIn } from '../models/UserResetPwdIn';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * **Permissions:** `IsAuthenticated`
     *
     *
     * @returns UserOut
     * @throws ApiError
     */
    public static usersList(): CancelablePromise<Array<UserOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/',
        });
    }
    /**
     * **Permissions:** `IsAuthenticated`
     *
     *
     * @param requestBody
     * @returns UserOut
     * @throws ApiError
     */
    public static usersCreate(
        requestBody: UserIn,
    ): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * **Permissions:** `IsAuthenticated`
     *
     *
     * @param id A unique integer value identifying this User.
     * @returns UserOut
     * @throws ApiError
     */
    public static usersRetrieve(
        id: number,
    ): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * **Permissions:** `IsAuthenticated`
     *
     *
     * @param id A unique integer value identifying this User.
     * @param requestBody
     * @returns UserOut
     * @throws ApiError
     */
    public static usersUpdate(
        id: number,
        requestBody: UserOut,
    ): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * **Permissions:** `IsAuthenticated`
     *
     *
     * @param id A unique integer value identifying this User.
     * @param requestBody
     * @returns UserOut
     * @throws ApiError
     */
    public static usersPartialUpdate(
        id: number,
        requestBody?: PatchedUserOut,
    ): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/users/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * **Permissions:** `IsAuthenticated`
     *
     *
     * @param id A unique integer value identifying this User.
     * @returns void
     * @throws ApiError
     */
    public static usersDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/users/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * **Permissions:** `IsAuthenticated`
     *
     *
     * @param id A unique integer value identifying this User.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static usersResetPasswordCreate(
        id: number,
        requestBody: UserResetPwdIn,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/{id}/reset_password/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * **Permissions:** `IsAuthenticated` `IsAuthenticated`
     *
     *
     * @returns UserOut
     * @throws ApiError
     */
    public static usersMeRetrieve(): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/me/',
        });
    }
}
