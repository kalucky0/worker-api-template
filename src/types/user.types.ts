import { z } from 'zod';

export type Permission =
    'read:users' |
    'write:users' |
    'read:tasks' |
    'write:tasks';

export const PermissionSchema = z.enum([
    'read:users',
    'write:users',
    'read:tasks',
    'write:tasks',
]);

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    permissions: Permission[];
    createdAt: string;
};

export type JwtPayload = {
    id: number;
    name: string;
    email: string;
    permissions: Permission[];
};