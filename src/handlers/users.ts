import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import { createUser, deleteUser, getUser, getUsers, updateUser } from '../database';
import { database, permissions } from '../middleware';
import { PermissionSchema } from '../types';
import { hashPassword } from '../utils';

const app = new Hono();

app.get(
    '/',
    permissions([
        'read:users',
    ]),
    zValidator(
        'query',
        z.object({
            limit: z.number({ coerce: true }).optional(),
            offset: z.number({ coerce: true }).optional(),
        }),
    ),
    database,
    async (c) => {
        const users = await getUsers(c.var.db);
        return c.json(users);
    },
);

app.get(
    '/:id',
    permissions([
        'read:users',
    ]),
    zValidator(
        'param',
        z.object({
            id: z.number({ coerce: true }),
        }),
    ),
    database,
    async (c) => {
        const { id } = c.req.valid('param');
        const user = await getUser(c.var.db, id);
        return c.json(user);
    },
);

app.post(
    '/',
    permissions([
        'write:users',
    ]),
    zValidator(
        'json',
        z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
            permissions: z.array(PermissionSchema),
        }),
    ),
    database,
    async (c) => {
        const { name, email, password, permissions } = c.req.valid('json');
        const user = await createUser(c.var.db, {
            name,
            email,
            password: await hashPassword(password),
            permissions,
        });
        return c.json(user);
    },
);

app.put(
    '/:id',
    permissions([
        'write:users',
    ]),
    zValidator(
        'param',
        z.object({
            id: z.number({ coerce: true }),
        }),
    ),
    zValidator(
        'json',
        z.object({
            name: z.string().optional(),
            email: z.string().email().optional(),
            password: z.string().optional(),
            permissions: z.array(PermissionSchema).optional(),
        }),
    ),
    database,
    async (c) => {
        const { id } = c.req.valid('param');
        const data = c.req.valid('json');
        const user = await updateUser(c.var.db, id, {
            name: data.name,
            email: data.email,
            password: data.password ? await hashPassword(data.password) : undefined,
            permissions: data.permissions,
        });
        return c.json(user);
    },
);

app.delete(
    '/:id',
    permissions([
        'write:users',
    ]),
    zValidator(
        'param',
        z.object({
            id: z.number({ coerce: true }),
        }),
    ),
    database,
    async (c) => {
        const { id } = c.req.valid('param');
        const result = await deleteUser(c.var.db, id);
        return c.json({ success: result });
    },
);

export default app;