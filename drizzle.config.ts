import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { globSync } from 'fast-glob';

const path = globSync('.wrangler/state/v3/d1/**/*.sqlite');

export default defineConfig({
    schema: './src/database/schema.ts',
    out: './migrations',
    dialect: 'sqlite',
    dbCredentials: {
        url: path[0],
    },
});

// export default defineConfig({
//     schema: './src/database/schema.ts',
//     out: './migrations',
//     dialect: 'sqlite',
//     driver: 'd1-http',
//     dbCredentials: {
//         accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
//         databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
//         token: process.env.CLOUDFLARE_D1_TOKEN!,
//     },
// });