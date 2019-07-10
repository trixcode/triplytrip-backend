FROM node:10

RUN mkdir -p /var/www/triplytrip-backend
WORKDIR /var/www/triplytrip-backend

COPY ./package.json .

RUN npm install


EXPOSE 8080

CMD ["npm", "run", "dev"]
