FROM node:latest

WORKDIR /opt/app

LABEL authors = "Tiago Povoa"

COPY express/src/package.json /opt/app

RUN npm install

COPY express/src /opt/app

RUN npm test

# Change this to node start, atm doesn't work because reasons :/
CMD [ "node","/opt/app/app.js" ]
