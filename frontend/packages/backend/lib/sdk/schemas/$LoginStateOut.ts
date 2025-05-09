/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $LoginStateOut = {
    properties: {
        user: {
            type: 'all-of',
            contains: [{
                type: 'UserOut',
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
