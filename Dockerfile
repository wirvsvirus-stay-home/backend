FROM node:13
WORKDIR /app

ENV NODE_ENV production

COPY ./ /app/

RUN npm install
EXPOSE 3000

CMD ["npm", "run", "app:reset:start"]
