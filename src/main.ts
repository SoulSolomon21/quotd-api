import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  // to validate the correctness of the data sent to the application, we use the NestJS ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      // the whitelist property is used to allow only the properties specified in the DTO
      // it will filter out any properties sent from the client that are not defined in the DTO
      whitelist: true,
      // this will transform the incoming data to an instance of the DTO, giving us confidence in the data we are working with
      transform: true,
      // this property rejects any request that contains properties that are not defined in the DTO
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
