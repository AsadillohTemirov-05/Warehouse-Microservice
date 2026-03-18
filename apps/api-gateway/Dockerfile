FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY apps/api-gateway/package*.json ./apps/api-gateway/
COPY packages/common/package*.json ./packages/common/
COPY packages/database/package*.json ./packages/database/
RUN npm install
COPY . .
RUN npm run build --workspace=apps/api-gateway
EXPOSE 3000
CMD ["node", "apps/api-gateway/dist/main"]