FROM node:10

WORKDIR /var/www/astra_storage/emails_service
RUN npm i -g typescript ts-node nodemon

ADD package.json /var/www/astra_storage/emails_service
RUN yarn install

ADD . /var/www/astra_storage/emails_service

RUN ["chmod", "+x", "/var/www/astra_storage/emails_service/start.sh"]

CMD ["./start.sh"]