/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserSerRequest = {
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    password?: string;
    display_name?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    /**
     * Designates that this user has all permissions without explicitly assigning them.
     */
    is_superuser?: boolean;
    /**
     * Designates whether the user can log into this admin site.
     */
    is_staff?: boolean;
    /**
     * Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
     */
    is_active?: boolean;
};

