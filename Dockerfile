FROM node
WORKDIR /app
COPY build build
COPY server/package.json package.json
RUN npm install
COPY server/app.js app.js
CMD ["npm", "run", "start"]