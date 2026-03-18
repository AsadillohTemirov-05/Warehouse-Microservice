FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY apps/auth-service/package*.json ./apps/auth-service/
COPY packages/common/package*.json ./packages/common/
COPY packages/database/package*.json ./packages/database/
RUN npm install
COPY . .
RUN npm run build --workspace=apps/auth-service
EXPOSE 3001
CMD ["node", "apps/auth-service/dist/main"]