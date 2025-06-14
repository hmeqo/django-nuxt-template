/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $LoginStateSer = {
    properties: {
        user: {
            type: 'all-of',
            contains: [{
                type: 'UserSer',
            }],
            isReadOnly: true,
            isRequired: true,
        },
        expires: {
            type: 'string',
            isReadOnly: true,
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
