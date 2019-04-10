FROM node:10

WORKDIR /var/www/astra_storage/api_gateway
RUN yarn global add typescript ts-node nodemon

ADD package.json /var/www/astra_storage/api_gateway
RUN yarn install

ADD . /var/www/astra_storage/api_gateway

RUN ["chmod", "+x", "/var/www/astra_storage/api_gateway/start.sh"]

EXPOSE 5000

CMD ["./start.sh"]