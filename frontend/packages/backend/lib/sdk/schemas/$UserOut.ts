/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserOut = {
    properties: {
        id: {
            type: 'number',
            isReadOnly: true,
            isRequired: true,
        },
        username: {
            type: 'string',
            description: `Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.`,
            isRequired: true,
            maxLength: 150,
            pattern: '^[\\w.@+-]+$',
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
        is_active: {
            type: 'boolean',
            description: `Designates whether this user should be treated as active. Unselect this instead of deleting accounts.`,
        },
        is_superuser: {
            type: 'boolean',
            description: `Designates that this user has all permissions without explicitly assigning them.`,
        },
        is_staff: {
            type: 'boolean',
            description: `Designates whether the user can log into this admin site.`,
        },
        roles: {
            type: 'array',
            contains: {
                type: 'UserRole',
            },
            isRequired: true,
        },
    },
} as const;
