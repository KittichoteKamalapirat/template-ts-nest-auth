FROM --platform=linux/amd64 node:18.14.1


WORKDIR /usr/src/app

COPY package.json ./
COPY ./package.json ./

RUN yarn install --network-timeout 100000 

COPY ./ ./

WORKDIR /usr/src/app
RUN yarn build

ENV NODE_ENV production

EXPOSE 8080

# USER node 
CMD [ "node", "dist/main.js" ]
