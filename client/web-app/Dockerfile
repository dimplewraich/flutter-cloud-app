## BUILD STEP
# Get base image from community image repository and label this phase as 'build' step
FROM node:alpine as builder

# Set working directory to be used in the container, and,
# copy package.json into the container
# so that 'npm install' only runs when package.json is changed
WORKDIR '/app'
COPY ./package.json .

# Add dependencies
RUN npm install

# Copy rest of the content from the folder to container
COPY . .

# Build the project
RUN npm run build

## RUN STEP
# Get base image from community image repository and label this phase as 'run' step
FROM nginx:alpine as runner

# Expose required port
EXPOSE 3000

# Copy default conf file to nginx share
COPY './routing/default.conf' '/etc/nginx/conf.d/default.conf'

# Copy compiled 'build' folder from previous phase and save it in nginx default static site hosting place
COPY --from=builder '/app/build' '/usr/share/nginx/html'