# Use Ubuntu as base image
FROM ubuntu:latest

# Set ENV for resolving debconf error messages
ENV DEBIAN_FRONTEND=noninteractive

# Update apt-get to latest version
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils
# Install node
RUN apt-get install -y nodejs-legacy
# Install npm
RUN apt-get install -y npm

# Add working directory to container and make this working directory in container
ADD . /client
WORKDIR /client

# Install sqlite3 manually
RUN npm uninstall sqlite3
RUN npm install sqlite3

# Install node dependencies
RUN npm install -d

# Default command
CMD ["/bin/sh"]
