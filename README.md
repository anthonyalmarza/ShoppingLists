# ShoppingLists

## Overview

This is a sandbox project that leverages ruby on rails and react towards implementing
a shopping list microservice. The source code is organized into to two main folders:

* `client` &
* `server` 

I've done it this way because in practice the client code would be a part of a larger project
wherein the shopping lists API would be one of many microservices that it interface with e.g.
auth, contacts, etc.

## System Requirements

* [Docker](https://docs.docker.com/docker-for-mac/install/)
* [Docker Compose](https://docs.docker.com/compose/install/)

## Development

NOTE: The scripts listed in the root bin folder of this project are designed to help development on ubuntu,
which runs each container as root under the hood. So instead of doing `docker-compose run api rails generate resource SomeModel name:string`
you can can do `./bin/docker/run api rails generate resource SomeModel name:string` - this will `chown` your
generated files and clean up your containers.

### `./bin/init`
Starting up the servers is easy, just run `./bin/init` and you'll notice that the services listed in
docker-compose.yml file will be built and started, as well as the db created, migrated and seeded.

Navigate to http://localhost:3001 to interact with the client GUI.

### Running Tests

For rails:

`./bin/docker/run api bundle exec rspec`

For react:

`./bin/docker/run client yarn test`
