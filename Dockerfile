FROM node:20.10.0 as build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist/university-frontend /usr/share/nginx/html