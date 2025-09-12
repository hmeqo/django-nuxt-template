/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PatchedUserSerRequest = {
    properties: {
        username: {
            type: 'string',
            description: `Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.`,
            maxLength: 150,
            minLength: 1,
            pattern: '^[\\w.@+-]+$',
        },
        password: {
            type: 'string',
            maxLength: 32,
            minLength: 8,
            pattern: '^[\\w\\d`\\-=!@#$%^&*()_+[\\]{}():;\\\'",<.>/?\\\\|]{8,32}$',
        },
        display_name: {
            type: 'string',
            maxLength: 150,
        },
        first_name: {
            type: 'string',
            maxLength: 150,
        },
        last_name: {
            type: 'string',
            maxLength: 150,
        },
        email: {
            type: 'string',
            format: 'email',
            maxLength: 254,
        },
        is_superuser: {
            type: 'boolean',
            description: `Designates that this user has all permissions without explicitly assigning them.`,
        },
        is_staff: {
            type: 'boolean',
            description: `Designates whether the user can log into this admin site.`,
        },
        is_active: {
            type: 'boolean',
            description: `Designates whether this user should be treated as active. Unselect this instead of deleting accounts.`,
        },
    },
} as const;
