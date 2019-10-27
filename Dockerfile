FROM node:10.15.3

ARG CONFIG

WORKDIR /usr/src/app

COPY . .

ADD ./config/$CONFIG ./.env

RUN \
  yarn install --silent &&\
  yarn build &&\
  rm -rf node_modules &&\
  yarn install --production=true --silent &&\
  rm -rf `yarn cache dir`

EXPOSE 80/tcp

CMD [ "yarn", "start" ]