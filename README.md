# Stack Game 3D

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

In this page I replicated without gravity the famous mobile game "Stack Game", which consists of stacking blocks one on top of the other. In case of stacking with a block that is not perfectly superimposed to the one below, the block above will lose the part that was not stacked correctly. The game ends when a block is not stacked correctly. To stack you will have to click.

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
"@types/jest": "^29.5.14"
"@types/three": "^0.161.2"
"@types/cannon": "^0.1.12"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^29.7.0"
"jest-environment-jsdom": "^30.2.0"
"lint-staged": "^16.2.7"
"prettier": "^3.8.1"
"ts-jest": "^29.2.5"
"typescript": "^5.3.3"
"typescript-eslint": "^8.54.0"
"vite": "^7.1.6"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/Stack-Game-3D`](https://www.diegolibonati.com.ar/#/project/Stack-Game-3D)

## Video

https://github.com/DiegoLibonati/Stack-Game-3D-Page/assets/99032604/67e0b504-95d5-4370-b9be-620787a8e2d7

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
