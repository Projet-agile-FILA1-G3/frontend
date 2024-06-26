FROM node:20 AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ARG MODE

RUN npm run build:$MODE

FROM nginx:alpine3.19

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
