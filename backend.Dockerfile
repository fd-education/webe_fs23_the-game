FROM node:18.15.0-alpine as be-builder


COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./workspaces/server /workspaces/server
COPY ./workspaces/common /workspaces/common

RUN yarn install --pure-lockfile --non-interactive
RUN yarn build-common
RUN yarn build-server

FROM node:18.15.0-alpine as be-releaser
COPY --from=be-builder /workspaces/server/dist /workspaces/server/dist
COPY --from=be-builder /node_modules ./node_modules
COPY --from=be-builder /workspaces/common/dist /workspaces/common/dist

EXPOSE 9000
CMD ["node", "/workspaces/server/dist/main.js"]