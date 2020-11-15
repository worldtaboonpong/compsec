FROM node:15.0.1-alpine
WORKDIR /backend
COPY ./package*.json ./
RUN npm install --production
COPY . .
CMD ["node","app.js"]