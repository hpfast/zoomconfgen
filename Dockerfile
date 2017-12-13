FROM node:8
MAINTAINER Hans Fast hans@surfacemarkup.net
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["node", "/app/src/index.js"]
