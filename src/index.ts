import { Hono } from 'hono';
import { jwt } from 'hono/jwt';

import { auth, tasks, users } from './handlers';

const app = new Hono();

app.route('/auth', auth);

app.use(
    '/*',
    jwt({
        secret: 'sample-secret',
    }),
);

app.route('/tasks', tasks);
app.route('/users', users);

export default app;
