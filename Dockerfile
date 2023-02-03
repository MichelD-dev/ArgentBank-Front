FROM node:14-alpine as development

# ADD . /app/
WORKDIR /app

COPY package*.json .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 5173 3001

RUN yarn build

FROM node:lts-alpine as production

WORKDIR /app

COPY package*.json .
COPY yarn.lock .

EXPOSE 5173 3001

RUN yarn --production

COPY --from=development /app/dist ./dist

CMD ["node", "dist/index.js"]