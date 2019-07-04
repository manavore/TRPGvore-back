FROM node:latest

WORKDIR /opt/app

LABEL authors = "Tiago Povoa"

COPY src/package.json /opt/app

RUN npm install

COPY src /opt/app

# Change this to node start, atm doesn't work because reasons :/
CMD [ "node","/opt/app/app.js" ]