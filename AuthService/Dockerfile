FROM node:10

RUN npm i -g typescript ts-node nodemon

WORKDIR /var/www/astra_storage/auth_service
ADD package.json /var/www/astra_storage/auth_service
ADD yarn.lock /var/www/astra_storage/auth_service
RUN yarn install

ADD . /var/www/astra_storage/auth_service

RUN ["chmod", "+x", "/var/www/astra_storage/auth_service/start.sh"]

CMD ["./start.sh"]