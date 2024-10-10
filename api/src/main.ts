import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    BadRequestException,
    Logger,
    ValidationPipe,
    VersioningType,
} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new Logger('app'),
    });
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            // disableErrorMessages: true,
            exceptionFactory: (errors) => {
                const eObj = {};
                errors.forEach((e) => {
                    eObj[e.property] = Object.values(e.constraints);
                });
                return new BadRequestException(eObj);
            },
        }),
    );
    // app.setGlobalPrefix('api');
    app.enableVersioning({
        defaultVersion: '1',
        type: VersioningType.HEADER,
        header: 'api-version',
    });
    await app.listen(3000);
}
bootstrap();
