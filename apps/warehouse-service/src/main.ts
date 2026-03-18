import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TCP_PORTS } from '@wms/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport:Transport.TCP,
      options:{
        host:'0.0.0.0',
        port:TCP_PORTS.WAREHOUSE
      }
    }
  );
  app.useGlobalPipes(
    new ValidationPipe({whitelist:true,transform:true})
  )
  await app.listen();
    console.log(`Warehouse service running on TCP port ${TCP_PORTS.WAREHOUSE}`);

}
bootstrap();
