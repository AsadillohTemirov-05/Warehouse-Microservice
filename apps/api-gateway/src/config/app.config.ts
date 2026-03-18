export const appConfig = () => ({
  port: parseInt(process.env.API_GATEWAY_PORT || '3000'),
  nodeEnv: process.env.NODE_ENV || 'development',
});