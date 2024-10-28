export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
 export interface Contact {
    id: number;
    name: string;
    type: string;
    latitude: number;
    longitude: number;
};