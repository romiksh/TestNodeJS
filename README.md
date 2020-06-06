# TestNodeJS
Example using NodeJS in docker

## Build the image
docker build -t nodejs-test-server .

## Run the container
docker run -d --name nodejs-test-server -p 3000:3000 nodejs-test-server


## Run the container with ENV
docker run -d --name nodejs-test-server-env --env PORT=3070 -p 3070:3070 nodejs-test-server
