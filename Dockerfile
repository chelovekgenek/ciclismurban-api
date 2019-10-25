FROM node:10.15.3

ARG CONFIG

WORKDIR /usr/src/app

COPY . .

ADD ./config/$CONFIG ./.env

RUN yarn install --silent
RUN yarn build
RUN rm -rf node_modules
RUN yarn install --production=true --silent

EXPOSE 80/tcp

CMD [ "yarn", "start" ]