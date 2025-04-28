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

1. Merge latest ```GIT_COMMIT_BRANCH``` branch into ```main``` branch
2. Run ```cp .env.example .env``` if ```.env``` file not exist in project. Remember to change ```NEXTAUTH_SECRET``` in .env file
3. Run ```npm run build:ssg``` and you will get ```out``` folder which include static file


## FAQ
### How to resolve "Error: Could not locate the bindings file, better_sqlite3.node"
Try to rebuild better_sqlite3 and copy it to project directory. You can run ```npm run postinstall``` manually.