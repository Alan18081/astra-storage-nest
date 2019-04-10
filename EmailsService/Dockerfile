FROM node:10

RUN npm i -g typescript ts-node nodemon

WORKDIR /var/www/astra_storage/emails_service
ADD package.json /var/www/astra_storage/emails_service
RUN yarn install

ADD . /var/www/astra_storage/emails_service

RUN ["chmod", "+x", "/var/www/astra_storage/emails_service/start.sh"]

CMD ["./start.sh"]