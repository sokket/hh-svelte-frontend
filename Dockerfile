FROM node:16-slim as build
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install
COPY rollup.config.js /build/
COPY public /build/public
COPY src /build/src
RUN npm run build

FROM nginx:1.19.8-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html/
COPY --from=build /build/public/* ./
COPY --from=build /build/public/build/ ./build
COPY --from=build /build/node_modules/@fontsource/roboto/files/ ./build/files/
RUN rm ./bundle.js.map
