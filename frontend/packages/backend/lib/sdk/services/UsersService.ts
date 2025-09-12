/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchedUserSerRequest } from '../models/PatchedUserSerRequest';
import type { UserResetPwdSerRequest } from '../models/UserResetPwdSerRequest';
import type { UserSer } from '../models/UserSer';
import type { UserSerRequest } from '../models/UserSerRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * **Permissions:** `IsAuthenticated`
     *
     *
     * @returns UserSer
     * @throws ApiError
     */
    public static usersList(): CancelablePromise<Array<UserSer>> {
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
     * @returns UserSer
     * @throws ApiError
     */
    public static usersCreate(
        requestBody: UserSerRequest,
    ): CancelablePromise<UserSer> {
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
     * @returns UserSer
     * @throws ApiError
     */
    public static usersRetrieve(
        id: number,
    ): CancelablePromise<UserSer> {
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
     * @returns UserSer
     * @throws ApiError
     */
    public static usersUpdate(
        id: number,
        requestBody: UserSerRequest,
    ): CancelablePromise<UserSer> {
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
     * @returns UserSer
     * @throws ApiError
     */
    public static usersPartialUpdate(
        id: number,
        requestBody?: PatchedUserSerRequest,
    ): CancelablePromise<UserSer> {
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
     * **Permissions:** `IsAuthenticated` `IsSuperUser`
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
     * @returns UserSer
     * @throws ApiError
     */
    public static usersResetPasswordCreate(
        id: number,
        requestBody: UserResetPwdSerRequest,
    ): CancelablePromise<UserSer> {
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
     * @returns UserSer
     * @throws ApiError
     */
    public static usersMeRetrieve(): CancelablePromise<UserSer> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/me/',
        });
    }
}
