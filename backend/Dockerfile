FROM node:18

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 3030

CMD ["sh", "-c", "npm install && node --watch app.js"]