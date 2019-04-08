FROM node:10

RUN yarn global add typescript ts-node nodemon

WORKDIR /var/www/astra_storage/api_gateway
ADD package.json /var/www/astra_storage/api_gateway
ADD yarn.lock /var/www/astra_storage/api_gateway
RUN yarn install

ADD . /var/www/astra_storage/api_gateway

RUN ["chmod", "+x", "/var/www/astra_storage/api_gateway/start.sh"]

EXPOSE 4000

CMD ["./start.sh"]