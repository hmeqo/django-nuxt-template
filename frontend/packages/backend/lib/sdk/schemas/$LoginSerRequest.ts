/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $LoginSerRequest = {
    properties: {
        username: {
            type: 'string',
            description: `Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.`,
            isRequired: true,
            maxLength: 150,
            minLength: 1,
            pattern: '^[\\w.@+-]+$',
        },
        password: {
            type: 'string',
            isRequired: true,
            maxLength: 32,
            minLength: 8,
            pattern: '^[\\w\\d`\\-=!@#$%^&*()_+[\\]{}():;\\\'",<.>/?\\\\|]{8,32}$',
        },
    },
} as const;
