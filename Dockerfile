FROM node:lts-alpine
ENV NODE_ENV=production
ENV DATABASE_URL=postgres://sbtpiwwaoiecvm:839e35406d09596f3644bc255780f917a2a3ed4a6eed65059b95085967137d47@ec2-3-227-195-74.compute-1.amazonaws.com:5432/d60rmorktgrcjn
ENV SECRET=myscret
WORKDIR /src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /src/app
USER node
CMD npm start