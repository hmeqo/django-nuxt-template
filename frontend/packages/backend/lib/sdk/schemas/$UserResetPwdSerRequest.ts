/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserResetPwdSerRequest = {
    properties: {
        password: {
            type: 'string',
            isRequired: true,
            maxLength: 32,
            minLength: 8,
            pattern: '^[\\w\\d`\\-=!@#$%^&*()_+[\\]{}():;\\\'",<.>/?\\\\|]{8,32}$',
        },
    },
} as const;
