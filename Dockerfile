FROM node:16-alpine3.14 AS builder
WORKDIR /home/app
COPY . .
RUN yarn install --ignore-optional
RUN yarn build
RUN find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +

FROM node:16-alpine3.14 AS prod
ENV NODE_ENV=production
WORKDIR /home/app
COPY --from=builder /home/app .
RUN yarn install --prod --ignore-optional
RUN yarn global add pm2
# RUN npm install -g --force pm2
RUN yarn cache clean -all
CMD ["pm2-runtime", "dist/server.js" ]
