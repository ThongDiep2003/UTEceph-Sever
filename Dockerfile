FROM node:18.14.2-alpine
ENV NODE_ENV=production
ENV NODE_PATH="/usr/local/lib/node_modules:/uteceph-server/uteceph-backend/node_modules"
WORKDIR /uteceph-server/uteceph-backend
COPY "package*.json" ./
RUN npm install
RUN npm install -g @babel/cli @babel/core@7.20.12 @babel/preset-env@7.20.2
COPY . .
RUN npm run build
CMD ["npm", "run", "production"]