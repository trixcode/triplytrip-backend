FROM node:10

RUN mkdir -p /vap/www/triplytrip-backend
WORKDIR /vap/www/triplytrip-backend

COPY ./package*json .

RUN npm install


EXPOSE 8000

CMD ["npm", "run", "dev"]
