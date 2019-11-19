FROM node:10.15.3-alpine

ARG CONFIG

WORKDIR /usr/src/app

COPY . .

ADD ./config/$CONFIG ./.env

RUN apk update && apk add python g++ make && rm -rf /var/cache/apk/*
RUN \
  yarn install --production=true --silent &&\
  yarn build &&\
  rm -rf `yarn cache dir`

EXPOSE 80/tcp

CMD [ "yarn", "start" ]