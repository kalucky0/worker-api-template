import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import { createTask, deleteTask, getTask, getTasks, updateTask } from '../database';
import { database, permissions } from '../middleware';

const app = new Hono();

app.get(
    '/',
    permissions([
        'read:tasks',
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
        const tasks = await getTasks(c.var.db);
        return c.json(tasks);
    },
);

app.get(
    '/:id',
    permissions([
        'read:tasks',
    ]),
    zValidator(
        'param',
        z.object({
            id: z.number({ coerce: true }),
        }),
    ),
    database,
    (c) => {
        const { id } = c.req.valid('param');
        const task = getTask(c.var.db, id);
        return c.json(task);
    },
);

app.post(
    '/',
    permissions([
        'read:tasks',
    ]),
    zValidator(
        'json',
        z.object({
            content: z.string(),
        }),
    ),
    database,
    async (c) => {
        const { content } = c.req.valid('json');
        const task = await createTask(c.var.db, { content });
        return c.json(task);
    },
);

app.put(
    '/:id',
    database,
    zValidator(
        'param',
        z.object({
            id: z.number({ coerce: true }),
        }),
    ),
    zValidator(
        'json',
        z.object({
            content: z.string().optional(),
            isComplete: z.boolean().optional(),
        }),
    ),
    async (c) => {
        const { id } = c.req.valid('param');
        const { content, isComplete } = c.req.valid('json');
        const task = await updateTask(c.var.db, id, { content, isComplete });
        return c.json(task);
    },
);

app.delete(
    '/:id',
    database,
    zValidator(
        'param',
        z.object({
            id: z.number({ coerce: true }),
        }),
    ),
    async (c) => {
        const { id } = c.req.valid('param');
        const result = await deleteTask(c.var.db, id);
        return c.json({ success: result });
    },
);

export default app;