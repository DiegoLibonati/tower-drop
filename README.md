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

## Continuous Integration & Deployment

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch. On a push to `main` it goes one step further and **deploys** the new build to the server.

### Pipeline overview

```
PR or push to main
        │
        ▼
┌──────────────────┐   ┌──────────────┐   ┌──────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
│  lint-and-audit  │──▶│   testing    │──▶│    build     │──▶│        docker       │──▶│        deploy       │
│ lint · type-check│   │ jest (jsdom) │   │  vite build  │   │ build · push (main) │   │ ssh: pull·up·prune  │
└──────────────────┘   └──────────────┘   └──────────────┘   └─────────────────────┘   └─────────────────────┘
                                                              push to GHCR & deploy run on main only
```

Jobs run sequentially through `needs:`, so a failure in any earlier stage short-circuits the rest of the pipeline. Every Node job checks out the repo, sets up Node from `.nvmrc` with npm cache, and runs `npm ci` before its own command. A workflow-level `concurrency` group cancels superseded runs on the same ref.

### Validation jobs (run on every PR and push)

1. **`lint-and-audit`** — runs `npm run lint` (ESLint) and `npm run type-check` (`tsc --noEmit`). Despite the job name, dependency auditing (see [Security Audit](#security-audit)) is intentionally kept out of CI and meant to be run locally before shipping a build.
2. **`testing`** — runs `npm run test` (Jest with `jest-environment-jsdom`; Three.js and Cannon.js are fully mocked in `jest.setup.ts`, so no WebGL is required on the runner).
3. **`build`** — runs `npm run build` (TypeScript compile + Vite production bundle), proving the codebase builds end-to-end.
4. **`docker`** — builds the production image from `Dockerfile.production` with Buildx and a GitHub Actions layer cache. On a **push to `main`** it logs into GHCR using the automatic `GITHUB_TOKEN` and pushes `ghcr.io/diegolibonati/tower-drop` tagged `latest` and `sha-<commit>`. On pull requests it only builds the image (no login, no push), so the Dockerfile stays validated without publishing anything.

### Deployment job (push to `main` only)

5. **`deploy`** — gated to `push` events on `main` and scoped to a `production` environment. The runner installs **`cloudflared`**, writes the SSH key plus an SSH `config` whose `ProxyCommand` tunnels the connection through **Cloudflare Access** (so the server's SSH port is never exposed to the public internet), then copies `prod.docker-compose.yml` to the server over **SCP** and over **SSH** runs `docker compose pull`, `docker compose up -d` (recreating the container with the freshly published image) and `docker image prune -f`. The connection data lives in repository **secrets** (`SSH_HOST`, `SSH_USER`, `SSH_KEY`, `DEPLOY_PATH`, plus the Cloudflare Access service-token pair `CF_ACCESS_CLIENT_ID` and `CF_ACCESS_CLIENT_SECRET`) and is never exposed to pull requests. Because the GHCR image is public, the server pulls it without authenticating — it only needs Docker and the compose file the pipeline ships (no source checkout, Node or local build).

### Where the build outputs live

| Output                                                       | Location                                       |
| ------------------------------------------------------------ | ---------------------------------------------- |
| Validation logs (lint, type-check, tests)                    | **Actions** tab on GitHub                      |
| Production Docker image (`ghcr.io/diegolibonati/tower-drop`) | **GitHub Container Registry** (pushed on main) |
| Vite production bundle (`dist/`)                             | Baked into the production image                |
| Live deployment                                              | Your server, recreated by the `deploy` job     |

> **Note:** on pull requests the pipeline only validates (lint, types, tests, bundle, and a no-push Docker build). On a push to `main` it additionally publishes the production image to GHCR and deploys it to the server.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build

# docker (production image)
docker build -f Dockerfile.production -t tower-drop:local .
```

## Production

Once tests pass (see [Testing](#testing)) and dependencies are clean (see [Security Audit](#security-audit)), the app is containerized for deployment. The repository ships with two Docker setups: one for local development (hot reload via Vite) and one for production (static build served by Nginx and published to GHCR).

### Development with Docker

1. Clone the repository with `git clone "repository link"`
2. Execute: `npm install` or `yarn install` in the terminal
3. Execute: `docker-compose -f dev.docker-compose.yml build --no-cache` in the terminal
4. Once built, you must execute the command: `docker-compose -f dev.docker-compose.yml up --force-recreate` in the terminal

NOTE: You have to be standing in the folder containing the: `dev.docker-compose.yml` and you need to install `Docker Desktop` if you are in Windows.

### Production with Docker

`prod.docker-compose.yml` no longer builds locally — it references the image published to GHCR (`ghcr.io/diegolibonati/tower-drop:latest`) and maps host port **9001** to the container's **8080** (Nginx runs as a non-root user, so it listens on `8080` rather than `80`). The host port is configurable through the `APP_PORT` environment variable (defaults to `9001`).

On any host with Docker (e.g. the server), pull and run it:

```bash
docker compose -f prod.docker-compose.yml pull
docker compose -f prod.docker-compose.yml up -d
```

To build and serve the production image locally without the registry:

```bash
docker build -f Dockerfile.production -t tower-drop:local .
docker run --rm -p 9001:8080 tower-drop:local
```

The app is then available at `http://localhost:9001`, served by Nginx with a healthcheck wired into the compose file.

### Continuous Deployment

Every push to `main` that passes the pipeline is deployed automatically by the `deploy` job (see [Continuous Integration & Deployment](#continuous-integration--deployment)): the image is pushed to GHCR, `prod.docker-compose.yml` is copied to the server, and the container is recreated over SSH. The SSH session is tunneled through **Cloudflare Access** with `cloudflared`, so the server's SSH port stays closed to the public internet. The server only needs **Docker** and the compose file the pipeline ships. Set the `SSH_HOST`, `SSH_USER`, `SSH_KEY`, `DEPLOY_PATH`, `CF_ACCESS_CLIENT_ID` and `CF_ACCESS_CLIENT_SECRET` repository secrets to enable it, and make the GHCR package public after the first push so the server can pull it without credentials.

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/tower-drop`](https://www.diegolibonati.com.ar/#/project/tower-drop)
