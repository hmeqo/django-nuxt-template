/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MediaService {
    /**
     * @param path
     * @param size
     * @returns string Media File
     * @throws ApiError
     */
    public static mediaRetrieve(
        path: string,
        size?: number,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/media/{path}',
            path: {
                'path': path,
            },
            query: {
                'size': size,
            },
        });
    }
}
