FROM node:16

RUN npm i -g typescript ts-node nodemon

WORKDIR /var/www/astra_storage/sockets_service
ADD package.json /var/www/astra_storage/sockets_service
RUN yarn install

ADD . /var/www/astra_storage/sockets_service

RUN ["chmod", "+x", "/var/www/astra_storage/sockets_service/start.sh"]

EXPOSE 4000

CMD ["./start.sh"]
