/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AuthStateSer = {
    properties: {
        user: {
            type: 'all-of',
            contains: [{
                type: 'UserSer',
            }],
            isReadOnly: true,
            isRequired: true,
        },
    },
} as const;
