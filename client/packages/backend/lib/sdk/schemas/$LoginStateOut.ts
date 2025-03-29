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
            isRequired: true,
            isNullable: true,
        },
    },
} as const;
