![BannerLogo](./repo/banner.png)

# AttackFlow Project

## Installation

1. `cd client && npm install`
2. `cd server && npm install`

## Run Options

Please run one of the following options only.

### 1. Run using Docker (Recommended)

1. Ensure Docker daemon is running.
2. `docker-compose up -d --remove-orphans` (-d is detach mode, --remove-orphans is to remove existing containers)

Server will be running at [localhost:4000](http://localhost:4000/).
Client will be running at [localhost:3000](http://localhost:3000/).

### 2. Run using localhost

1. `cd client && npm run dev`
2. `cd server && npm run dev`

Server will be running at [localhost:4000](http://localhost:4000/).
Client will be running at [localhost:3000](http://localhost:3000/).

### Run Tests

1. `cd client && npm run tests`
2. `cd server && npm run tests`

## FAQ

### 1. How to fix linting errors quickly?

Pre-commit hooks have been added to ensure **code style is enforced** and **all tests have passed**.

To fix linting issues quickly, head to the respective folder (client or server) and run the command

```bash
npm run lint-fix
```

### 2. How to address database connection issues?

1. Remove all containers and volumes with  `docker-compose down -v` (-v is to remove volumes associated with the containers)
2. Start docker now with  `docker-compose up -d --remove-orphans` 

### 3. How to fix frontend errors if you are in the backend team?

1. Go to client folder and do `npm install`.
2. Commit you change.
