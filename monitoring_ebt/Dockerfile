FROM node:18-alpine
ENV NODE_ENV development

WORKDIR  /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 5005

CMD ["npm", "start"]