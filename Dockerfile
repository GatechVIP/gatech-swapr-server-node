# Use Ubuntu as base image
FROM node:8.7.0

# Install node dependencies
RUN npm install yarn

RUN mkdir -p /data/node_modules

WORKDIR /data
COPY package.json yarn.lock /data/

RUN yarn --pure-lockfile

ENV PATH /data/node_modules/.bin:$PATH

RUN mkdir -p /data/app

ADD . /data/app
WORKDIR /data/app

# Default command
CMD ["yarn", "start"]
