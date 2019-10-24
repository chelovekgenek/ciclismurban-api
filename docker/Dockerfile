FROM node:10.15.3

WORKDIR /usr/src/app

COPY . .

RUN yarn install --silent
RUN yarn build
RUN rm -rf node_modules
RUN yarn install --production=true --silent

CMD [ "yarn", "start" ]