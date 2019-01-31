FROM node:10

RUN useradd -ms /bin/bash astra_storage_user

USER astra_storage_user

WORKDIR /home/nodejs/astra-storage/UsersService

COPY package.json .
RUN npm i --production
COPY . .

CMD ["npm", "run", "start:prod"]