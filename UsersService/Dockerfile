FROM node:10

RUN useradd -ms /bin/bash astra_storage_user

USER root
RUN npm i -g bit-bin

WORKDIR /home/astra_storage_user/astra-storage/UsersService

COPY package.json .
RUN npm i --production
RUN bit import alan18081.astra-storage/common/dist
COPY . .

CMD ["npm", "run", "start:prod"]