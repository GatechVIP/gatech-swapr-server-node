# Use Ubuntu as base image
FROM node:8.7.0

RUN mkdir -p /data/node_modules
RUN mkdir -p /data/app

WORKDIR /data
COPY package.json /data

# Install node dependencies
RUN npm config set registry http://registry.npmjs.org/ && npm install

ENV PATH /data/node_modules/.bin:$PATH

ADD . /data/app
WORKDIR /data/app

# Default command
CMD ["npm", "start"]
