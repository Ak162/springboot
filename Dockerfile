FROM node:14.21.2
WORKDIR /app
COPY . /app
RUN  npm install pm2 -g
RUN  npm install express morgan
CMD [ "pm2-runtime","start","runbuild.js","--name","front" ]

