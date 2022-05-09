FROM node:10 as build-stage

WORKDIR /react-app

COPY package*.json ./

RUN npm install

COPY src ./src

COPY public ./public

COPY restaurant_container_server.conf ./

RUN npm run build

FROM nginx:1.15

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build-stage /react-app/restaurant_container_server.conf /etc/nginx/conf.d/

COPY --from=build-stage /react-app/build/ /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]