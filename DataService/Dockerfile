FROM node:10

RUN npm i -g typescript ts-node nodemon

WORKDIR /var/www/astra_storage/data_service
ADD package.json /var/www/astra_storage/data_service
ADD yarn.lock /var/www/astra_storage/data_service
RUN yarn install

ADD . /var/www/astra_storage/data_service

RUN ["chmod", "+x", "/var/www/astra_storage/data_service/start.sh"]

EXPOSE 4000

CMD ["./start.sh"]