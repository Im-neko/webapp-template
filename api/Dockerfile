FROM node:9.11.2

COPY ./api /src

WORKDIR /src

ARG APP_ENV

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["bash", "-c", "npm run start"] 
