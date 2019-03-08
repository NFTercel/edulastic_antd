# Edulastic POC

This is the mono-repo holding front-end repos and packages together. The project requires node ( 8+), yarn (1.9+).

- Before Contributing please read the `Contributing.md` guide.

### How to Run

**Dev Mode**

- `yarn .` install all the packages required by front-end repos/packages.
- `yarn start` to start the react client and Express server
- `API_URI='/api/' yarn start` run using local API

**Production Mode**

- `yarn build`
- Build and specify API_URI `API_URI='/api/' yarn build`
- Remove dev dependencies `npm prune --production`
- `yarn start-build`

When starting with PM2 on server, need to build first and start `./.build/server/app`

### Routes

- `/student/test` - Assessment Player with skin 1
- `/student/practice` - Assesment player with skin 2
- `/author/items` - entry point for author: list's testItems
