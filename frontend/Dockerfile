# get the base node image
FROM node:15.0.1-alpine AS build

# set workdir for container
WORKDIR /frontend

# copy package.json
COPY ./package.json .

# install dependencies
# RUN npm install
# RUN yarn add semantic-ui-react semantic-ui-css
RUN yarn

# copy the rest
COPY . .

# build
RUN npm run build

#NGINX
FROM nginx:alpine

# copy build from react
COPY --from=build /frontend/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
