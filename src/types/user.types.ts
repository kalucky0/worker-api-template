import { z } from 'zod';

const permissions = [
    'read:users',
    'write:users',
    'read:tasks',
    'write:tasks',
] as const;

export type Permission = typeof permissions[number];

export const PermissionSchema = z.enum(permissions);

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