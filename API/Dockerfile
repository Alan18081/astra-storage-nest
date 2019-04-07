FROM node:10

RUN npm i -g typescript ts-node nodemon

WORKDIR /var/www/astra_storage/api
ADD package.json /var/www/astra_storage/api
ADD yarn.lock /var/www/astra_storage/api
RUN yarn install

ADD . /var/www/astra_storage/api

RUN ["chmod", "+x", "/var/www/astra_storage/api/start.sh"]

EXPOSE 4000

CMD ["./start.sh"]