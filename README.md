# Document Repository

## Getting Started

To get a local copy up and running, follow these steps.

### Pre-requisites

- [docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
- [docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-20-04-quickstart)

clone the repo

`git clone https://github.com/Omulosi/document-repository.git`

cd into the project repository

`cd document-repository`

start the app

`docker-compose -f build/docker-compose.yml up --build`

Navigate to the following [link](http://localhost:3000)

Log in using the following credentials (This user was initially created on start up):

- email: `admin@example.com`
- password: `password`
