import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { TCP_PORTS, SERVICE_NAMES } from '@wms/common';

export const microservicesConfig: ClientProviderOptions[] = [
  {
    name: SERVICE_NAMES.AUTH,
    transport: Transport.TCP,
    options: {
      host: process.env.AUTH_SERVICE_HOST || 'localhost',
      port: TCP_PORTS.AUTH,
    },
  },
  {
    name: SERVICE_NAMES.WAREHOUSE,
    transport: Transport.TCP,
    options: {
      host: process.env.WAREHOUSE_SERVICE_HOST || 'localhost',
      port: TCP_PORTS.WAREHOUSE,
    },
  },
  {
    name: SERVICE_NAMES.INVENTORY,
    transport: Transport.TCP,
    options: {
      host: process.env.INVENTORY_SERVICE_HOST || 'localhost',
      port: TCP_PORTS.INVENTORY,
    },
  },
  {
    name: SERVICE_NAMES.ORDER,
    transport: Transport.TCP,
    options: {
      host: process.env.ORDER_SERVICE_HOST || 'localhost',
      port: TCP_PORTS.ORDER,
    },
  },
  {
    name: SERVICE_NAMES.PRODUCT,
    transport: Transport.TCP,
    options: {
      host: process.env.PRODUCT_SERVICE_HOST || 'localhost',
      port: TCP_PORTS.PRODUCT,
    },
  },
  {
    name: SERVICE_NAMES.REPORT,
    transport: Transport.TCP,
    options: {
      host: process.env.REPORT_SERVICE_HOST || 'localhost',
      port: TCP_PORTS.REPORT,
    },
  },
];