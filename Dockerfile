FROM node:10.18.0-jessie
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY ./ ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 8080
CMD ["node", "app.js > app.log 2>&1"]
