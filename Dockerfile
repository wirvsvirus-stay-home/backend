FROM node:13
WORKDIR /app

ENV NODE_ENV production

COPY ./ /app/

RUN npm install \
    && npm run db:init

EXPOSE 3000

CMD ["node", "index.js"]
