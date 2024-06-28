FROM node:18

WORKDIR /app

COPY package*.json ./

COPY . .

# Elimina node_modules y package-lock.json, luego instala las dependencias
RUN rm -rf node_modules package-lock.json

EXPOSE 5173

CMD ["sh", "-c", "npm i && npm run dev"]
