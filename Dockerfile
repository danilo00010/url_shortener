FROM node:latest

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm ci

COPY .env /app
COPY tsconfig.json /app
COPY src/ /app/src
RUN npm run build

EXPOSE 3000

CMD ["node", "--env-file=.env", "dist/index.js"]