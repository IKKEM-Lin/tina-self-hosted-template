[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/IKKEM-Lin/tina-self-hosted-template/tree/main&env=GITHUB_PERSONAL_ACCESS_TOKEN,REDIS_URI,NEXTAUTH_SECRET&envDescription=NEXTAUTH_SECRET%20is%20secret%20for%20tinacms-auth.%20For%20the%20other%20variables%2C%20you%20can&envLink=https://github.com/IKKEM-Lin/tina-self-hosted-template/tree/main/doc/VercelDeploy.md)

This is a [tinacms](https://tina.io/) self-host project base on [next.js](https://nextjs.org/). It supports local media manager, document search and some git provider (local, gitlab and github).

## Overview

We have 3 environment in this project:

- local: env for developer
- ssr: env for content editor
- ssg: static export for deploy

## For developer

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
open [http://localhost:3000/admin/index.html#/graphql](http://localhost:3000/admin/index.html#/graphql) for graphql debug.

## Deploy ssr

```bash
cp .env.example .env
# Change NEXTAUTH_SECRET in .env file

# deploy with docker
docker-compose up -d

# deploy without docker
npm i
npm run build:ssr
npm run start
```

Open http://localhost:3080/admin/index.html with your browser to edit content.

## Deploy ssg

SSG( Static Site Generator ) is feature of Next.js. Follow the steps below to create:

1. Merge latest `GIT_COMMIT_BRANCH` branch into `main` branch
2. Run `cp .env.example .env` if `.env` file not exist in project. Remember to change `NEXTAUTH_SECRET` in .env file
3. Run `npm run build:ssg` and you will get `out` folder which include static file

## Environment variables

| Variable                     | Default                        | Description                                                                                          |
| ---------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| GIT_COMMIT_BRANCH            | `tina`                         | The branch for cms commit                                                                            |
| GIT_COMMIT_MESSAGE           | `content: Edited with TinaCMS` | Commit message whe cms commit                                                                        |
| GIT_TYPE                     | `local`                        | **Required**, `local`, `gitlab` or `github`                                                          |
| GIT_LOCAL_COMMITTER_NAME     |                                | **Required**, when `GIT_TYPE=local`                                                                  |
| GIT_LOCAL_COMMITTER_EMAIL    |                                | **Required**, when `GIT_TYPE=local`                                                                  |
| GITLAB_HOST                  |                                | **Required**, when `GIT_TYPE=gitlab`                                                                 |
| GITLAB_PROJECT_ID            |                                | **Required**, when `GIT_TYPE=gitlab`                                                                 |
| GITLAB_PERSONAL_ACCESS_TOKEN |                                | **Required**, when `GIT_TYPE=gitlab`                                                                 |
| GITHUB_OWNER                 |                                | **Required**, when `GIT_TYPE=github`                                                                 |
| GITHUB_REPO                  |                                | **Required**, when `GIT_TYPE=github`                                                                 |
| GITHUB_PERSONAL_ACCESS_TOKEN |                                | **Required**, when `GIT_TYPE=github`                                                                 |
| DATABASE_TYPE                | `sqlite`                       | **Required**, `sqlite`, `mongodb` or `redis`                                                         |
| SQLITE_DB_PATH               | `sqliteDB/tinacms.db`          | Optional                                                                                             |
| MONGODB_URI                  |                                | **Required** when `DATABASE_TYPE=mongodb`                                                            |
| MONGODB_COLLECTION_NAME      | `tinacms`                      | Optional when `DATABASE_TYPE=mongodb`                                                                |
| MONGODB_DB_NAME              | `tinacms`                      | Optional when `DATABASE_TYPE=mongodb`                                                                |
| REDIS_URI                    |                                | **Required** when `DATABASE_TYPE=redis`                                                              |
| REDIS_NAMESPACE              | `tinacms`                      | Optional when `DATABASE_TYPE=redis`                                                                  |
| REDIS_DEBUG                  | `false`                        | Optional                                                                                             |
| NEXTAUTH_SECRET              |                                | Required，secret for [tinacms-auth](https://tina.io/docs/reference/self-hosted/auth-provider/authjs) |

## FAQ

### How to resolve "Error: Could not locate the bindings file, better_sqlite3.node"

Try to rebuild better_sqlite3 and copy it to project directory. You can run `npm run postinstall` manually.
