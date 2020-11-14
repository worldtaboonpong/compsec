# get the base node image
FROM node:15.0.1

# set workdir for container
WORKDIR /frontend

# copy package.json
COPY ./package.json /frontend

# install dependencies
RUN npm install
RUN yarn add semantic-ui-react semantic-ui-css

# copy the rest
COPY . .

# build
CMD ["npm", "start"]
