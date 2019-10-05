FROM mhart/alpine-node

WORKDIR /app

ARG APP_ENV

COPY ./front .

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
