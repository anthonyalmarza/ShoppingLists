FROM node:8
RUN mkdir /client
WORKDIR /client
COPY client /client
RUN yarn install

CMD yarn start