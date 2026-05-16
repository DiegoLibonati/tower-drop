# Tower Drop

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Tower Drop** is a browser-based 3D block-stacking game inspired by the classic mobile game "Stack". The objective is simple: stack as many blocks as possible by clicking at the right moment to drop the moving block onto the one below. The higher your stack, the higher your score.

Each round, a new block slides back and forth above the current stack. When you click, it stops and locks into place — but only the portion that overlaps with the block underneath survives. Any overhanging section breaks off and falls with realistic physics. If a block misses entirely and there is no overlap at all, the game ends immediately.

The game is rendered in 3D using Three.js with an orthographic camera that follows the stack upward as it grows, giving it a clean isometric look. Block physics — including the falling pieces — are handled by Cannon.js, so cut-off fragments tumble and drop naturally. Each new block is colored with a smooth hue progression, making the tower visually distinct as it gets taller.

The entire application runs in the browser with no backend required. It is built with TypeScript and Vite, keeping the codebase strongly typed and the build fast. The UI is minimal by design: a score counter, a last-score display between rounds, and a single play button to start or restart the game. There are no lives, no time limits, and no power-ups — just precision and timing.

## Technologies used

1. Typescript
2. CSS3
3. HTML5
4. Vite
5. Nginx
6. Docker
7. Three JS

## Libraries used

The project relies on a small runtime stack (rendering + physics) and a broader dev toolchain for typing, testing, linting and formatting.

#### Dependencies

```
"cannon": "^0.6.2"
"three": "^0.148.0"
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/three": "^0.161.2"
"@types/cannon": "^0.1.12"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"prettier": "^3.8.1"
"ts-jest": "^29.4.6"
"typescript": "^5.3.3"
"typescript-eslint": "^8.54.0"
"vite": "^7.1.6"
```

## Getting Started

To run the game locally:

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

## Testing

With the project installed and running locally, you can validate the codebase against the test suite.

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security Audit

Beyond the test suite, dependencies should be audited for known vulnerabilities before shipping a build.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch.

### Pipeline overview

```
              ┌─── PR or push to main ───┐
              ▼                          ▼
┌──────────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────────────┐
│  lint-and-audit  │──▶│   testing    │──▶│    build     │──▶│     build-docker     │
│ lint · type-check│   │ jest (jsdom) │   │ vite build   │   │ dev + prod images    │
└──────────────────┘   └──────────────┘   └──────────────┘   └──────────────────────┘
```

Jobs run sequentially through `needs:`, so a failure in any earlier stage short-circuits the rest of the pipeline. Every job checks out the repo, sets up Node from `.nvmrc` with npm cache, and runs `npm ci` before its own command.

### Validation jobs (run on every PR and push)

1. **`lint-and-audit`** — runs `npm run lint` (ESLint) and `npm run type-check` (`tsc --noEmit`). Despite the job name, dependency auditing (see [Security Audit](#security-audit)) is intentionally kept out of CI and meant to be run locally before shipping a build.
2. **`testing`** — runs `npm run test` (Jest with `jest-environment-jsdom`; Three.js and Cannon.js are fully mocked in `jest.setup.ts`, so no WebGL is required on the runner).
3. **`build`** — runs `npm run build` (TypeScript compile + Vite production bundle), proving the codebase builds end-to-end.
4. **`build-docker`** — smoke-builds both container images that ship with the repo: `Dockerfile.development` tagged `app:dev` and `Dockerfile.production` tagged `app:prod`. This guarantees both Docker setups described in [Production](#production) stay buildable.

### Where the build outputs live

| Output                                    | Location                     |
| ----------------------------------------- | ---------------------------- |
| Validation logs (lint, type-check, tests) | **Actions** tab on GitHub    |
| Vite production bundle (`dist/`)          | Ephemeral, inside the runner |
| Docker images (`app:dev`, `app:prod`)     | Ephemeral, inside the runner |

> **Note:** the pipeline does not publish artifacts or container images to a registry — its sole purpose is to validate that every change to `main` is lintable, typechecks, passes tests, bundles, and produces both Docker images successfully.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build

# build-docker
docker build -f Dockerfile.development -t app:dev .
docker build -f Dockerfile.production -t app:prod .
```

## Production

Once tests pass (see [Testing](#testing)) and dependencies are clean (see [Security Audit](#security-audit)), the app can be containerized for deployment. The repository ships with two Docker setups: one for local development (hot reload via Vite) and one for production (static build served by Nginx).

### Development with Docker

1. Clone the repository with `git clone "repository link"`
2. Execute: `npm install` or `yarn install` in the terminal
3. Execute: `docker-compose -f dev.docker-compose.yml build --no-cache` in the terminal
4. Once built, you must execute the command: `docker-compose -f dev.docker-compose.yml up --force-recreate` in the terminal

NOTE: You have to be standing in the folder containing the: `dev.docker-compose.yml` and you need to install `Docker Desktop` if you are in Windows.

### Production with Docker

1. Execute: `docker-compose -f prod.docker-compose.yml build --no-cache`
2. Execute: `docker-compose -f prod.docker-compose.yml up --force-recreate`

The production container builds the Vite bundle and serves it through Nginx on port `3000` (mapped to internal `8080`), with a healthcheck wired into the compose file.

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/tower-drop`](https://www.diegolibonati.com.ar/#/project/tower-drop)
