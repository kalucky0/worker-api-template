import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import { createUser, getUserByEmail } from '../database';
import { database } from '../middleware';
import { createJwt, hashPassword, verifyPassword } from '../utils';

const app = new Hono<{Bindings: Env}>();

app.post(
    '/login',
    zValidator(
        'json',
        z.object({
            email: z.string(),
            password: z.string(),
        }),
    ),
    database,
    async (c) => {
        const { email, password } = c.req.valid('json');

        const user = await getUserByEmail(c.var.db, email);
        if (!user) {
            return c.json({ error: 'User not found' });
        }

        if (!await verifyPassword(password, user.password)) {
            return c.json({ error: 'Invalid password' });
        }

        const jwt = await createJwt(user, c.env);
        return c.json({ jwt });
    },
);

app.post(
    '/register',
    zValidator(
        'json',
        z.object({
            email: z.string(),
            name: z.string(),
            password: z.string(),
        }),
    ),
    database,
    async (c) => {
        const { email, name, password } = c.req.valid('json');

        const user = await createUser(c.var.db, {
            email,
            name,
            password: await hashPassword(password),
            permissions: [
                'read:tasks',
                'write:tasks',
            ],
        });

        if (!user) {
            return c.json({ error: 'Failed to create user' });
        }

        const jwt = await createJwt(user, c.env);
        return c.json({ jwt });
    },
);

export default app;