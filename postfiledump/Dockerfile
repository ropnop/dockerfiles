FROM node:alpine 
RUN mkdir /data && mkdir /app
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]