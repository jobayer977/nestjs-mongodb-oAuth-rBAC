FROM node:16-alpine

WORKDIR /app

RUN echo node --version

COPY package*.json .
COPY yarn.lock .
COPY . .

RUN npm install -g yarn --force
RUN yarn install
RUN yarn build


EXPOSE 4100

CMD [ "node", "./dist/main" ]