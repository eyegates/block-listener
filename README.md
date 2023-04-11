# Block Listener

To start the application, run in the root folder
`docker compose up`

The application is composed with 2 NestJs microservices `Listener` and `db-writer` a rabbitMQ server and a postgreSql server.

# Listener config

in listener folder add .env file with the following schema

```
JSON_RPC_URL=https://polygon-mainnet.g.alchemy.com/YOUR-API-KEY
AMQP_USER=user
AMQP_PASSWORD=password
AMQP_HOST=rabbitmq
AMQP_PORT=5672
AMQP_QUEUE_NAME=blocks_queue
AMQP_QUEUE_DURABLE=true
```

# DB-writer config

in db-writer folder add .env file withe the following schema

```
AMQP_USER=user
AMQP_PASSWORD=password
AMQP_HOST=rabbitmq
AMQP_PORT=5672
AMQP_QUEUE_NAME=blocks_queue
AMQP_QUEUE_DURABLE=true

MIKRO_ORM_TYPE=postgresql
MIKRO_ORM_HOST=postgres
MIKRO_ORM_PORT=5432
MIKRO_ORM_USER=user
MIKRO_ORM_PASSWORD=password
MIKRO_ORM_DB_NAME=block-listnener
MIKRO_ORM_ENTITIES=dist/**/*.entity.js
MIKRO_ORM_ENTITIES_TS=src/**/*.entity.ts
MIKRO_ORM_DEBUG=false
MIKRO_ORM_MIGRATIONS_PATH=dist/config/migrations
MIKRO_ORM_MIGRATIONS_PATH_TS=src/config/migrations
MIKRO_ORM_MIGRATIONS_GLOB='!(*.d).{js,ts}'
MIKRO_ORM_MIGRATIONS_ALL_OR_NOTHING=true
```

# CAUTION
Saving to database doesn't work due to some configuration issue with Mikro-Orm. It is under investigation

You should see in the db-writer console a message saying 
```
Received event with data = {blockNumber}
and
Block ${block.number} saved successfully
```
after listener receives blocks and pushes it to the queue
