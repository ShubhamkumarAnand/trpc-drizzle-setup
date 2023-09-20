# trpc-backend: Experiment with trpc & drizzle-orm with PostgreSQL

To install dependencies:

```bash
bun install
```

To run:

```bash
# For server
bun dev:server

# Create a db and put the db string in the .env file
cp .env.example .env

# Pushing the migration to the db
bun push

# For client
bun dev:client
```

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime and you will fall in love with the speed of bun.
