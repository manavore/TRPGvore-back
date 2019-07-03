FROM node:10.16

WORKDIR /opt/app

LABEL authors = "Tiago Povoa"

COPY src /opt/app

RUN npm install

CMD [ "node","/opt/app/app.js" ]