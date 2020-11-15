#NGINX
FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY ./nuttanai.codes.key /etc/ssl
COPY ./nuttanai.codes.crt /etc/ssl