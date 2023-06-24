FROM node:18.15.0-alpine as fe-builder

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./workspaces/client /workspaces/client
COPY ./workspaces/common /workspaces/common

RUN yarn install --pure-lockfile --non-interactive
RUN yarn build-common
RUN yarn build-client

FROM nginx:1.25.1-alpine as fe-releaser
COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=fe-builder /workspaces/client/build /usr/share/nginx/html
COPY --from=fe-builder /workspaces/common/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]