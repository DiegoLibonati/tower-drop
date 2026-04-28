# Tower Drop

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Getting Started with Docker

1. Clone the repository with `git clone "repository link"`
2. Execute: `npm install` or `yarn install` in the terminal
3. Execute: `docker-compose -f dev.docker-compose.yml build --no-cache` in the terminal
4. Once built, you must execute the command: `docker-compose -f dev.docker-compose.yml up --force-recreate` in the terminal

NOTE: You have to be standing in the folder containing the: `dev.docker-compose.yml` and you need to install `Docker Desktop` if you are in Windows.

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

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/tower-drop`](https://www.diegolibonati.com.ar/#/project/tower-drop)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.
